// src/routes/elector.simulador.tsx

import { createFileRoute } from '@tanstack/react-router'

// 1. Asegúrate de importar el componente GRANDE que hicimos
import PaginaSimuladorVotacion from '../pages/Soy_Elector/Simulador_Votacion'

// 2. Asegúrate de usarlo en la propiedad 'component'
export const Route = createFileRoute('/elector/simulador')({
  component: PaginaSimuladorVotacion,
})
