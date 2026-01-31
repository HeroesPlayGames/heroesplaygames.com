import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getLatestDonation } from '../../api'
import { FitText } from '../../components/FitText'

const query = queryOptions({
  queryKey: ['latest-donation'],
  queryFn: getLatestDonation,
  refetchInterval: 1 * 60 * 1000, // Refetch every 1 minutes
})

export const Route = createFileRoute('/scenes/latest-donation')({
  component: LatestDonationScene,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(query)
  },
})

function LatestDonationScene() {
  const { data } = useSuspenseQuery(query)

  if (!data.amount) return null

  return (
    <FitText text={`${data?.displayName ?? 'Anonymous'}-$${data?.amount}`} />
  )
}
