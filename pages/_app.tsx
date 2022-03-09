import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '@utils/queryClient'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { theme } from '@utils/theme'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Container maxW="container.xl" p={0}>
          <Component {...pageProps} />
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
