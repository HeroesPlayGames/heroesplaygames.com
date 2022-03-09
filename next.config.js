module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
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
      //       {
      //         source: '/chris',
      //         destination: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=459887',
      //         permanent: false,
      //       },
      //       {
      //         source: '/derik',
      //         destination: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=457275',
      //         permanent: false,
      //       },
      //       {
      //         source: '/paul',
      //         destination: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=467879',
      //         permanent: false,
      //       },
    ]
  },
}
