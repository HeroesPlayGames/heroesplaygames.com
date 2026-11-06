/**
 * Seeds the remote D1 `donations` table with donations the Vue tracker already
 * processed, so donation-sync never re-announces them on its first run.
 *
 * Usage:
 *   bun scripts/seed-donations.ts > seed.sql
 *   pnpm wrangler d1 execute heroesplaygames-donations --remote --file seed.sql
 */
/** DonorDrive caps ?limit= at 100 per request. */
const LIMIT = 100;

const sql = (value: unknown): string => {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "1" : "0";
  return `'${String(value).replace(/'/g, "''")}'`;
};

const iso = (value: string | Date | null | undefined): string => {
  if (value === null || value === undefined) return new Date(0).toISOString();
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
};

const response = await fetch(
  `https://dd.extra-life.org/api/teams/73401/donations?limit=${LIMIT}&orderBy=createdDateUTC%20DESC`,
);
if (!response.ok) throw new Error(`Extra Life API returned ${response.status}`);
const donations = (await response.json()) as Array<{
  donationID: string;
  amount: number;
  createdDateUTC: string;
  displayName: string | null;
  donorID: string | null;
  donorIsRecipient: boolean | null;
  eventID: number | null;
  isRegFee: boolean | null;
  message: string | null;
  participantID: number | null;
  recipientName: string | null;
  teamID: number | null;
}>;

const rows = donations.map(
  (donation) => `INSERT OR IGNORE INTO donations
    (donation_id, amount, created_date_utc, display_name, donor_id, donor_is_recipient,
     event_id, is_reg_fee, message, participant_id, recipient_name, team_id)
  VALUES (${sql(donation.donationID)}, ${sql(donation.amount)}, ${sql(iso(donation.createdDateUTC))},
    ${sql(donation.displayName)}, ${sql(donation.donorID)}, ${sql(donation.donorIsRecipient ?? false)},
    ${sql(donation.eventID)}, ${sql(donation.isRegFee ?? false)}, ${sql(donation.message)},
    ${sql(donation.participantID)}, ${sql(donation.recipientName)}, ${sql(donation.teamID)});`,
);

console.log(`-- seeded ${rows.length} known donation(s)\n${rows.join("\n")}`);

export {};
