import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeamDonations } from 'extra-life-ts'
import type { Donation } from 'extra-life-ts'
import { EXTRA_LIFE_TEAM_ID } from '@utils/constants'

export const getLatestDonation = async (): Promise<Donation> => {
  const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, {
    limit: 1,
    orderBy: 'createdDateUTC DESC',
  })

  return data[0] ?? {}
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Donation>) {
  const responseData = await getLatestDonation()

  res.status(200).json(responseData)
}
