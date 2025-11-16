import PerfilCandidatoPage from '@/pages/PerfilCandidatoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidato/$id')({
  component: PerfilCandidatoPage,
})
