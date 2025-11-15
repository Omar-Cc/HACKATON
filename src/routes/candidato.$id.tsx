import { CandidatoDetalle } from '@/pages/candidatoDetallePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidato/$id')({
  component: CandidatoDetalle,
})
