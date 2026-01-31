import '@fontsource/nunito-sans/900.css'

interface Props {
  text: string
}

export const FitText = ({ text }: Props) => {
  return (
    <div style={{ paddingLeft: 10 }}>
      <svg
        viewBox={`0 0 ${text.length * 16.5} 30`}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="600px"
        height="150px"
        overflow="visible"
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="hsl(272deg 100% 35%)" />
            <stop offset="5%" stopColor="hsl(271deg 85% 39%)" />
            <stop offset="9%" stopColor="hsl(271deg 76% 43%)" />
            <stop offset="14%" stopColor="hsl(270deg 69% 46%)" />
            <stop offset="18%" stopColor="hsl(271deg 64% 49%)" />
            <stop offset="23%" stopColor="hsl(271deg 65% 52%)" />
            <stop offset="27%" stopColor="hsl(271deg 69% 55%)" />
            <stop offset="32%" stopColor="hsl(271deg 73% 58%)" />
            <stop offset="36%" stopColor="hsl(271deg 78% 61%)" />
            <stop offset="41%" stopColor="hsl(271deg 84% 63%)" />
            <stop offset="45%" stopColor="hsl(272deg 92% 66%)" />
            <stop offset="50%" stopColor="hsl(272deg 100% 69%)" />
            <stop offset="55%" stopColor="hsl(270deg 100% 68%)" />
            <stop offset="59%" stopColor="hsl(267deg 100% 67%)" />
            <stop offset="64%" stopColor="hsl(265deg 99% 66%)" />
            <stop offset="68%" stopColor="hsl(263deg 99% 65%)" />
            <stop offset="73%" stopColor="hsl(260deg 99% 65%)" />
            <stop offset="77%" stopColor="hsl(257deg 99% 64%)" />
            <stop offset="82%" stopColor="hsl(254deg 99% 63%)" />
            <stop offset="86%" stopColor="hsl(250deg 100% 62%)" />
            <stop offset="91%" stopColor="hsl(245deg 100% 62%)" />
            <stop offset="95%" stopColor="hsl(239deg 100% 61%)" />
            <stop offset="100%" stopColor="hsl(227deg 100% 50%)" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          opacity={0.9}
          fontFamily="Nunito Sans"
          fontStyle="sans-serif"
          fontWeight="900"
          fontSize={20}
          textAnchor="middle"
          fill="url(#gradient)"
          letterSpacing="2px"
          dominantBaseline="middle"
        >
          {text.toUpperCase()}
        </text>
      </svg>
    </div>
  )
}
