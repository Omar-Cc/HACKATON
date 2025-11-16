import { createFileRoute } from '@tanstack/react-router'
import VerificadorPage from '@/pages/Soy_Elector/VerificadorPage'

export const Route = createFileRoute('/elector/verificar')({
  component: VerificadorPage,
})
