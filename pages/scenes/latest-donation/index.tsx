import { FitText } from '@components/FitText'
import { useSceneStyle } from '@hooks'
import { getLatestDonation } from '@pages/api/latest-donation'
import type { Donation } from 'extra-life-ts'
import { useQuery } from 'react-query'

const fetchDonations = async () => {
  const response = await fetch('/api/latest-donation')
  const data = await response.json()
  return data
}

export default function RecentDonor(latestDonation: Donation) {
  console.log(`🚀 ~ file: index.tsx ~ line 14 ~ RecentDonor ~ latestDonation`, latestDonation)
  useSceneStyle()
  const { data } = useQuery(['LatestDonation'], fetchDonations, {
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    initialData: latestDonation,
  })

  return <FitText text={`${data?.displayName ?? 'Anonymous'} - $${data?.amount}`} />
}

export const getServerSideProps = async () => {
  const props = await getLatestDonation()

  return {
    props,
  }
}
