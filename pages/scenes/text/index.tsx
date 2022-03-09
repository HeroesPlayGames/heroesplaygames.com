import { FitText } from '@components/FitText'
import type { GetServerSideProps } from 'next'

interface Props {
  text: string
}

export default function Text({ text }: Props) {
  return <FitText text={text} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      ...query,
    },
  }
}
