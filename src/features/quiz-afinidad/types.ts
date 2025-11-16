// Types para el Match Electoral / Quiz de Afinidad

export interface Pregunta {
  id: string
  texto: string
  categoria:
    | 'educacion'
    | 'salud'
    | 'seguridad'
    | 'economia'
    | 'medio_ambiente'
    | 'social'
  opciones: Opcion[]
}

export interface Opcion {
  id: string
  texto: string
  valor: number // 1-5, donde 5 es muy de acuerdo
}

export interface RespuestaUsuario {
  preguntaId: string
  opcionId: string
  valor: number
  categoria: string
}

export interface ResultadoMatch {
  candidatoId: number
  nombreCandidato: string
  partido: string
  porcentajeAfinidad: number
  coincidencias: {
    categoria: string
    afinidad: number
  }[]
  avatar?: string
  tipo: 'presidente' | 'senador' | 'diputado' | 'parlamento-andino'
}
