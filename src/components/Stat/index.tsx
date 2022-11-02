import { Box, Heading, Stack } from '@chakra-ui/react'

interface StatProps {
  label: string
  value: string | number
}

export const Stat = ({ label, value }: StatProps) => {
  return (
    <Stack mx="auto" spacing={3} textAlign="center">
      <Box color="gray.100" fontWeight="medium">
        {label}
      </Box>
      <Heading as="h3" size="xl" fontWeight="bold">
        {value}
      </Heading>
    </Stack>
  )
}
