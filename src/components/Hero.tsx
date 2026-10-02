import type { Team } from "extra-life-ts";

import { Badge } from "./ui/8bit/badge";
import { Button } from "./ui/8bit/button";
import { Card, CardContent } from "./ui/8bit/card";

interface Props {
  team: Team;
}

export const Hero = ({ team }: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="mb-12">
      <Card className="relative overflow-hidden" font="retro">
        <div className="absolute inset-0 bg-[url(/background.png)] bg-cover bg-center opacity-20" />
        <CardContent className="relative p-8 sm:p-12">
          <div className="flex flex-col items-center gap-6">
            <img
              src="/logo.png"
              alt="Heroes Play Games"
              className="pixelated w-full max-w-md drop-shadow-lg"
            />
            <div className="space-y-4 text-center">
              <Badge variant="default" className="text-xs sm:text-sm">
                EXTRA LIFE {currentYear}
              </Badge>
              <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
                A fundraising team playing games to heal kids through Children&apos;s Miracle
                Network Hospitals
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href={team.links.page} target="_blank" rel="noopener noreferrer">
                  JOIN TEAM
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#heroes">MEET THE HEROES</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
