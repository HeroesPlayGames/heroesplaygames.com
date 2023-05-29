import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '@utils/queryClient'
import '../styles/global.css'
import { Inter } from 'next/font/google'
import PlausibleProvider from 'next-plausible'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="heroesplaygames.com">
      <QueryClientProvider client={queryClient}>
        <main className={`${inter.variable} font-sans 2xl:container`}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PlausibleProvider>
  )
}
