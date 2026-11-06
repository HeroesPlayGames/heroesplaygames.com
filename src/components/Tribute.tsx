import type { Participant } from "extra-life-ts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/8bit/avatar";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Progress } from "@/components/ui/8bit/progress";
import { currencyFormat } from "@/lib/currency";

interface TributeProps {
  member: Participant;
}

export const Tribute = ({ member }: TributeProps) => {
  const firstName = member.displayName.split(" ")[0];
  const percentage = member.fundraisingGoal
    ? Math.round((member.sumDonations / member.fundraisingGoal) * 100)
    : 0;

  return (
    <section aria-label={`In memory of ${member.displayName}`} className="mb-12">
      <Card font="retro" className="relative overflow-hidden border-amber-400">
        <CardContent className="relative p-8 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              IN LOVING MEMORY
            </Badge>

            <Avatar className="size-24" variant="pixel" font="retro">
              <AvatarImage src={member.avatarImageURL} alt={member.displayName} />
              <AvatarFallback className="text-2xl">
                {member.displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="max-w-2xl space-y-3">
              <h2 className="text-xl font-bold sm:text-2xl">
                In honor of our brother, {member.displayName}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                This year we play in his honor — please consider donating in his name to help kids
                through Children&apos;s Miracle Network Hospitals.
              </p>
            </div>

            <div className="w-full max-w-md space-y-2 text-center">
              <span className="text-muted-foreground retro text-[9px] sm:text-xs">
                {currencyFormat(member.sumDonations)}
                {member.fundraisingGoal ? `/${currencyFormat(member.fundraisingGoal)}` : ""} ·{" "}
                {percentage}%
              </span>
              <Progress
                value={Math.min(percentage, 100)}
                variant="retro"
                progressBg="bg-amber-400"
                className="h-3"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href={member.links.donate} target="_blank" rel="noopener noreferrer">
                  DONATE IN {firstName.toUpperCase()}&apos;S NAME
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={member.links.page} target="_blank" rel="noopener noreferrer">
                  VISIT {firstName.toUpperCase()}&apos;S PAGE
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
