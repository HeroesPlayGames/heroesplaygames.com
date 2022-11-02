import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeamDonations } from 'extra-life-ts'
import type { Donation } from 'extra-life-ts'
import { EXTRA_LIFE_TEAM_ID } from '@utils/constants'

export const getTopDonation = async (): Promise<Donation> => {
  const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, { limit: 1, orderBy: 'amount DESC' })

  return data[0] ?? {}
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Donation>) {
  const responseData = await getTopDonation()

  res.status(200).json(responseData)
}
