import { FitText } from '@components/FitText'
import { useSceneStyle } from '@hooks'
import { getTeamData } from '@pages/api/roster'
import { currencyFormat } from '@utils/currency'
import type { Participant, Team } from 'extra-life-ts'
import type { GetServerSideProps } from 'next'
import { useQuery } from 'react-query'

interface InitialData {
  team: Team
  members: Participant[]
}

interface Props {
  participantID: string
  initialData: InitialData
  showGoal?: boolean
}

export default function UserDonations({ initialData, participantID, showGoal = false }: Props) {
  useSceneStyle()
  const { data, isSuccess } = useQuery('TeamInfo', () => fetch('/api/roster').then((res) => res.json()), {
    refetchInterval: 2.5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    initialData,
    select: (data: InitialData) => {
      return data.members.find((participant) => participant.participantID === Number(participantID))
    },
  })

  if (!data || !isSuccess) {
    return null
  }

  return (
    <FitText
      text={`${data.displayName.split(' ')[0]} - ${currencyFormat(data.sumDonations)} ${
        showGoal ? `/ ${currencyFormat(data.fundraisingGoal)}` : ''
      }`}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const initialData = await getTeamData()

  return {
    props: {
      ...query,
      initialData,
    },
  }
}
