import type { TeamParticipant } from 'extra-life-ts'
import sortBy from 'lodash/sortBy'

export const organizeMembers = (members: TeamParticipant[]) => {
  return sortBy(members, [
    // Captains first
    (m) => (m.isTeamCaptain ? -1 : 1),
    // Then sort by CoCaptains
    (m) => (m.isTeamCoCaptain ? -1 : 1),
    // Rest of the team
    'displayName',
  ])
}
