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
          <linearGradient id="gradient" x1="20.791%" x2="0%" y1="97.815%" y2="0%">
            <stop offset="0%" stopColor="rgb(255,109,0)" stopOpacity="1" />
            <stop offset="53%" stopColor="rgb(255,182,0)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(255,255,0)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          fontFamily="BadaBoom BB"
          fontSize={34}
          textAnchor="middle"
          strokeWidth="1px"
          stroke="black"
          fill="url(#gradient)"
          letterSpacing="2px"
          dominantBaseline="middle"
        >
          {text}
        </text>
      </svg>
    </div>
  )
}
