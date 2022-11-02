import { FitText } from '@components/FitText'
import { useSceneStyle } from '@hooks'
import type { GetServerSideProps } from 'next'

interface Props {
  text: string
}

export default function Text({ text }: Props) {
  useSceneStyle()
  return <FitText text={text} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  }
}
