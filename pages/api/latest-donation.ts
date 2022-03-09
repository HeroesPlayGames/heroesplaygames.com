import redis from '@lib/redis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeamDonations } from 'extra-life-ts'
import type { Donation } from 'extra-life-ts'
import { EXTRA_LIFE_TEAM_ID, REDIS_KEYS } from '@utils/constants'

export const getLatestDonation = async (): Promise<Donation> => {
  let latestDonation = await redis.get(REDIS_KEYS.LATEST_DONATION)

  if (latestDonation) {
    return JSON.parse(latestDonation)
  } else {
    const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, {
      limit: 1,
      orderBy: 'createdDateUTC DESC',
    })

    const result = data[0] ?? {}

    await redis.set(REDIS_KEYS.LATEST_DONATION, JSON.stringify(result), 'EX', 60 * 5)

    return result
  }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Donation>) {
  const responseData = await getLatestDonation()

  res.status(200).json(responseData)
}
