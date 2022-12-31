/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.donordrive.com',
        pathname: '/extralife/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/marcelo',
        destination: 'https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=479600',
        permanent: false,
      },
      {
        source: '/mark',
        destination: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=478138',
        permanent: false,
      },
    ]
  },
}
