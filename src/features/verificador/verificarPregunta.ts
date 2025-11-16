import { PREGUNTAS_VERIFICADAS } from './database'
import type { ResultadoVerificacion } from './types'

// Función para normalizar texto (remover acentos, convertir a minúsculas)
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Función para calcular similitud entre dos strings (algoritmo simple)
function calcularSimilitud(str1: string, str2: string): number {
  const palabras1 = normalizarTexto(str1).split(/\s+/)
  const palabras2 = normalizarTexto(str2).split(/\s+/)

  const palabrasComunes = palabras1.filter((palabra) =>
    palabras2.some((p2) => p2.includes(palabra) || palabra.includes(p2))
  )

  const similitud =
    palabrasComunes.length / Math.max(palabras1.length, palabras2.length)
  return Math.round(similitud * 100)
}

export function verificarPregunta(
  preguntaUsuario: string
): ResultadoVerificacion | null {
  let mejorCoincidencia = null
  let mejorPuntuacion = 0

  // Buscar la pregunta más similar en la base de datos
  for (const preguntaVerificada of PREGUNTAS_VERIFICADAS) {
    const similitud = calcularSimilitud(
      preguntaUsuario,
      preguntaVerificada.pregunta
    )

    if (similitud > mejorPuntuacion) {
      mejorPuntuacion = similitud
      mejorCoincidencia = preguntaVerificada
    }
  }

  // Si la similitud es muy baja, no hay respuesta confiable
  if (mejorPuntuacion < 40 || !mejorCoincidencia) {
    return null
  }

  // Encontrar preguntas relacionadas
  const preguntasRelacionadas = PREGUNTAS_VERIFICADAS.filter(
    (p) =>
      p.categoria === mejorCoincidencia!.categoria &&
      p.id !== mejorCoincidencia!.id
  )
    .slice(0, 3)
    .map((p) => p.pregunta)

  return {
    preguntaOriginal: preguntaUsuario,
    respuesta: mejorCoincidencia.respuesta,
    veredicto: mejorCoincidencia.veredicto,
    confianza: mejorPuntuacion,
    fuentes: mejorCoincidencia.fuentes,
    preguntasRelacionadas,
    contextoAdicional: mejorCoincidencia.contexto,
  }
}

export function buscarPorCategoria(categoria: string) {
  return PREGUNTAS_VERIFICADAS.filter((p) => p.categoria === categoria)
}

export function obtenerPreguntasPopulares() {
  return PREGUNTAS_VERIFICADAS.slice(0, 6)
}
