import { createFileRoute } from '@tanstack/react-router'
import MatchElectoralPage from '@/pages/Soy_Elector/MatchElectoralPage'

export const Route = createFileRoute('/elector/match')({
  component: MatchElectoralPage,
})
