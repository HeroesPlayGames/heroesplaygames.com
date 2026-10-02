import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Leaderboard } from "@/components/Leaderboard";
import { StatBar } from "@/components/StatBar";
import { Team } from "@/components/Team";

import { getTeamData, getTopDonations } from "../api";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const [teamData, topDonations] = await Promise.all([getTeamData(), getTopDonations(10)]);
    return { ...teamData, topDonations };
  },
  head: () => ({
    meta: [
      { title: "Heroes Play Games" },
      { name: "title", content: "Heroes Play Games" },
      {
        name: "description",
        content:
          "We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital.",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        content: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://heroesplaygames.com" },
      { property: "og:title", content: "Heroes Play Games" },
      {
        property: "og:description",
        content:
          "We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital.",
      },
      { property: "og:image", content: "/logo.png" },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: "https://heroesplaygames.com/" },
      { property: "twitter:title", content: "Heroes Play Games" },
      {
        property: "twitter:description",
        content:
          "We're on a mission to play games to help change kids' health. We've each chosen our local Children's Miracle Network Hospital.",
      },
      { property: "twitter:image", content: "/logo.png" },
    ],
  }),
});

function Home() {
  const { team, members, topDonations } = Route.useLoaderData();

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 font-sans">
        <Hero team={team} />
        <StatBar team={team} />
        <Team members={members} />
        <Leaderboard donations={topDonations} />
        <Footer />
      </div>
    </div>
  );
}
