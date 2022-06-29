import type { TeamParticipant } from 'extra-life-ts'
import sortBy from 'lodash/sortBy'

export const organizeMembers = (members: TeamParticipant[]) => {
  return sortBy(members, [(m) => (m.isTeamCaptain ? -1 : 1), 'displayName'])
}
