import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { getTeamData } from '../../api'
import { FitText } from '../../components/FitText'
import { currencyFormat } from '../../utils/currency'

const searchSchema = z.object({
  participantID: z.string().optional(),
  showGoal: z.boolean().optional(),
})

const query = queryOptions({
  queryKey: ['team-data'],
  queryFn: getTeamData,
  refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
})

export const Route = createFileRoute('/scenes/user-donations')({
  component: UserDonationsScene,
  validateSearch: searchSchema,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(query)
  },
})

function UserDonationsScene() {
  const {
    data: { members },
  } = useSuspenseQuery(query)
  const { participantID, showGoal } = Route.useSearch()

  const member = members.find(
    (p: any) => p.participantID === Number(participantID),
  )

  if (!member) {
    return null
  }

  return (
    <FitText
      text={`${member.displayName.split(' ')[0]} - ${currencyFormat(member.sumDonations)} ${
        showGoal ? `/ ${currencyFormat(member.fundraisingGoal)}` : ''
      }`}
    />
  )
}
