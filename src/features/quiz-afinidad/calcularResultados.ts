import type { RespuestaUsuario, ResultadoMatch } from './types'
import { PLANCHAS } from '@/data/elecciones'

// Perfiles ideológicos de cada candidato (escala 1-5 por categoría)
// En producción, estos datos vendrían del backend basados en sus propuestas reales
const PERFILES_CANDIDATOS = [
  {
    candidatoId: 1,
    perfil: {
      educacion: 5, // Muy progresista en educación
      salud: 5,
      seguridad: 3,
      economia: 4,
      medio_ambiente: 5,
      social: 5,
    },
  },
  {
    candidatoId: 2,
    perfil: {
      educacion: 3,
      salud: 2, // Más enfoque privado
      seguridad: 5, // Mano dura
      economia: 2, // Mercado libre
      medio_ambiente: 3,
      social: 2,
    },
  },
  {
    candidatoId: 3,
    perfil: {
      educacion: 4,
      salud: 4,
      seguridad: 2, // Justicia restaurativa
      economia: 5, // Economía circular
      medio_ambiente: 5,
      social: 5,
    },
  },
  {
    candidatoId: 4,
    perfil: {
      educacion: 5,
      salud: 5,
      seguridad: 4,
      economia: 5, // Economía popular
      medio_ambiente: 3,
      social: 5,
    },
  },
  {
    candidatoId: 5,
    perfil: {
      educacion: 4,
      salud: 4,
      seguridad: 4,
      economia: 3,
      medio_ambiente: 4,
      social: 4,
    },
  },
  {
    candidatoId: 6,
    perfil: {
      educacion: 3,
      salud: 3,
      seguridad: 4,
      economia: 2,
      medio_ambiente: 4,
      social: 3,
    },
  },
  {
    candidatoId: 7,
    perfil: {
      educacion: 5,
      salud: 5,
      seguridad: 4,
      economia: 4,
      medio_ambiente: 5,
      social: 5,
    },
  },
  {
    candidatoId: 8,
    perfil: {
      educacion: 4,
      salud: 4,
      seguridad: 5,
      economia: 3,
      medio_ambiente: 5,
      social: 4,
    },
  },
]

export function calcularResultados(
  respuestas: RespuestaUsuario[]
): ResultadoMatch[] {
  const resultados: ResultadoMatch[] = []

  // Agrupar respuestas por categoría
  const respuestasPorCategoria = respuestas.reduce(
    (acc, respuesta) => {
      if (!acc[respuesta.categoria]) {
        acc[respuesta.categoria] = []
      }
      acc[respuesta.categoria].push(respuesta.valor)
      return acc
    },
    {} as Record<string, number[]>
  )

  // Calcular promedio del usuario por categoría
  const promedioUsuario: Record<string, number> = {}
  for (const [categoria, valores] of Object.entries(respuestasPorCategoria)) {
    promedioUsuario[categoria] =
      valores.reduce((sum, val) => sum + val, 0) / valores.length
  }

  // Calcular afinidad con cada candidato
  for (const perfilCandidato of PERFILES_CANDIDATOS) {
    const coincidencias: { categoria: string; afinidad: number }[] = []
    let sumaAfinidades = 0

    for (const [categoria, valorUsuario] of Object.entries(promedioUsuario)) {
      const valorCandidato =
        perfilCandidato.perfil[categoria as keyof typeof perfilCandidato.perfil]

      // Calcular diferencia absoluta (0-4, donde 0 es coincidencia perfecta)
      const diferencia = Math.abs(valorUsuario - valorCandidato)

      // Convertir a porcentaje de afinidad (100% = coincidencia perfecta)
      const afinidadCategoria = ((4 - diferencia) / 4) * 100

      coincidencias.push({
        categoria,
        afinidad: afinidadCategoria,
      })

      sumaAfinidades += afinidadCategoria
    }

    const porcentajeAfinidad =
      sumaAfinidades / Object.keys(promedioUsuario).length

    // Buscar info del candidato en PLANCHAS
    const plancha = PLANCHAS.find((p) => p.id === perfilCandidato.candidatoId)

    if (plancha) {
      resultados.push({
        candidatoId: perfilCandidato.candidatoId,
        nombreCandidato: plancha.presidente.nombre,
        partido: plancha.partido.nombre,
        porcentajeAfinidad,
        coincidencias: coincidencias.sort((a, b) => b.afinidad - a.afinidad),
        avatar: plancha.presidente.nombre
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        tipo: 'presidente',
      })
    }
  }

  // Ordenar por mayor afinidad
  return resultados.sort((a, b) => b.porcentajeAfinidad - a.porcentajeAfinidad)
}
