import { Suspense } from "react";
// @ts-ignore - react-twitch-embed-video has no types
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const Player = ({ streamingChannel }: { streamingChannel: string }) => {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) return null;

  return (
    <Suspense fallback={<p>loading...</p>}>
      <div className="background-[url(/background.png)] bg-cover p-10 text-center">
        <div className="flex justify-center pb-2">
          <img alt="Heroes Play Games" src="/logo.png" width={227} height={132} />
        </div>
        <div className="aspect-video">
          <ReactTwitchEmbedVideo
            channel={streamingChannel}
            autoplay
            parent={["localhost", "heroesplaygames.com", "www.heroesplaygames.com"]}
            layout="video"
            width="100%"
            // muted
          />
        </div>
        <div className="p-10">
          <a
            className="w-fit rounded-lg bg-orange-600 px-10 py-2 font-semibold hover:bg-orange-500"
            href={`https://twitch.tv/${streamingChannel}`}
          >
            Watch On Twitch.tv
          </a>
        </div>
      </div>
    </Suspense>
  );
};

export default Player;
