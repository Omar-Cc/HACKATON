import { createFileRoute } from '@tanstack/react-router'

// 1. Importa el componente de la página de Ajustes
import PaginaAjustes from '../pages/Soy_Elector/Ajustes'

// 2. Define y exporta la ruta
export const Route = createFileRoute('/elector/ajustes')({
  component: PaginaAjustes,
})
