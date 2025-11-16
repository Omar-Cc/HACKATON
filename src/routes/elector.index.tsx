// src/routes/elector/index.tsx

import { createFileRoute } from '@tanstack/react-router'
import ElectorPrincipal from '../pages/Soy_Elector/Elector_principal'

export const Route = createFileRoute('/elector/')({
  component: ElectorPrincipal,
})
