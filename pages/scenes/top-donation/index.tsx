import { FitText } from '@components/FitText'
import { useSceneStyle } from '@hooks'
import { getTopDonation } from '@pages/api/top-donation'
import type { Donation } from 'extra-life-ts'
import { useQuery } from 'react-query'

const fetchTopDonation = async () => {
  const response = await fetch('/api/donations')
  const data = await response.json()
  return data
}

export default function TopDonation(topDonation: Donation) {
  useSceneStyle()
  const { data } = useQuery(['TopDonation'], fetchTopDonation, {
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    initialData: topDonation,
  })

  return <FitText text={`${data?.displayName ?? 'Anonymous'} - $${data?.amount}`} />
}

export const getServerSideProps = async () => {
  const props = await getTopDonation()

  return {
    props,
  }
}
