import { getTeam, getTeamDonations, getTeamParticipants } from 'extra-life-ts'
import { EXTRA_LIFE_TEAM_ID } from './utils/constants'
import type { Donation, Team, TeamParticipant } from 'extra-life-ts'

interface TeamDataResponse {
  team: Team
  members: Array<TeamParticipant>
}

export async function getTeamData(): Promise<TeamDataResponse> {
  const teamRequest = await getTeam(EXTRA_LIFE_TEAM_ID)
  const teamMembersRequest = await getTeamParticipants(EXTRA_LIFE_TEAM_ID)

  return {
    team: teamRequest.data,
    members: teamMembersRequest.data,
  }
}

export const getTopDonations = async (
  limit: number = 10,
): Promise<Array<Donation>> => {
  const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, {
    limit,
    orderBy: 'amount DESC',
  })

  return data
}

export const getLatestDonation = async (): Promise<Donation> => {
  const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, {
    limit: 1,
    orderBy: 'createdDateUTC DESC',
  })

  return data[0] ?? {}
}
