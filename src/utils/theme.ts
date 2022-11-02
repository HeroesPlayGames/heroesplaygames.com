import { extendTheme } from '@chakra-ui/react'

const ridiculousGradient = `linear-gradient(
    130deg,
    hsl(327deg 62% 56%) 0%,
    hsl(276deg 57% 57%) 8%,
    hsl(225deg 52% 57%) 17%,
    hsl(174deg 47% 57%) 25%,
    hsl(120deg 57% 56%) 33%,
    hsl(66deg 68% 55%) 42%,
    hsl(12deg 78% 54%) 50%,
    hsl(37deg 68% 53%) 58%,
    hsl(62deg 58% 52%) 67%,
    hsl(87deg 49% 51%) 75%,
    hsl(134deg 54% 51%) 83%,
    hsl(181deg 58% 50%) 92%,
    hsl(229deg 64% 50%) 100%
  )`

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        color: 'white',
        backgroundColor: '#030933',
      },
    },
  },
  textStyles: {
    gradient: {
      bgGradient: ridiculousGradient,
      bgClip: 'text',
    },
  },
  sizes: {
    container: {
      xl: '1600px',
    },
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          _before: {
            bgImage: 'none',
          },
        },
        _before: {
          content: '""',
          position: 'absolute',
          top: '100%',
          width: '100%',
          left: '0',
          height: '2px',
          borderRadius: '1px',
          bgImage: ridiculousGradient,
        },
        position: 'relative',
        fontWeight: 500,
        borderBottom: ridiculousGradient,
      },
    },
    Heading: {
      baseStyle: {
        paddingY: '10px',
      },
    },
    Button: {
      baseStyle: {},
      variants: {
        solid: {
          bg: '#B2511A',
          color: 'white',
          boxShadow: '0px 1px 25px -5px rgb(44 48 52 / 48%), 0 10px 10px -5px rgb(18 22 26 / 43%)',
          _hover: {
            color: 'white',
            bg: '#E37A3E',
          },
          _active: {
            bg: '#6B3110',
          },
          _focus: {
            color: 'white',
            bg: '#E37A3E',
          },
        },
      },
      defaultProps: {
        rounded: 'full',
      },
    },
  },
})
