import { Box, Stack, StackDivider, useBreakpoint } from '@chakra-ui/react'
import { Stat } from '@components/Stat'
import { currencyFormat } from '@utils/currency'
import type { Team } from 'extra-life-ts'

interface Props {
  team: Team
}

export const StatBar = ({ team }: Props) => {
  const breakpoint = useBreakpoint()

  return (
    <Box as="section" p={6}>
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: 8 }}>
        <Box bg="#050E52" p={10} rounded="xl" shadow="base">
          <Stack spacing={8} justify="space-between" direction="row" divider={<StackDivider />}>
            {!['base', 'sm'].includes(breakpoint ?? 'base') && (
              <Stat label="Total Donations" value={team.numDonations} />
            )}
            <Stat label="Amount Raised" value={currencyFormat(team.sumDonations)} />
            <Stat label="2022 Goal" value={currencyFormat(team.fundraisingGoal)} />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
