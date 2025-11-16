import CongresoPage from '@/pages/congresoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/congreso/')({
  component: CongresoPage,
})
