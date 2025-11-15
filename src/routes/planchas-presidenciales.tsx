import { PlanchasPage } from '@/pages/planchasPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/planchas-presidenciales')({
  component: PlanchasPage,
})
