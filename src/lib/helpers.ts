import type { TeamParticipant } from "extra-life-ts";

type Iteratee<T> = ((item: T) => unknown) | keyof T;

export const sortBy = <T>(array: Array<T>, iteratees: Array<Iteratee<T>>): Array<T> => {
  return [...array].sort((a, b) => {
    for (const iteratee of iteratees) {
      let valueA: unknown;
      let valueB: unknown;

      if (typeof iteratee === "function") {
        valueA = iteratee(a);
        valueB = iteratee(b);
      } else {
        valueA = a[iteratee];
        valueB = b[iteratee];
      }

      const strA = String(valueA);
      const strB = String(valueB);
      if (strA < strB) return -1;
      if (strA > strB) return 1;
    }
    return 0;
  });
};

export const organizeMembers = (members: Array<TeamParticipant>) => {
  return sortBy(members, [
    // Captains first
    (m: TeamParticipant) => (m.isTeamCaptain ? -1 : 1),
    // Then sort by CoCaptains
    (m: TeamParticipant) => (m.isTeamCoCaptain ? -1 : 1),
    // Rest of the team
    "displayName",
  ]);
};
