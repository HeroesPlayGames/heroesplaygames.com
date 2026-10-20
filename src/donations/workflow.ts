import { env, WorkflowEntrypoint, type WorkflowEvent, type WorkflowStep } from "cloudflare:workers";

/** DonorDrive re-platformed Extra Life in 2026 — this is the current public API host. */
const EXTRA_LIFE_API = "https://dd.extra-life.org/api";
/** Extra Life returns the 20 most recent donations by default; grab enough to cover a burst. */
const FETCH_LIMIT = 25;
/** Streamlabs caps donation-feed pushes at 2/min — pace new donations between them. */
const STREAMLABS_PACE_MS = 35_000;

type ApiDonation = {
  donationID: string;
  amount: number;
  createdDateUTC: string | Date;
  displayName: string | null;
  donorID: string | null;
  donorIsRecipient: boolean | null;
  eventID: number | null;
  isRegFee: boolean | null;
  message: string | null;
  participantID: number | null;
  recipientName: string | null;
  teamID: number | null;
};

/** The fields we carry between steps; the full Donation is flattened into D1. */
type InboundDonation = {
  donationID: string;
  amount: number;
  createdDateUTC: string | Date;
  displayName: string | null;
  donorID: string | null;
  donorIsRecipient: boolean | null;
  eventID: number | null;
  isRegFee: boolean | null;
  message: string | null;
  participantID: number | null;
  recipientName: string | null;
  teamID: number | null;
};

type AnnouncedDonation = {
  donationID: string;
  displayName: string | null;
  amount: number;
  recipientName: string | null;
  message: string | null;
};

const toInbound = (donation: ApiDonation): InboundDonation => ({
  donationID: donation.donationID ?? "",
  amount: donation.amount ?? 0,
  createdDateUTC: donation.createdDateUTC ?? "",
  displayName: donation.displayName ?? null,
  donorID: donation.donorID ?? null,
  donorIsRecipient: donation.donorIsRecipient ?? null,
  eventID: donation.eventID ?? null,
  isRegFee: donation.isRegFee ?? null,
  message: donation.message ?? null,
  participantID: donation.participantID ?? null,
  recipientName: donation.recipientName ?? null,
  teamID: donation.teamID ?? null,
});

const iso = (value: string | Date): string =>
  value instanceof Date ? value.toISOString() : new Date(value).toISOString();

const currency = (amount: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export class DonationSyncWorkflow extends WorkflowEntrypoint<Env> {
  async run(_event: WorkflowEvent<Record<string, never>>, step: WorkflowStep): Promise<void> {
    try {
      const donations = await step.do("fetch-donations", async () => {
        const url = `${EXTRA_LIFE_API}/teams/${env.EXTRA_LIFE_TEAM_ID}/donations?limit=${FETCH_LIMIT}&orderBy=createdDateUTC%20DESC`;
        const response = await fetch(url, { headers: { Accept: "application/json" } });

        if (!response.ok) {
          throw new Error(`Extra Life API returned ${response.status}`);
        }

        const data = (await response.json()) as ApiDonation[];
        return data.map(toInbound);
      });

      const newDonations = await step.do<AnnouncedDonation[]>(
        "save-donations",
        {
          retries: { limit: 3, delay: "1 minute", backoff: "exponential" },
        },
        async () => {
          if (donations.length === 0) return [];

          const ids = donations.map((donation) => donation.donationID);
          const placeholders = ids.map(() => "?").join(", ");
          const existing = await env.DONATIONS_DB.prepare(
            `SELECT donation_id FROM donations WHERE donation_id IN (${placeholders})`,
          )
            .bind(...ids)
            .all<{ donation_id: string }>();
          const seen = new Set(existing.results.map((row) => row.donation_id));
          const unseen = donations.filter((donation) => !seen.has(donation.donationID));

          for (const donation of unseen) {
            await env.DONATIONS_DB.prepare(
              `INSERT OR IGNORE INTO donations
               (donation_id, amount, created_date_utc, display_name, donor_id,
                donor_is_recipient, event_id, is_reg_fee, message, participant_id,
                recipient_name, team_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            )
              .bind(
                donation.donationID,
                donation.amount,
                iso(donation.createdDateUTC),
                donation.displayName,
                donation.donorID,
                donation.donorIsRecipient ? 1 : 0,
                donation.eventID,
                donation.isRegFee ? 1 : 0,
                donation.message,
                donation.participantID,
                donation.recipientName,
                donation.teamID,
              )
              .run();
          }

          return unseen.map((donation) => ({
            donationID: donation.donationID,
            displayName: donation.displayName,
            amount: donation.amount,
            recipientName: donation.recipientName,
            message: donation.message,
          }));
        },
      );

      for (const [index, donation] of newDonations.entries()) {
        const key = donation.donationID.replace(/[^\w-]/g, "_");

        await step.do(
          `announce-${key}`,
          {
            retries: { limit: 3, delay: "1 minute", backoff: "exponential" },
          },
          async () => {
            const embed = {
              description: [
                `**${donation.displayName ?? "Anonymous"}** donated **${currency(donation.amount)}** to **${donation.recipientName}**`,
                donation.message ? ` and said:\n\n> ${donation.message}` : "",
              ].join(""),
            };

            const response = await fetch(env.DISCORD_WEBHOOK_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: "Janine Melnitz",
                avatar_url: "https://i.ytimg.com/vi/_oX3X9s2YRI/maxresdefault.jpg",
                content: "🚨 **WE GOT ONE** 🚨",
                embeds: [embed],
              }),
            });

            if (!response.ok) {
              throw new Error(`Discord webhook returned ${response.status}`);
            }
          },
        );

        // Only the first donation posts to Streamlabs immediately; the rest pace
        // to stay under the 2/min donation-feed cap.
        if (index > 0) {
          await step.sleep(`pace-tracker-${key}`, STREAMLABS_PACE_MS);
        }

        await step.do(
          `tracker-${key}`,
          {
            retries: { limit: 3, delay: "1 minute", backoff: "exponential" },
          },
          async () => {
            const body = new URLSearchParams({
              name: donation.displayName || "Anonymous",
              identifier: donation.donationID,
              amount: String(donation.amount),
              currency: "USD",
              access_token: env.STREAMLABS_TOKEN,
            });

            const response = await fetch("https://streamlabs.com/api/v1.0/donations", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: body.toString(),
            });

            if (!response.ok) {
              throw new Error(`Streamlabs returned ${response.status}`);
            }
          },
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      await step.do("alert-failure", async () => {
        const response = await fetch(env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Janine Melnitz",
            avatar_url: "https://i.ytimg.com/vi/_oX3X9s2YRI/maxresdefault.jpg",
            embeds: [
              {
                color: 0xff3c3c,
                title: "🔥 donation-sync failed",
                description: `The scheduled donation check errored:\n\`\`\`\n${message}\n\`\`\`The next cron run will retry automatically.`,
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`Discord webhook returned ${response.status}`);
        }
      });

      throw error;
    }
  }
}
