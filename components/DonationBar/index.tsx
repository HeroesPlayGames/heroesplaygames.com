import { Stage, Layer, Image, Text } from 'react-konva'
import useImage from 'use-image'

const MAX_BAR_WIDTH = 380

const Foreground = () => {
  const [image] = useImage('/donation-bar-frame.png')
  return <Image alt="foreground" image={image} width={400} height={80} />
}

const Background = ({ width }: { width: number }) => {
  const [image] = useImage('/donation-bar-background.png')

  return (
    <Image
      alt="background"
      image={image}
      width={width}
      height={60}
      x={10}
      y={10}
      crop={{ width, height: 60, x: 0, y: 0 }}
    />
  )
}

interface Props {
  currentDonations: number
  goal: number
}

const SecondProgressBar = ({ currentDonations, goal }: Props) => {
  const progressPercent = currentDonations / goal
  const barWidth = progressPercent <= 1 ? Math.floor(progressPercent * MAX_BAR_WIDTH) : 1 * MAX_BAR_WIDTH
  console.log(currentDonations, goal)
  console.log(progressPercent, barWidth)

  return (
    <Stage width={500} height={100}>
      <Layer>
        <Background width={barWidth} />
        <Foreground />
        <Text
          text={`${Math.ceil(progressPercent * 100)}%`}
          fontSize={30}
          // fontStyle="bold"
          stroke="1px"
          letterSpacing={2}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, '#FF6D00', 1.0, '#000']}
          x={190}
          y={30}
          fontFamily={'BadaBoom BB'}
        />
      </Layer>
    </Stage>
  )
}

export default SecondProgressBar
