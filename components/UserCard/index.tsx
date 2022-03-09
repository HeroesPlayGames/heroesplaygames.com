import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import type { TeamParticipant } from 'extra-life-ts'
import { getParticipantBadges } from 'extra-life-ts'
import { useQuery } from 'react-query'

export const UserCard = ({ displayName, avatarImageURL, links, isTeamCaptain, participantID }: TeamParticipant) => {
  const avatarUrl = avatarImageURL.replace(/https:https:/i, 'https:')
  const { data } = useQuery(
    ['PlayerBadges', { participantID }],
    () => getParticipantBadges(participantID, { orderBy: 'unlockedDateUTC ASC' }),
    {
      select: ({ data }) => data,
    },
  )

  return (
    <Center py={6}>
      <VStack
        w={'full'}
        h="full"
        bg={useColorModeValue('#050E52', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        justifyContent="space-between"
      >
        <Box h={'full'}>
          <Avatar size={'xl'} src={avatarUrl} name={displayName} pos={'relative'} />
          <Heading fontSize={'2xl'} fontFamily={'body'} color="gray.100">
            {displayName}
          </Heading>
          {isTeamCaptain && (
            <Text fontWeight={'bold'} fontSize={'xl'} color={'gray.100'} textStyle={'gradient'}>
              Captain
            </Text>
          )}
        </Box>
        {!!data?.length && (
          <HStack justifyContent={'center'} spacing={4} w={'full'} flexWrap={'wrap'}>
            {data?.map(({ badgeImageURL, description, badgeCode }) => (
              <Tooltip key={badgeCode} label={description} placement={'top'}>
                <Image src={badgeImageURL} alt={description} boxSize={10} />
              </Tooltip>
            ))}
          </HStack>
        )}
        <Stack mt={8} direction={'row'} spacing={4} width={{ base: '75%', xl: '50%' }} p={3}>
          <Button flex={1} fontSize={'sm'} onClick={() => (window.location.href = links.donate)}>
            Donate
          </Button>
        </Stack>
      </VStack>
    </Center>
  )
}
