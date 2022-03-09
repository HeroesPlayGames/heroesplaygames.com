import { useSceneStyle } from '@hooks'
import { getTeamData } from '@pages/api/roster'
import type { Team } from 'extra-life-ts'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'

const DonationBar = dynamic(() => import('@components/DonationBar'), {
  ssr: false,
})

interface Props {
  team: Team
}

export default function Donations({ team }: Props) {
  useSceneStyle()
  const { data, isSuccess } = useQuery('TeamInfo', () => fetch('/api/roster').then((res) => res.json()), {
    refetchInterval: 2.5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    initialData: team,
  })

  if (!data || !isSuccess) {
    return null
  }

  return <DonationBar currentDonations={team?.sumDonations ?? 0} goal={team?.fundraisingGoal ?? 0} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { team } = await getTeamData()

  return {
    props: {
      team,
    },
  }
}
