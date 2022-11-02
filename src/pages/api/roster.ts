import { EXTRA_LIFE_TEAM_ID } from '@utils/constants'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeam, getTeamParticipants } from 'extra-life-ts'
import type { Team, TeamParticipant } from 'extra-life-ts'

interface Response {
  team: Team
  members: TeamParticipant[]
}

export async function getTeamData(): Promise<Response> {
  const teamRequest = await getTeam(EXTRA_LIFE_TEAM_ID)
  const teamMembersRequest = await getTeamParticipants(EXTRA_LIFE_TEAM_ID)

  return {
    team: teamRequest.data,
    members: teamMembersRequest.data,
  }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Response>) {
  const teamData = await getTeamData()

  res.status(200).json(teamData)
}
