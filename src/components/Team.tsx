import type { TeamParticipant } from "extra-life-ts";
import { useState } from "react";

import PlayerProfileCard from "@/components/ui/8bit/blocks/player-profile-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/8bit/card";
import { organizeMembers } from "@/lib/helpers";

const playerNumberOfYears: Record<number, number> = {
  566046: 11,
  566076: 8,
};

interface TeamProps {
  members: Array<TeamParticipant>;
}

const pickRandomMember = (members: Array<TeamParticipant>) =>
  members.length > 0 ? members[Math.floor(Math.random() * members.length)] : undefined;

export const Team = ({ members }: TeamProps) => {
  const [selection, setSelection] = useState(() => ({
    source: members,
    member: pickRandomMember(members),
  }));

  // Adjust the random pick during render when a new member list arrives,
  // instead of syncing it from an effect.
  if (selection.source !== members) {
    setSelection({ source: members, member: pickRandomMember(members) });
  }

  const highlightedMember = selection.member;
  const organizedMembers = organizeMembers(members);

  return (
    <section id="heroes" className="mb-12">
      <Card font="retro">
        <CardHeader>
          <CardTitle className="text-center">THE HEROES</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm">
            Help us reach our goal by donating to someone below.{" "}
            {highlightedMember && (
              <>
                If you&apos;re having trouble picking, how about{" "}
                <a
                  href={highlightedMember.links.donate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  {highlightedMember.displayName.split(" ")[0]}
                </a>
                ?
              </>
            )}
          </p>
        </CardContent>
      </Card>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {organizedMembers.map((member) => (
          <a
            key={member.participantID}
            href={member.links.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-105"
          >
            <PlayerProfileCard
              playerName={member.displayName}
              avatarSrc={member.avatarImageURL}
              avatarFallback={member.displayName}
              level={playerNumberOfYears[member.participantID] || 1}
              customStats={[
                {
                  label: "Fundraising",
                  value: member.sumDonations,
                  max: member.fundraisingGoal,
                  color: "bg-green-500",
                },
              ]}
              playerClass={
                member.isTeamCaptain ? "CAPTAIN" : member.isTeamCoCaptain ? "CO-CAPTAIN" : "HERO"
              }
            />
          </a>
        ))}
      </div>
    </section>
  );
};
