// Types para el Verificador de Información

export interface PreguntaVerificacion {
  id: string
  pregunta: string
  respuesta: string
  veredicto: 'verdadero' | 'falso' | 'parcialmente-verdadero' | 'no-verificable'
  categoria:
    | 'economia'
    | 'salud'
    | 'seguridad'
    | 'educacion'
    | 'social'
    | 'politica'
  fuentes: FuenteVerificacion[]
  fechaVerificacion: string
  contexto?: string
}

export interface FuenteVerificacion {
  titulo: string
  url: string
  tipo: 'oficial' | 'periodistico' | 'academico' | 'gobierno'
  fecha?: string
}

export interface ConsultaUsuario {
  pregunta: string
  categoria?: string
  timestamp: string
}

export interface ResultadoVerificacion {
  preguntaOriginal: string
  respuesta: string
  veredicto: 'verdadero' | 'falso' | 'parcialmente-verdadero' | 'no-verificable'
  confianza: number // 0-100
  fuentes: FuenteVerificacion[]
  preguntasRelacionadas: string[]
  contextoAdicional?: string
}
