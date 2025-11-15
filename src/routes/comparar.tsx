import { createFileRoute } from '@tanstack/react-router'
import { ComparacionPage } from '@/pages/comparacionPage'

export const Route = createFileRoute('/comparar')({
  component: function CompararRoute() {
    return <ComparacionPage />
  },
})
