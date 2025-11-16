// Partidos políticos con sus colores oficiales o representativos

import type { PartidoPolitico } from '@/types/candidatos'

export const PARTIDOS_POLITICOS: PartidoPolitico[] = [
  {
    nombre: 'Alianza para el Progreso',
    nombreCorto: 'APP',
    color: '#0066CC', // Azul
  },
  {
    nombre: 'Renovación Popular',
    nombreCorto: 'RP',
    color: '#00A651', // Verde
  },
  {
    nombre: 'Fuerza Popular',
    nombreCorto: 'FP',
    color: '#FF6600', // Naranja
  },
  {
    nombre: 'Perú Libre',
    nombreCorto: 'PL',
    color: '#DC143C', // Rojo
  },
  {
    nombre: 'Avanza País',
    nombreCorto: 'AP',
    color: '#9B59B6', // Morado
  },
  {
    nombre: 'Acción Popular',
    nombreCorto: 'AP',
    color: '#E74C3C', // Rojo claro
  },
]

export function getPartidoColor(nombrePartido: string): string {
  const partido = PARTIDOS_POLITICOS.find(
    (p) => p.nombre === nombrePartido || p.nombreCorto === nombrePartido
  )
  return partido?.color ?? '#6B7280' // Gray por defecto
}

export function getPartidoNombreCorto(nombrePartido: string): string {
  const partido = PARTIDOS_POLITICOS.find((p) => p.nombre === nombrePartido)
  return partido?.nombreCorto ?? nombrePartido
}
