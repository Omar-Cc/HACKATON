// src/routes/elector.local.tsx

import { createFileRoute } from '@tanstack/react-router'
// Importamos el componente que crearemos a continuación
import PaginaLocalVotacion from '../pages/Soy_Elector/Local_Votacion'

// Definimos la ruta y le asignamos el componente
export const Route = createFileRoute('/elector/local')({
  component: PaginaLocalVotacion,
})
