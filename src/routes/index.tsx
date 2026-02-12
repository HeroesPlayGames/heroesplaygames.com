import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getTeamData, getTopDonations } from '../api'
import type { TeamParticipant } from 'extra-life-ts'
import { Button } from '@/components/ui/8bit/button'
import { Badge } from '@/components/ui/8bit/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/8bit/card'
import SaveSlots from '@/components/ui/8bit/blocks/save-slots'
import PlayerProfileCard from '@/components/ui/8bit/blocks/player-profile-card'
import Leaderboard from '@/components/ui/8bit/blocks/leaderboard'
import { currencyFormat } from '@/utils/currency'
import { organizeMembers } from '@/utils/helpers'

const previousYears = {
  '2021': {
    sumDonations: 5431,
    fundraisingGoal: 5000,
    numDonations: 45,
  },
  '2022': {
    sumDonations: 10585,
    fundraisingGoal: 10000,
    numDonations: 73,
  },
  '2023': {
    sumDonations: 7487,
    fundraisingGoal: 8000,
    numDonations: 64,
  },
  '2024': {
    sumDonations: 6099,
    fundraisingGoal: 6000,
    numDonations: 67,
  },
  '2025': {
    sumDonations: 23000,
    fundraisingGoal: 20000,
    numDonations: 82,
  },
} as Record<
  string,
  { sumDonations: number; fundraisingGoal: number; numDonations: number }
>

const playerNumberOfYears: Record<number, number> = {
  566046: 11,
  566076: 8,
}

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const [teamData, topDonations] = await Promise.all([
      getTeamData(),
      getTopDonations(10),
    ])
    return { ...teamData, topDonations }
  },
  head: () => ({
    meta: [
      { title: 'Heroes Play Games' },
      { name: 'title', content: 'Heroes Play Games' },
      {
        name: 'description',
        content:
          "We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital.",
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://heroesplaygames.com/' },
      { property: 'og:title', content: 'Heroes Play Games' },
      {
        property: 'og:description',
        content:
          "We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital.",
      },
      { property: 'og:image', content: '/ogimage.jpg' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: 'https://heroesplaygames.com/' },
      { property: 'twitter:title', content: 'Heroes Play Games' },
      {
        property: 'twitter:description',
        content:
          "We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital.",
      },
      { property: 'twitter:image', content: '/ogimage.jpg' },
    ],
  }),
})

function Home() {
  const { team, members, topDonations } = Route.useLoaderData()
  const organizedMembers = organizeMembers(members)
  const currentYear = new Date().getFullYear()
  const [highlightedMember, setHighlightedMember] = useState<TeamParticipant>()

  useEffect(() => {
    if (members.length > 0) {
      setHighlightedMember(members[Math.floor(Math.random() * members.length)])
    }
  }, [members])

  return (
    <div className="min-h-screen bg-background">
      <div className="font-sans container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <Card className="relative overflow-hidden" font="retro">
            <div className="absolute inset-0 bg-[url(/background.png)] bg-cover bg-center opacity-20" />
            <CardContent className="relative p-8 sm:p-12">
              <div className="flex flex-col items-center gap-6">
                <img
                  src="/logo.png"
                  alt="Heroes Play Games"
                  className="w-full max-w-md pixelated drop-shadow-lg"
                />
                <div className="text-center space-y-4">
                  <Badge variant="default" className="text-xs sm:text-sm">
                    EXTRA LIFE {currentYear}
                  </Badge>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                    A fundraising team playing games to heal kids through
                    Children&apos;s Miracle Network Hospitals
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <a
                      href={team.links.page}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      JOIN TEAM
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#heroes">MEET THE HEROES</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Current Year Stats */}
        <section className="mb-12">
          <Card font="retro">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-3">
                <span>{currentYear} CAMPAIGN</span>
                <Badge variant="secondary">IN PROGRESS</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary retro">
                    {currencyFormat(team.sumDonations)}
                  </div>
                  <div className="text-xs text-muted-foreground retro mt-1">
                    RAISED
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary retro">
                    {currencyFormat(team.fundraisingGoal)}
                  </div>
                  <div className="text-xs text-muted-foreground retro mt-1">
                    GOAL
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary retro">
                    {team.numDonations}
                  </div>
                  <div className="text-xs text-muted-foreground retro mt-1">
                    DONATIONS
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Save Slots - Previous Years */}
        <section className="mb-12">
          <SaveSlots
            slots={Object.entries(previousYears).map(([year, data]) => ({
              id: year,
              name: `YEAR ${year}`,
              description: `${currencyFormat(data.sumDonations)} raised · ${data.numDonations} donations`,
              isEmpty: false,
            }))}
            layout="grid"
            title="QUEST LOG"
            showPreview={false}
            showTimestamp={false}
          />
        </section>

        {/* Team Members */}
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

        {/* Leaderboard */}
        <section className="mb-12">
          <Leaderboard
            players={topDonations.map((donation) => ({
              id: donation.donationID || String(Math.random()),
              name: donation.displayName || 'Anonymous Hero',
              score: donation.amount,
              message: donation.message,
            }))}
            title="HIGH SCORES"
            maxPlayers={10}
          />
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-xs text-muted-foreground retro">
            PLAY GAMES · HEAL KIDS · CHANGE LIVES
          </p>
          <p className="text-[10px] text-muted-foreground/60 mt-2">
            © {currentYear} Heroes Play Games · Extra Life
          </p>
        </footer>
      </div>
    </div>
  )
}
