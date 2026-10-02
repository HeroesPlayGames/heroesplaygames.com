import type { TeamParticipant } from "extra-life-ts";
import { describe, expect, it } from "vite-plus/test";

import { organizeMembers, sortBy } from "./helpers";

describe("sortBy", () => {
  it("should sort by a single property", () => {
    const items = [{ name: "Charlie" }, { name: "Alpha" }, { name: "Bravo" }];
    const sorted = sortBy(items, ["name"]);
    expect(sorted.map((i) => i.name)).toEqual(["Alpha", "Bravo", "Charlie"]);
  });

  it("should sort by a function iteratee", () => {
    const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
    const sorted = sortBy(items, [(item) => item.value]);
    expect(sorted.map((i) => i.value)).toEqual([1, 2, 3]);
  });

  it("should handle multiple iteratees", () => {
    const items = [
      { priority: 2, name: "B" },
      { priority: 1, name: "C" },
      { priority: 1, name: "A" },
    ];
    const sorted = sortBy(items, ["priority", "name"]);
    expect(sorted).toEqual([
      { priority: 1, name: "A" },
      { priority: 1, name: "C" },
      { priority: 2, name: "B" },
    ]);
  });
});

describe("organizeMembers", () => {
  it("should return captain > co-captains (alphabetical) > rest of team (alphabetical)", () => {
    const members: Array<TeamParticipant> = [
      {
        participantID: 1,
        displayName: "Zebra Member",
        isTeamCaptain: false,
        isTeamCoCaptain: false,
      },
      {
        participantID: 2,
        displayName: "Alpha Captain",
        isTeamCaptain: true,
        isTeamCoCaptain: false,
      },
      {
        participantID: 3,
        displayName: "Charlie Member",
        isTeamCaptain: false,
        isTeamCoCaptain: false,
      },
      {
        participantID: 4,
        displayName: "Bravo CoCaptain",
        isTeamCaptain: false,
        isTeamCoCaptain: true,
      },
      {
        participantID: 5,
        displayName: "Alpha CoCaptain",
        isTeamCaptain: false,
        isTeamCoCaptain: true,
      },
    ] as Array<TeamParticipant>;

    const sorted = organizeMembers(members);

    expect(sorted.map((m) => m.displayName)).toEqual([
      "Alpha Captain", // Captain first
      "Alpha CoCaptain", // Co-captains alphabetical
      "Bravo CoCaptain",
      "Charlie Member", // Rest alphabetical
      "Zebra Member",
    ]);
  });

  it("should handle team with no captain or co-captain", () => {
    const members: Array<TeamParticipant> = [
      {
        participantID: 1,
        displayName: "Charlie",
        isTeamCaptain: false,
        isTeamCoCaptain: false,
      },
      {
        participantID: 2,
        displayName: "Alpha",
        isTeamCaptain: false,
        isTeamCoCaptain: false,
      },
      {
        participantID: 3,
        displayName: "Bravo",
        isTeamCaptain: false,
        isTeamCoCaptain: false,
      },
    ] as Array<TeamParticipant>;

    const sorted = organizeMembers(members);

    expect(sorted.map((m) => m.displayName)).toEqual(["Alpha", "Bravo", "Charlie"]);
  });

  it("should handle captain who is also marked as co-captain", () => {
    const members: Array<TeamParticipant> = [
      {
        participantID: 1,
        displayName: "Regular Member",
        isTeamCaptain: false,
        isTeamCoCaptain: false,
      },
      {
        participantID: 2,
        displayName: "CaptainCoCaptain",
        isTeamCaptain: true,
        isTeamCoCaptain: true,
      },
    ] as Array<TeamParticipant>;

    const sorted = organizeMembers(members);

    expect(sorted[0].displayName).toBe("CaptainCoCaptain");
    expect(sorted[1].displayName).toBe("Regular Member");
  });
});
