import { EXTRA_LIFE_TEAM_ID, REDIS_KEYS } from '@utils/constants'
import redis from '@lib/redis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeam, getTeamParticipants } from 'extra-life-ts'
import type { Team, TeamParticipant } from 'extra-life-ts'

interface Response {
  team: Team
  members: TeamParticipant[]
}

export async function getTeamData(): Promise<Response> {
  const team = await redis.get(REDIS_KEYS.TEAM_INFO)
  const teamMembers = await redis.get(REDIS_KEYS.TEAM_ROSTER)

  if (!team || !teamMembers) {
    const teamRequest = await getTeam(EXTRA_LIFE_TEAM_ID)
    const teamMembersRequest = await getTeamParticipants(EXTRA_LIFE_TEAM_ID)

    await redis.set(REDIS_KEYS.TEAM_INFO, JSON.stringify(teamRequest.data), 'EX', 60 * 5)
    await redis.set(REDIS_KEYS.TEAM_ROSTER, JSON.stringify(teamMembersRequest.data), 'EX', 60 * 5)

    return {
      team: teamRequest.data,
      members: teamMembersRequest.data,
    }
  }

  return {
    team: JSON.parse(team),
    members: JSON.parse(teamMembers),
  }
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Response>) {
  const teamData = await getTeamData()

  res.status(200).json(teamData)
}
