import sortBy from 'lodash/sortBy'
import type { TeamParticipant } from 'extra-life-ts'

export const organizeMembers = (members: TeamParticipant[]) => {
  return sortBy(members, (member) => (member.isTeamCaptain ? 0 : 1))
}
