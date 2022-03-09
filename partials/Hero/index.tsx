import { Box, Button, Flex, Heading, Img, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import type { Team } from 'extra-life-ts'
import { useRouter } from 'next/router'

interface Props {
  team: Team
}

export const Hero = ({ team }: Props) => {
  const router = useRouter()

  return (
    <Box as="section" bg="#030933">
      <Box mx="auto" pl={{ base: 0, lg: 16 }} pb={{ base: 5, md: 0 }}>
        <SimpleGrid spacing={4} columns={{ base: 1, md: 2 }} row={{ base: 2, md: 1 }}>
          <Box maxW={{ lg: '520px' }} px={{ base: 6, lg: 0 }}>
            <Heading as="h1" size="3xl" mt="8" fontWeight="extrabold" letterSpacing="tight" textStyle={'gradient'}>
              Play games
              <br />
              Heal kids
            </Heading>
            <Text color="gray.100" mt="4" fontSize="lg" fontWeight="medium">
              Extra Life, a fundraising program of Children’s Miracle Network Hospitals&reg;, leverages the passion of
              the gaming community to rally support for our 170 member hospitals. Participants fundraise year-round and
              pledge to game for 24 hours with one goal: to save and improve the lives of sick and injured kids.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing="4" mt="8">
              <Button onClick={() => router.push('#team')} size="lg" minW="210px" height="14" px="8">
                Donate
              </Button>
            </Stack>
            <Text mt="8" color="gray.100">
              Want to help us raise money? <Link href={team.links.page}>Join the team!</Link>
            </Text>
          </Box>
          <Flex
            gridRow={{ base: 1, sm: undefined }}
            gridColumn={{ md: 2 }}
            placeItems="center"
            p={{ base: 5, md: 10, xl: 20 }}
            backgroundImage="/background.png"
            backgroundPosition="center center"
            backgroundSize="cover"
          >
            <Img w="full" objectFit="cover" src="/logo.png" alt="Heroes Play Games Logo" />
          </Flex>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
