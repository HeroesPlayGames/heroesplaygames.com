import type { TeamParticipant } from 'extra-life-ts'

/**
 *  Move captain to front of array and sort rest of members by display name
 * */
export const organizeMembers = (members: TeamParticipant[]) => {
  return members.sort((a, b) => (a.isTeamCaptain ? -1 : a.displayName.localeCompare(b.displayName)))
}
