import redis from '@lib/redis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeamDonations } from 'extra-life-ts'
import type { Donation } from 'extra-life-ts'
import { EXTRA_LIFE_TEAM_ID, REDIS_KEYS } from '@utils/constants'

export const getTopDonation = async (): Promise<Donation> => {
  let topDonation = await redis.get(REDIS_KEYS.TOP_DONATION)

  if (topDonation) {
    return JSON.parse(topDonation)
  } else {
    const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, { limit: 1, orderBy: 'amount DESC' })
    const result = data[0] ?? {}

    await redis.set(REDIS_KEYS.TOP_DONATION, JSON.stringify(result), 'EX', 60 * 5)

    return result
  }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Donation>) {
  const responseData = await getTopDonation()

  res.status(200).json(responseData)
}
