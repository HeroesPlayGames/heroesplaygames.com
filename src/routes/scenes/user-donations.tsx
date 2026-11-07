import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getParticipant } from "extra-life-ts";
import { z } from "zod";

import { currencyFormat } from "@/lib/currency";

import { FitText } from "../../components/FitText";

const searchSchema = z.object({
  participantID: z.union([z.string(), z.number()]).optional(),
  showGoal: z.boolean().optional(),
});

const query = (participantID: string | number) =>
  queryOptions({
    queryKey: ["participant", participantID],
    queryFn: async () => getParticipant(participantID),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

export const Route = createFileRoute("/scenes/user-donations")({
  component: UserDonationsScene,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps: { participantID } }) => {
    if (participantID === undefined) {
      return null;
    }
    return await queryClient.query({ ...query(participantID), staleTime: "static" });
  },
});

function UserDonationsScene() {
  const { participantID, showGoal } = Route.useSearch();

  if (participantID === undefined) {
    return null;
  }

  return <Content participantID={participantID} showGoal={showGoal} />;
}

function Content({
  participantID,
  showGoal,
}: {
  participantID: string | number;
  showGoal?: boolean;
}) {
  const {
    data: { data: member },
  } = useSuspenseQuery(query(participantID));

  if (!member) {
    return null;
  }

  return (
    <FitText
      text={`${member.displayName.split(" ")[0]} - ${currencyFormat(member.sumDonations)} ${
        showGoal ? `/ ${currencyFormat(member.fundraisingGoal)}` : ""
      }`}
    />
  );
}
