// src/routes/elector.seguridad.tsx

import { createFileRoute } from '@tanstack/react-router'
// Importamos el componente que crearemos a continuación
import PaginaSeguridad from '../pages/Soy_Elector/Seguridad'

// Definimos la ruta
export const Route = createFileRoute('/elector/seguridad')({
  component: PaginaSeguridad,
})
