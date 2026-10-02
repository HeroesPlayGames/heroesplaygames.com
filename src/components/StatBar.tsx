import type { Team } from "extra-life-ts";

import { Badge } from "@/components/ui/8bit/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/8bit/card";
import { currencyFormat } from "@/lib/currency";

import SaveSlots from "./ui/8bit/blocks/save-slots";

const previousYears = {
  "2021": {
    sumDonations: 5431,
    fundraisingGoal: 5000,
    numDonations: 45,
  },
  "2022": {
    sumDonations: 10585,
    fundraisingGoal: 10000,
    numDonations: 73,
  },
  "2023": {
    sumDonations: 7487,
    fundraisingGoal: 8000,
    numDonations: 64,
  },
  "2024": {
    sumDonations: 6099,
    fundraisingGoal: 6000,
    numDonations: 67,
  },
  "2025": {
    sumDonations: 23000,
    fundraisingGoal: 20000,
    numDonations: 82,
  },
} as Record<string, { sumDonations: number; fundraisingGoal: number; numDonations: number }>;

interface StatBarProps {
  team: Team;
}

export const StatBar = ({ team }: StatBarProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="mb-12">
        <Card font="retro">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3 text-center">
              <span>{currentYear} CAMPAIGN</span>
              <Badge variant="secondary">IN PROGRESS</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-primary retro text-3xl font-bold">
                  {currencyFormat(team.sumDonations)}
                </div>
                <div className="text-muted-foreground retro mt-1 text-xs">RAISED</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-primary retro text-3xl font-bold">
                  {currencyFormat(team.fundraisingGoal)}
                </div>
                <div className="text-muted-foreground retro mt-1 text-xs">GOAL</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-primary retro text-3xl font-bold">{team.numDonations}</div>
                <div className="text-muted-foreground retro mt-1 text-xs">DONATIONS</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="mb-12">
        <SaveSlots
          slots={Object.entries(previousYears).map(([year, data]) => ({
            id: year,
            name: `YEAR ${year}`,
            description: `${currencyFormat(data.sumDonations)} raised · ${data.numDonations} donations`,
            isEmpty: false,
          }))}
          layout="grid"
          title="QUEST LOG"
          showPreview={false}
          showTimestamp={false}
        />
      </section>
    </>
  );
};
