import type { Pregunta } from './types'

export const PREGUNTAS: Pregunta[] = [
  // Educación
  {
    id: 'edu-1',
    texto: '¿La educación universitaria debería ser gratuita para todos?',
    categoria: 'educacion',
    opciones: [
      { id: 'edu-1-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'edu-1-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'edu-1-3', texto: 'Neutral', valor: 3 },
      { id: 'edu-1-4', texto: 'De acuerdo', valor: 4 },
      { id: 'edu-1-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },
  {
    id: 'edu-2',
    texto:
      '¿Deberían implementarse más escuelas técnicas en lugar de universidades?',
    categoria: 'educacion',
    opciones: [
      { id: 'edu-2-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'edu-2-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'edu-2-3', texto: 'Neutral', valor: 3 },
      { id: 'edu-2-4', texto: 'De acuerdo', valor: 4 },
      { id: 'edu-2-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },

  // Salud
  {
    id: 'sal-1',
    texto: '¿El sistema de salud debería ser 100% público?',
    categoria: 'salud',
    opciones: [
      { id: 'sal-1-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'sal-1-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'sal-1-3', texto: 'Neutral', valor: 3 },
      { id: 'sal-1-4', texto: 'De acuerdo', valor: 4 },
      { id: 'sal-1-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },
  {
    id: 'sal-2',
    texto: '¿Deberían construirse más hospitales en zonas rurales?',
    categoria: 'salud',
    opciones: [
      { id: 'sal-2-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'sal-2-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'sal-2-3', texto: 'Neutral', valor: 3 },
      { id: 'sal-2-4', texto: 'De acuerdo', valor: 4 },
      { id: 'sal-2-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },

  // Seguridad
  {
    id: 'seg-1',
    texto: '¿Deberían aplicarse penas más severas contra el crimen?',
    categoria: 'seguridad',
    opciones: [
      { id: 'seg-1-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'seg-1-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'seg-1-3', texto: 'Neutral', valor: 3 },
      { id: 'seg-1-4', texto: 'De acuerdo', valor: 4 },
      { id: 'seg-1-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },
  {
    id: 'seg-2',
    texto: '¿Es prioritario invertir en más policías y patrulleros?',
    categoria: 'seguridad',
    opciones: [
      { id: 'seg-2-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'seg-2-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'seg-2-3', texto: 'Neutral', valor: 3 },
      { id: 'seg-2-4', texto: 'De acuerdo', valor: 4 },
      { id: 'seg-2-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },

  // Economía
  {
    id: 'eco-1',
    texto: '¿Deberían reducirse los impuestos a las empresas?',
    categoria: 'economia',
    opciones: [
      { id: 'eco-1-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'eco-1-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'eco-1-3', texto: 'Neutral', valor: 3 },
      { id: 'eco-1-4', texto: 'De acuerdo', valor: 4 },
      { id: 'eco-1-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },
  {
    id: 'eco-2',
    texto: '¿El Estado debería aumentar el salario mínimo significativamente?',
    categoria: 'economia',
    opciones: [
      { id: 'eco-2-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'eco-2-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'eco-2-3', texto: 'Neutral', valor: 3 },
      { id: 'eco-2-4', texto: 'De acuerdo', valor: 4 },
      { id: 'eco-2-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },

  // Medio Ambiente
  {
    id: 'amb-1',
    texto:
      '¿Debería priorizarse la protección ambiental sobre el desarrollo económico?',
    categoria: 'medio_ambiente',
    opciones: [
      { id: 'amb-1-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'amb-1-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'amb-1-3', texto: 'Neutral', valor: 3 },
      { id: 'amb-1-4', texto: 'De acuerdo', valor: 4 },
      { id: 'amb-1-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },
  {
    id: 'amb-2',
    texto: '¿Perú debería comprometerse a 100% energías renovables para 2030?',
    categoria: 'medio_ambiente',
    opciones: [
      { id: 'amb-2-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'amb-2-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'amb-2-3', texto: 'Neutral', valor: 3 },
      { id: 'amb-2-4', texto: 'De acuerdo', valor: 4 },
      { id: 'amb-2-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },

  // Social
  {
    id: 'soc-1',
    texto: '¿El gobierno debería invertir más en programas sociales?',
    categoria: 'social',
    opciones: [
      { id: 'soc-1-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'soc-1-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'soc-1-3', texto: 'Neutral', valor: 3 },
      { id: 'soc-1-4', texto: 'De acuerdo', valor: 4 },
      { id: 'soc-1-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },
  {
    id: 'soc-2',
    texto: '¿Las políticas de igualdad de género deberían ser prioritarias?',
    categoria: 'social',
    opciones: [
      { id: 'soc-2-1', texto: 'Totalmente en desacuerdo', valor: 1 },
      { id: 'soc-2-2', texto: 'En desacuerdo', valor: 2 },
      { id: 'soc-2-3', texto: 'Neutral', valor: 3 },
      { id: 'soc-2-4', texto: 'De acuerdo', valor: 4 },
      { id: 'soc-2-5', texto: 'Totalmente de acuerdo', valor: 5 },
    ],
  },
]
