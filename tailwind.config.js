const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      gradientColorStops: {
        brand:
          'hsl(327deg 62% 56%) 0%, hsl(276deg 57% 57%) 8%, hsl(225deg 52% 57%) 17%, hsl(174deg 47% 57%) 25%, hsl(120deg 57% 56%) 33%, hsl(66deg 68% 55%) 42%, hsl(12deg 78% 54%) 50%, hsl(37deg 68% 53%) 58%, hsl(62deg 58% 52%) 67%, hsl(87deg 49% 51%) 75%, hsl(134deg 54% 51%) 83%, hsl(181deg 58% 50%) 92%, hsl(229deg 64% 50%) 100%',
      },
    },
  },
  daisyui: {
    themes: [
      {
        heroesplaygames: {
          primary: '#050E52',
          secondary: '#D926A9',
          accent: '#1FB2A6',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
