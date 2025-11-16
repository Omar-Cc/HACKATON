// src/data/menuElector.ts

import {
  MapPin,
  FileText,
  Laptop,
  BarChart2,
  Shield,
  Users,
  Gavel,
  Sparkles,
  Search,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type OpcionMenu = {
  icono: LucideIcon
  texto: string
  path: string
}

export const opcionesMenuElector: OpcionMenu[] = [
  { icono: MapPin, texto: 'Local de votación', path: '/elector/local' },
  { icono: FileText, texto: 'Cómo votar', path: '/elector/como-votar' },
  { icono: Laptop, texto: 'Simulador de votación', path: '/elector/simulador' },
  { icono: Search, texto: 'Verificador de Info', path: '/elector/verificar' },

  //Investiga
  { icono: Users, texto: 'Candidatos y Partidos', path: '/elector/candidatos' },
  { icono: Sparkles, texto: 'Match Electoral', path: '/elector/match' },
  { icono: BarChart2, texto: 'Intención de voto', path: '/elector/intencion' },

  //Contexto y Legalidad
  { icono: Gavel, texto: 'Marco Legal', path: '/elector/legal' },
  { icono: Shield, texto: 'Seguridad', path: '/elector/seguridad' },
]
