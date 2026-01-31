import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { FitText } from '../../components/FitText'

const searchSchema = z.object({
  text: z.string().optional(),
})

export const Route = createFileRoute('/scenes/text')({
  component: TextScene,
  validateSearch: searchSchema,
})

function TextScene() {
  const { text } = Route.useSearch()

  return <FitText text={text ?? ''} />
}
