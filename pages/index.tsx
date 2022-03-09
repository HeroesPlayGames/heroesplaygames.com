import { Hero, Player, StatBar, Team } from '@partials/index'
import { Team as ELTeam, TeamParticipant } from 'extra-life-ts'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { getTeamData } from './api/roster'

export const getStaticProps: GetStaticProps = async () => {
  const data = await getTeamData()

  return {
    props: data,
    revalidate: 5 * 60, // 5 minutes
  }
}
export default function Home({ team, members }: { team: ELTeam; members: TeamParticipant[] }) {
  return (
    <>
      <Head>
        <title>Heroes Play Games</title>
        <meta name="title" content="Heroes Play Games" />
        <meta
          name="description"
          content="We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital."
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://heroesplaygames.com/" />
        <meta property="og:title" content="Heroes Play Games" />
        <meta
          property="og:description"
          content="We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital."
        />
        <meta property="og:image" content="/ogimage.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://heroesplaygames.com/" />
        <meta property="twitter:title" content="Heroes Play Games" />
        <meta
          property="twitter:description"
          content="We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital."
        />
        <meta property="twitter:image" content="/ogimage.jpg" />
      </Head>

      <main>
        {team.streamIsLive ? <Player /> : <Hero team={team} />}
        <StatBar team={team} />
        <Team members={members} />
      </main>
    </>
  )
}
