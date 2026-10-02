import type { Donation } from "extra-life-ts";

import { Leaderboard as ThemedLeaderboard } from "@/components/ui/8bit/blocks/leaderboard";

interface LeaderboardProps {
  donations: Array<Donation>;
}

export function Leaderboard({ donations }: LeaderboardProps) {
  return (
    <section className="mb-12">
      <ThemedLeaderboard
        players={donations.map((donation, index) => ({
          id: donation.donationID || `donation-${index}`,
          name: donation.displayName || "Anonymous Hero",
          score: donation.amount,
          message: donation.message,
        }))}
        title="HIGH SCORES"
        maxPlayers={10}
      />
    </section>
  );
}
