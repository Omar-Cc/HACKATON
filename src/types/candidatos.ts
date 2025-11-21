// Tipos para candidatos y sistema electoral

export type TipoCandidato =
  | 'diputado'
  | 'senador'
  | 'parlamento-andino'
  | 'presidente'
export type TipoSenador = 'nacional' | 'regional'

export interface Candidato {
  id: string
  nombre: string
  profesion: string
  edad: number
  numero: string
  partido: PartidoPolitico
  region?: string // Solo para diputados y senadores regionales
  tipo: TipoCandidato
  tipoSenador?: TipoSenador // Solo para senadores
  experiencia: string[]
  avatar: string
  propuestas?: string[]
  sentenciasJudiciales?: boolean
  hojaVidaUrl?: string
  // Campos adicionales para perfil detallado
  fotoPrincipal?: string
  propuestaCentral?: string // Solo para presidente
  formacion?: FormacionItem[]
  historialPolitico?: HistorialPoliticoItem[]
  enlacesVerificacion?: EnlaceVerificacion[]
  planAnalisis?: PlanAnalisis // Solo para presidente
  noticiasRelacionadas?: NoticiaRelacionada[]
}

export interface FormacionItem {
  titulo: string
  institucion?: string
  anio?: string
  tipo: 'educacion' | 'cargo' | 'logro' | 'proyecto'
}

export interface HistorialPoliticoItem {
  anio: string
  descripcion: string
  partido?: string
}

export interface EnlaceVerificacion {
  titulo: string
  url: string
  fuente: string
  tipo: 'oficial' | 'periodistico' | 'documento'
}

export interface PlanAnalisis {
  categorias: CategoriaAnalisis[]
  fuenteUrl?: string
}

export interface CategoriaAnalisis {
  nombre: string
  menciones: number
  maxMenciones?: number
}

export interface NoticiaRelacionada {
  titulo: string
  resumen: string
  url: string
  imagenUrl?: string
  fecha: string
  fuente: string
}

export interface PartidoPolitico {
  nombre: string
  nombreCorto: string
  color: string // Color hex principal
  logo?: string
}

export interface FiltrosCandidatos {
  busqueda: string
  partido: string
  region: string
}

export interface ComparacionState {
  candidatosSeleccionados: string[] // IDs de candidatos
  maxSeleccion: number
}
