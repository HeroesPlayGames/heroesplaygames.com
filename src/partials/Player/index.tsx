import { AspectRatio, Button, Center, Flex } from '@chakra-ui/react'
import Image from 'next/legacy/image'
import { lazy, Suspense } from 'react'

const Player = ({ streamingChannel }: { streamingChannel: string }) => {
  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser) return null

  // @ts-ignore
  const ReactTwitchEmbedVideo = lazy(() => import('react-twitch-embed-video'))

  return (
    <Suspense fallback={<p>loading...</p>}>
      <Flex flexDirection="column" p="10" backgroundImage="/background.png" backgroundSize="cover" width="100%">
        <Flex justifyContent="center" pb="2">
          <Image alt="Heroes Play Games" src="/logo.png" width={227} height={132} layout="fixed" />
        </Flex>
        <AspectRatio ratio={16 / 9}>
          <ReactTwitchEmbedVideo
            channel={streamingChannel}
            autoplay
            parent={['localhost', 'heroesplaygames.com', 'www.heroesplaygames.com']}
            layout="video"
            width="100%"
            // muted
          />
        </AspectRatio>

        <Center>
          <Button
            my={5}
            maxW="max-content"
            onClick={() => (window.location.href = `https://twitch.tv/${streamingChannel}`)}
          >
            Watch On Twitch.tv
          </Button>
        </Center>
      </Flex>
    </Suspense>
  )
}

export default Player
