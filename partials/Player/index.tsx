import { AspectRatio, Button, Center, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { lazy, Suspense } from 'react'

export const Player = () => {
  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser) return null

  // @ts-ignore
  const ReactTwitchEmbedVideo = lazy(() => import('react-twitch-embed-video'))

  return (
    <Suspense fallback={<p>loading...</p>}>
      <Flex flexDirection="column" p="10" backgroundImage="/background.png" width="100%">
        <Flex justifyContent="center" pb="2">
          <Image alt="Heroes Play Games" src="/logo.png" width="227px" height="132px" layout="fixed" />
        </Flex>
        <AspectRatio ratio={16 / 9}>
          <ReactTwitchEmbedVideo
            channel="heroesplaygames"
            autoplay
            parent={['localhost', 'heroesplaygames.com', 'www.heroesplaygames.com']}
            layout="video"
            width="100%"
            // muted
          />
        </AspectRatio>

        <Center>
          <Button my={5} maxW="max-content" onClick={() => (window.location.href = 'https://twitch.tv')}>
            Watch On Twitch.tv
          </Button>
        </Center>
      </Flex>
    </Suspense>
  )
}
