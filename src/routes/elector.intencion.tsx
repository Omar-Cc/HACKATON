// src/routes/elector.intencion.tsx

import { createFileRoute } from '@tanstack/react-router'
// Importamos el componente que crearemos a continuación
import PaginaIntencionVoto from '../pages/Soy_Elector/Intencion_Voto'

// Definimos la ruta
export const Route = createFileRoute('/elector/intencion')({
  component: PaginaIntencionVoto,
})
