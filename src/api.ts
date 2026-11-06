import { getParticipant, getTeam, getTeamDonations, getTeamParticipants } from "extra-life-ts";
import type { Donation, Participant, Team, TeamParticipant } from "extra-life-ts";

import { EXTRA_LIFE_TEAM_ID, TRIBUTE_PARTICIPANT_ID } from "./lib/constants";

interface TeamDataResponse {
  team: Team;
  members: Array<TeamParticipant>;
  tributeMember: Participant | null;
}

export async function getTeamData(): Promise<TeamDataResponse> {
  const teamRequest = await getTeam(EXTRA_LIFE_TEAM_ID);
  const teamMembersRequest = await getTeamParticipants(EXTRA_LIFE_TEAM_ID);

  let tributeMember: Participant | null = null;
  try {
    const tributeRequest = await getParticipant(TRIBUTE_PARTICIPANT_ID);
    tributeMember = tributeRequest.data ?? null;
  } catch {
    tributeMember = null;
  }

  return {
    team: teamRequest.data,
    members: teamMembersRequest.data,
    tributeMember,
  };
}

export const getTopDonations = async (limit: number = 10): Promise<Array<Donation>> => {
  const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, {
    limit,
    orderBy: "amount DESC",
  });

  return data;
};

export const getLatestDonation = async (): Promise<Donation> => {
  const { data } = await getTeamDonations(EXTRA_LIFE_TEAM_ID, {
    limit: 1,
    orderBy: "createdDateUTC DESC",
  });

  return data[0] ?? {};
};
