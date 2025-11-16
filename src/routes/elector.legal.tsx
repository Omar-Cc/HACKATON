// src/routes/elector.legal.tsx

import { createFileRoute } from '@tanstack/react-router'
// Importamos el componente que crearemos a continuación
import PaginaMarcoLegal from '../pages/Soy_Elector/Marco_Legal'

// Definimos la ruta
export const Route = createFileRoute('/elector/legal')({
  component: PaginaMarcoLegal,
})
