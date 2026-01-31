import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { StatBar } from '../components/StatBar'
import { Team } from '../components/Team'
import { Leaderboard } from '../components/Leaderboard'
import Player from '../components/Player'
import { getTeamData, getTopDonations } from '../api'

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

  return (
    <div className="bg-[#030933]">
      <div className="font-sans container mx-auto min-h-screen">
        {team.streamIsLive ? (
          <Player streamingChannel={team.streamingChannel} />
        ) : (
          <Hero team={team} />
        )}
        <StatBar team={team} />
        <Team members={members} />
        <Leaderboard donations={topDonations} />
      </div>
    </div>
  )
}
