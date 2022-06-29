import { Box, Grid, Image, Link, Text, VStack } from '@chakra-ui/react'
import { UserCard } from '@components/UserCard'
import { organizeMembers } from '@utils/helpers'
import { TeamParticipant } from 'extra-life-ts'
import { useEffect, useState } from 'react'

export const Team = ({ members }: { members: TeamParticipant[] }) => {
  const [highlightedMember, setHighlightedMember] = useState<TeamParticipant>()
  const sortedMembers = organizeMembers(members)

  // To prevent Next from complaining about html diff server <> client
  useEffect(() => {
    setHighlightedMember(members[Math.floor(Math.random() * members.length)])
  }, [members])

  return (
    <Box id="team" width="100%" backgroundColor="#030933" px="10" pt="10">
      <VStack justifyContent="center" pb={10}>
        <Image src="/the-heroes.png" alt="The Heroes" height="200" pb={5} />
        <Text fontSize="xl" maxW="2xl" mx="auto" align="center">
          Help us reach our goal by donating to someone below. <br />
          If you&apos;re having trouble picking, how about{' '}
          <Link id="highlighted-member-link" href={highlightedMember?.links.donate}>
            {highlightedMember?.displayName.split(' ')[0]}
          </Link>
          ?
        </Text>
      </VStack>
      <Grid
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gridAutoRows="1fr"
        gridAutoFlow="row"
        gridColumnGap="50px"
      >
        {sortedMembers.map((member) => {
          return <UserCard key={member.participantID} {...member} />
        })}
      </Grid>
    </Box>
  )
}
