import type { PreguntaVerificacion } from './types'

// Base de datos de preguntas frecuentes verificadas
export const PREGUNTAS_VERIFICADAS: PreguntaVerificacion[] = [
  {
    id: 'vf-001',
    pregunta: '¿Es verdad que la educación universitaria será gratuita?',
    respuesta:
      'Depende del candidato. Algunos candidatos proponen educación universitaria gratuita en instituciones públicas solo para estudiantes destacados o de bajos recursos, mientras que otros proponen gratuidad universal. Es importante revisar el plan de gobierno específico de cada candidato.',
    veredicto: 'parcialmente-verdadero',
    categoria: 'educacion',
    fuentes: [
      {
        titulo: 'Plan de Gobierno - Partido Progresista Nacional',
        url: 'https://jne.gob.pe/plangobierno/ppn',
        tipo: 'oficial',
        fecha: '2026-01-15',
      },
      {
        titulo: 'Comparativo de propuestas educativas - El Comercio',
        url: 'https://elcomercio.pe/educacion-candidatos',
        tipo: 'periodistico',
        fecha: '2026-01-20',
      },
    ],
    fechaVerificacion: '2026-01-25',
    contexto:
      'Las propuestas varían significativamente entre candidatos. Algunos incluyen gratuidad con becas selectivas, otros proponen subsidios parciales.',
  },
  {
    id: 'vf-002',
    pregunta: '¿Los candidatos pueden tener antecedentes penales?',
    respuesta:
      'No, los candidatos NO pueden tener sentencias condenatorias por delitos dolosos. La ley electoral peruana prohíbe postular a personas con sentencias por terrorismo, narcotráfico, corrupción, y otros delitos graves.',
    veredicto: 'falso',
    categoria: 'politica',
    fuentes: [
      {
        titulo: 'Ley Orgánica de Elecciones - Artículo 13',
        url: 'https://jne.gob.pe/ley-organica',
        tipo: 'oficial',
        fecha: '2023-05-10',
      },
      {
        titulo: 'Requisitos para ser candidato - JNE',
        url: 'https://jne.gob.pe/requisitos-candidatos',
        tipo: 'gobierno',
        fecha: '2025-12-01',
      },
    ],
    fechaVerificacion: '2026-01-28',
    contexto:
      'El JNE verifica los antecedentes de todos los candidatos antes de aprobar su inscripción.',
  },
  {
    id: 'vf-003',
    pregunta: '¿Es cierto que se construirán 50 hospitales nuevos?',
    respuesta:
      'Algunos candidatos proponen construir hospitales nuevos en zonas rurales, pero el número exacto varía por candidato. Es importante verificar la viabilidad presupuestaria y el cronograma específico en cada plan de gobierno.',
    veredicto: 'parcialmente-verdadero',
    categoria: 'salud',
    fuentes: [
      {
        titulo: 'Propuestas de salud - Análisis presupuestario',
        url: 'https://elcomercio.pe/analisis-salud',
        tipo: 'periodistico',
        fecha: '2026-01-18',
      },
      {
        titulo: 'Plan Nacional de Infraestructura de Salud',
        url: 'https://minsa.gob.pe/infraestructura',
        tipo: 'gobierno',
        fecha: '2025-11-20',
      },
    ],
    fechaVerificacion: '2026-01-26',
    contexto:
      'La construcción de hospitales requiere presupuesto aprobado por el Congreso y puede tomar varios años.',
  },
  {
    id: 'vf-004',
    pregunta: '¿Los partidos políticos reciben financiamiento del Estado?',
    respuesta:
      'Sí, es VERDADERO. Los partidos políticos en Perú reciben financiamiento público directo para campañas electorales, el cual es proporcional a los votos obtenidos en elecciones anteriores. También existe financiamiento público indirecto (franjas electorales gratuitas).',
    veredicto: 'verdadero',
    categoria: 'politica',
    fuentes: [
      {
        titulo: 'Ley de Partidos Políticos - Artículo 29',
        url: 'https://jne.gob.pe/ley-partidos',
        tipo: 'oficial',
        fecha: '2024-03-15',
      },
      {
        titulo: 'Financiamiento de partidos - ONPE',
        url: 'https://onpe.gob.pe/financiamiento',
        tipo: 'gobierno',
        fecha: '2025-08-10',
      },
    ],
    fechaVerificacion: '2026-01-29',
    contexto:
      'El financiamiento público busca reducir la dependencia de aportes privados y transparentar las campañas.',
  },
  {
    id: 'vf-005',
    pregunta: '¿Se reducirán los impuestos a las empresas?',
    respuesta:
      'Depende del candidato. Algunos candidatos del centro-derecha proponen reducir el impuesto a la renta empresarial del 29.5% al 25%, mientras que candidatos de centro-izquierda prefieren mantener o aumentar impuestos para financiar programas sociales.',
    veredicto: 'parcialmente-verdadero',
    categoria: 'economia',
    fuentes: [
      {
        titulo: 'Propuestas tributarias comparadas',
        url: 'https://elcomercio.pe/economia/impuestos',
        tipo: 'periodistico',
        fecha: '2026-01-22',
      },
      {
        titulo: 'Sistema tributario actual - SUNAT',
        url: 'https://sunat.gob.pe/sistema-tributario',
        tipo: 'gobierno',
        fecha: '2025-12-15',
      },
    ],
    fechaVerificacion: '2026-01-27',
    contexto:
      'Las propuestas tributarias tienen impacto directo en el presupuesto público y los servicios sociales.',
  },
  {
    id: 'vf-006',
    pregunta: '¿El voto es obligatorio en Perú?',
    respuesta:
      'Sí, es VERDADERO. El voto es obligatorio para todos los ciudadanos peruanos entre 18 y 70 años. No votar sin justificación puede resultar en multa económica.',
    veredicto: 'verdadero',
    categoria: 'politica',
    fuentes: [
      {
        titulo: 'Constitución Política del Perú - Artículo 31',
        url: 'https://jne.gob.pe/constitucion',
        tipo: 'oficial',
        fecha: '1993-12-29',
      },
      {
        titulo: 'Información sobre el voto obligatorio - ONPE',
        url: 'https://onpe.gob.pe/voto-obligatorio',
        tipo: 'gobierno',
        fecha: '2025-10-05',
      },
    ],
    fechaVerificacion: '2026-01-30',
    contexto:
      'El voto obligatorio busca garantizar alta participación ciudadana en las elecciones.',
  },
]
