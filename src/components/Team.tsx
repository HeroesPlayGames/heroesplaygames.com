import { useEffect, useState } from 'react'
import type { TeamParticipant } from 'extra-life-ts'
import PlayerProfileCard from '@/components/ui/8bit/blocks/player-profile-card'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/8bit/card'
import { organizeMembers } from '@/lib/helpers'

const playerNumberOfYears: Record<number, number> = {
  566046: 11,
  566076: 8,
}

interface TeamProps {
  members: Array<TeamParticipant>
}

export const Team = ({ members }: TeamProps) => {
  const [highlightedMember, setHighlightedMember] = useState<TeamParticipant>()
  const organizedMembers = organizeMembers(members)

  useEffect(() => {
    if (members.length > 0) {
      setHighlightedMember(members[Math.floor(Math.random() * members.length)])
    }
  }, [members])

  return (
    <section id="heroes" className="mb-12">
      <Card font="retro">
        <CardHeader>
          <CardTitle className="text-center">THE HEROES</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Help us reach our goal by donating to someone below.{' '}
            {highlightedMember && (
              <>
                If you&apos;re having trouble picking, how about{' '}
                <a
                  href={highlightedMember.links.donate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-bold"
                >
                  {highlightedMember.displayName.split(' ')[0]}
                </a>
                ?
              </>
            )}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
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
                  label: 'Fundraising',
                  value: member.sumDonations,
                  max: member.fundraisingGoal,
                  color: 'bg-green-500',
                },
              ]}
              playerClass={
                member.isTeamCaptain
                  ? 'CAPTAIN'
                  : member.isTeamCoCaptain
                    ? 'CO-CAPTAIN'
                    : 'HERO'
              }
            />
          </a>
        ))}
      </div>
    </section>
  )
}
