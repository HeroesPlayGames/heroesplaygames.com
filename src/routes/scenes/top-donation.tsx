import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getTopDonations } from '../../api'
import { FitText } from '../../components/FitText'

const query = queryOptions({
  queryKey: ['top-donation'],
  queryFn: () => getTopDonations(1).then((res) => res[0] ?? {}),
  refetchInterval: 1 * 60 * 1000, // Refetch every 1 minutes
})

export const Route = createFileRoute('/scenes/top-donation')({
  component: TopDonationScene,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(query)
  },
})

function TopDonationScene() {
  const { data } = useSuspenseQuery(query)

  if (!data || !data.amount) return null

  return <FitText text={`${data.displayName ?? 'Anonymous'}-$${data.amount}`} />
}
