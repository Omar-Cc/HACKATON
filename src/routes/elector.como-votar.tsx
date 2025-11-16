// src/routes/elector.como-votar.tsx

import { createFileRoute } from '@tanstack/react-router'
// Importamos el componente que crearemos a continuación
import PaginaComoVotar from '../pages/Soy_Elector/Como_Votar'

// Definimos la ruta
export const Route = createFileRoute('/elector/como-votar')({
  component: PaginaComoVotar,
})
