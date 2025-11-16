import type { Plancha as PlanchaType } from '@/pages/planchasPage'
import type { Candidato } from '@/types/candidatos'

// Planchas (copiado desde planchasPage.tsx)
export const PLANCHAS: PlanchaType[] = [
  {
    id: 1,
    numero: '1',
    presidente: { nombre: 'María González', foto: 'woman president candidate' },
    vicepresidente1: {
      nombre: 'Carlos Rodríguez',
      foto: 'man vice president candidate',
    },
    vicepresidente2: {
      nombre: 'Ana Silva',
      foto: 'woman vice president candidate',
    },
    partido: {
      id: 'ppn',
      nombre: 'Partido Progresista Nacional',
      siglas: 'PPN',
      logo: 'logo_ppn.png',
      color: '#3B82F6',
    },
    zona: ['lima', 'cusco', 'arequipa'],
    propuestas: {
      educacion: [
        'Educación universitaria gratuita',
        'Becas para estudiantes de bajos recursos',
        'Modernización de infraestructura educativa',
      ],
      salud: [
        'Cobertura universal de salud',
        'Hospitales nuevos en zonas rurales',
        'Telemedicina para zonas alejadas',
      ],
      seguridad: [
        'Mayor presencia policial en barrios',
        'Guerra contra la extorsión',
        'Cámaras de seguridad inteligentes',
        'Programas de prevención juvenil',
      ],
      economia: [
        'Reducción del IVA en productos básicos',
        'Apoyo a pequeñas empresas',
        'Creación de 500,000 empleos',
      ],
      medio_ambiente: [
        'Energía solar en edificios públicos',
        'Reforestación de áreas urbanas',
        'Prohibición de plásticos de un solo uso',
      ],
    },
  },
  {
    id: 2,
    numero: '2',
    presidente: {
      nombre: 'Carlos Mendoza',
      foto: 'man president candidate suit',
    },
    vicepresidente1: {
      nombre: 'Ana Silva',
      foto: 'woman vice president candidate',
    },
    vicepresidente2: {
      nombre: 'Jorge Morales',
      foto: 'man vice president candidate professional',
    },
    partido: {
      id: 'fd',
      nombre: 'Frente Democrático',
      siglas: 'FD',
      logo: 'logo_fd.png',
      color: '#10B981',
    },
    zona: ['la_libertad', 'piura', 'lambayeque'],
    propuestas: {
      educacion: [
        'Vouchers educativos para familias',
        'Inglés obligatorio desde primaria',
        'Alianzas con universidades internacionales',
      ],
      salud: [
        'Seguros de salud privados accesibles',
        'Incentivos fiscales para clínicas',
        'Reducción de listas de espera',
      ],
      seguridad: [
        'Mano dura contra el crimen',
        'Aumento del pie de fuerza',
        'Penas más severas para delincuentes',
      ],
      economia: [
        'Reducción de impuestos a empresas',
        'Atracción de inversión extranjera',
        'Zona franca en todas las regiones',
      ],
      medio_ambiente: [
        'Incentivos para vehículos eléctricos',
        'Parques industriales ecológicos',
        'Reciclaje obligatorio empresarial',
      ],
    },
  },
  {
    id: 3,
    numero: '3',
    presidente: {
      nombre: 'Ana Flores',
      foto: 'woman president candidate professional',
    },
    vicepresidente1: {
      nombre: 'Jorge Morales',
      foto: 'man vice president candidate professional',
    },
    vicepresidente2: {
      nombre: 'Luis Hernández',
      foto: 'man president candidate leader',
    },
    partido: {
      id: 'uc',
      nombre: 'Unión por el Cambio',
      siglas: 'UC',
      logo: 'logo_uc.png',
      color: '#8B5CF6',
    },
    zona: ['cusco', 'puno', 'junin'],
    propuestas: {
      educacion: [
        'Educación ambiental obligatoria',
        'Escuelas sostenibles certificadas',
        'Huertos escolares en todas las escuelas',
      ],
      salud: [
        'Medicina preventiva como prioridad',
        'Alimentación saludable en hospitales',
        'Centros de salud mental gratuitos',
      ],
      seguridad: [
        'Policía comunitaria cercana',
        'Justicia restaurativa',
        'Iluminación LED en calles',
      ],
      economia: [
        'Economía circular y reciclaje',
        'Agricultura orgánica subsidiada',
        'Turismo ecológico como motor',
      ],
      medio_ambiente: [
        '100% energías renovables para 2030',
        'Protección de reservas naturales',
        'Transporte público eléctrico',
      ],
    },
  },
  {
    id: 4,
    numero: '4',
    presidente: {
      nombre: 'Luis Hernández',
      foto: 'man president candidate leader',
    },
    vicepresidente1: {
      nombre: 'Carmen López',
      foto: 'woman vice president candidate leader',
    },
    vicepresidente2: {
      nombre: 'Rosa Valdivia',
      foto: 'woman president candidate confident',
    },
    partido: {
      id: 'ap',
      nombre: 'Alianza Popular',
      siglas: 'AP',
      logo: 'logo_ap.png',
      color: '#F59E0B',
    },
    zona: ['cajamarca', 'ancash', 'ayacucho'],
    propuestas: {
      educacion: [
        'Desayuno y almuerzo escolar gratis',
        'Útiles escolares gratuitos',
        'Transporte escolar subsidiado',
      ],
      salud: [
        'Medicamentos genéricos gratuitos',
        'Clínicas populares en cada barrio',
        'Dentista y oftalmología gratuita',
      ],
      seguridad: [
        'Iluminación en barrios populares',
        'Patrullaje a pie constante',
        'Deportes y cultura para jóvenes',
      ],
      economia: [
        'Salario mínimo de S/1,500 mensuales',
        'Vivienda social para familias',
        'Cooperativas de trabajadores',
      ],
      medio_ambiente: [
        'Limpieza de ríos y playas',
        'Contenedores de basura por cuadra',
        'Compostaje comunitario',
      ],
    },
  },
  {
    id: 5,
    numero: '5',
    presidente: {
      nombre: 'Rosa Valdivia',
      foto: 'woman president candidate confident',
    },
    vicepresidente1: {
      nombre: 'Pedro Castillo',
      foto: 'man vice president candidate',
    },
    vicepresidente2: {
      nombre: 'Jorge Salinas',
      foto: 'man president candidate business',
    },
    partido: {
      id: 'fr',
      nombre: 'Fuerza Renovadora',
      siglas: 'FR',
      logo: 'logo_fr.png',
      color: '#EF4444',
    },
    zona: ['lima', 'callao', 'ica'],
    propuestas: {
      educacion: [
        'Reforma educativa integral',
        'Capacitación docente constante',
        'Infraestructura moderna en colegios',
      ],
      salud: [
        'Aumento del presupuesto en salud',
        'Contratación de más médicos',
        'Equipamiento de hospitales',
      ],
      seguridad: [
        'Plan nacional de seguridad ciudadana',
        'Tecnología para combatir el crimen',
        'Prevención del delito juvenil',
      ],
      economia: [
        'Reactivación económica post-pandemia',
        'Apoyo a la pequeña empresa',
        'Generación de empleo formal',
      ],
      medio_ambiente: [
        'Protección de ecosistemas',
        'Energías limpias',
        'Gestión de residuos sólidos',
      ],
    },
  },
  {
    id: 6,
    numero: '6',
    presidente: {
      nombre: 'Jorge Salinas',
      foto: 'man president candidate business',
    },
    vicepresidente1: {
      nombre: 'María Torres',
      foto: 'woman vice president smart',
    },
    vicepresidente2: {
      nombre: 'Patricia Ugarte',
      foto: 'woman president candidate strong',
    },
    partido: {
      id: 'md',
      nombre: 'Movimiento Democrático',
      siglas: 'MD',
      logo: 'logo_md.png',
      color: '#06B6D4',
    },
    zona: ['arequipa', 'moquegua', 'tacna'],
    propuestas: {
      educacion: [
        'Educación técnica de calidad',
        'Alianzas público-privadas',
        'Becas al extranjero',
      ],
      salud: [
        'Salud digital',
        'Hospitales regionales de nivel III',
        'Programas de prevención',
      ],
      seguridad: [
        'Lucha contra la corrupción',
        'Modernización policial',
        'Inteligencia criminal',
      ],
      economia: [
        'Inversión en infraestructura',
        'Desarrollo de regiones',
        'Comercio exterior',
      ],
      medio_ambiente: [
        'Reforestación nacional',
        'Agua potable para todos',
        'Control de la contaminación',
      ],
    },
  },
  {
    id: 7,
    numero: '7',
    presidente: {
      nombre: 'Patricia Ugarte',
      foto: 'woman president candidate strong',
    },
    vicepresidente1: {
      nombre: 'Ricardo Palma',
      foto: 'man vice president confident',
    },
    vicepresidente2: {
      nombre: 'Fernando Belaunde',
      foto: 'man president candidate experienced',
    },
    partido: {
      id: 'pn',
      nombre: 'Partido Nacionalista',
      siglas: 'PN',
      logo: 'logo_pn.png',
      color: '#DC2626',
    },
    zona: ['puno', 'apurimac', 'cusco'],
    propuestas: {
      educacion: [
        'Educación intercultural bilingüe',
        'Prioridad a zonas rurales',
        'Internet para todos los colegios',
      ],
      salud: [
        'Brigadas médicas itinerantes',
        'Medicina tradicional y moderna',
        'Salud materno-infantil',
      ],
      seguridad: [
        'Seguridad fronteriza',
        'Combate al narcotráfico',
        'Protección de comunidades',
      ],
      economia: [
        'Industrialización nacional',
        'Soberanía alimentaria',
        'Minería responsable',
      ],
      medio_ambiente: [
        'Conservación de la biodiversidad',
        'Protección de glaciares',
        'Agricultura sostenible',
      ],
    },
  },
  {
    id: 8,
    numero: '8',
    presidente: {
      nombre: 'Fernando Belaunde',
      foto: 'man president candidate experienced',
    },
    vicepresidente1: {
      nombre: 'Susana Vilca',
      foto: 'woman vice president experienced',
    },
    vicepresidente2: {
      nombre: 'Ana Flores',
      foto: 'woman president candidate professional',
    },
    partido: {
      id: 'ar',
      nombre: 'Acción Republicana',
      siglas: 'AR',
      logo: 'logo_ar.png',
      color: '#EA580C',
    },
    zona: ['loreto', 'ucayali', 'san_martin'],
    propuestas: {
      educacion: [
        'Educación amazónica especializada',
        'Universidades en la selva',
        'Becas para jóvenes amazónicos',
      ],
      salud: [
        'Hospitales fluviales',
        'Atención en comunidades nativas',
        'Enfermedades tropicales',
      ],
      seguridad: [
        'Presencia del Estado en la selva',
        'Protección de comunidades indígenas',
        'Lucha contra la tala ilegal',
      ],
      economia: [
        'Desarrollo amazónico sostenible',
        'Turismo de naturaleza',
        'Productos de la biodiversidad',
      ],
      medio_ambiente: [
        'Protección de la Amazonía',
        'Reforestación masiva',
        'Conservación de especies',
      ],
    },
  },
]

// Diputados (copiado desde DiputadosTab.tsx)
export const DIPUTADOS: Candidato[] = [
  {
    id: '3',
    nombre: 'Ana Lucía Vargas',
    profesion: 'Médica Cirujana',
    edad: 41,
    partido: {
      nombre: 'Alianza para el Progreso',
      nombreCorto: 'APP',
      color: '#0066CC',
      logo: '/logos/app.png',
    },
    region: 'La Libertad',
    tipo: 'diputado',
    experiencia: [
      'Directora Regional de Salud',
      'Presidenta del Colegio Médico',
    ],
    avatar: 'AV',
  },
  {
    id: '12',
    nombre: 'Roberto Palomino',
    profesion: 'Ingeniero Civil',
    edad: 56,
    partido: {
      nombre: 'Renovación Popular',
      nombreCorto: 'RP',
      color: '#00A651',
      logo: '/logos/rp.png',
    },
    region: 'Lima',
    tipo: 'diputado',
    experiencia: ['Gerente de Obras Públicas', 'Constructor privado'],
    avatar: 'RP',
  },
  {
    id: '27',
    nombre: 'Cecilia Rojas',
    profesion: 'Abogada',
    edad: 38,
    partido: {
      nombre: 'Fuerza Popular',
      nombreCorto: 'FP',
      color: '#FF0000',
      logo: '/logos/fp.png',
    },
    region: 'Arequipa',
    tipo: 'diputado',
    experiencia: [
      'Asesora Legal en Municipalidad',
      'Defensora de Derechos Humanos',
    ],
    avatar: 'CR',
  },
]

// Senadores (copiado desde SenadoresTab.tsx)
export const SENADORES: Candidato[] = [
  {
    id: 'S1',
    nombre: 'María Elena Torres',
    profesion: 'Economista',
    edad: 52,
    partido: {
      nombre: 'Alianza para el Progreso',
      nombreCorto: 'APP',
      color: '#0073e6',
      logo: '/logos/app.png',
    },
    tipo: 'senador',
    tipoSenador: 'nacional',
    experiencia: ['Ex Ministra de Economía', 'Consultora Internacional'],
    avatar: 'MT',
  },
  {
    id: 'S5',
    nombre: 'Carlos Mendoza',
    profesion: 'Abogado',
    edad: 48,
    partido: {
      nombre: 'Renovación Popular',
      nombreCorto: 'RP',
      color: '#00A651',
      logo: '/logos/rp.png',
    },
    region: 'Lima',
    tipo: 'senador',
    tipoSenador: 'regional',
    experiencia: ['Congresista 2016-2021', 'Docente Universitario'],
    avatar: 'CM',
  },
  {
    id: 'S12',
    nombre: 'Patricia Salazar',
    profesion: 'Ingeniera Ambiental',
    edad: 44,
    partido: {
      nombre: 'Fuerza Popular',
      nombreCorto: 'FP',
      color: '#FF0000',
      logo: '/logos/fp.png',
    },
    region: 'Cusco',
    tipo: 'senador',
    tipoSenador: 'regional',
    experiencia: ['Gobernadora Regional', 'Activista Ambiental'],
    avatar: 'PS',
  },
]

// Parlamento Andino (copiado desde ParlamentoAndinoTab.tsx)
export const PARLAMENTO_ANDINO: Candidato[] = [
  {
    id: 'PA1',
    nombre: 'Jorge Luis Ramírez',
    profesion: 'Economista Internacional',
    edad: 50,
    partido: {
      nombre: 'Alianza para el Progreso',
      nombreCorto: 'APP',
      color: '#0073e6',
      logo: '/logos/app.png',
    },
    tipo: 'parlamento-andino',
    experiencia: ['Ex Canciller', 'Negociador Comercial CAN'],
    avatar: 'JR',
  },
  {
    id: 'PA3',
    nombre: 'Sofía Guerrero',
    profesion: 'Abogada Internacionalista',
    edad: 45,
    partido: {
      nombre: 'Renovación Popular',
      nombreCorto: 'RP',
      color: '#ff0000',
      logo: '/logos/rp.png',
    },
    tipo: 'parlamento-andino',
    experiencia: ['Asesora de Relaciones Exteriores', 'Docente Universitaria'],
    avatar: 'SG',
  },
  {
    id: 'PA5',
    nombre: 'Manuel Vega',
    profesion: 'Politólogo',
    edad: 38,
    partido: {
      nombre: 'Fuerza Popular',
      nombreCorto: 'FP',
      color: '#ff6600',
      logo: '/logos/fp.png',
    },
    tipo: 'parlamento-andino',
    experiencia: [
      'Investigador en Integración Regional',
      'Consultor Internacional',
    ],
    avatar: 'MV',
  },
]

export function getCandidatoById(id: string) {
  const all: Candidato[] = [...DIPUTADOS, ...SENADORES, ...PARLAMENTO_ANDINO]
  return all.find((c) => c.id === id) ?? null
}

export function getPlanchaById(id: number) {
  return PLANCHAS.find((p) => p.id === id) ?? null
}

export default {
  PLANCHAS,
  DIPUTADOS,
  SENADORES,
  PARLAMENTO_ANDINO,
  getCandidatoById,
  getPlanchaById,
}

/* 

const planchasMock: Plancha[] = [
  {
    id: 1,
    numero: '1',
    presidente: { nombre: 'María González', foto: 'woman president candidate' },
    vicepresidente: {
      nombre: 'Carlos Rodríguez',
      foto: 'man vice president candidate',
    },
    partido: 'Partido Progreso Nacional',
    partidoId: 'ppn',
    color: '#3B82F6',
    zona: ['lima', 'cusco', 'arequipa'],
    propuestas: {
      educacion: [
        'Educación universitaria gratuita para estudiantes destacados',
        'Becas para estudiantes de bajos recursos en universidades públicas y privadas',
        'Modernización de infraestructura educativa con tecnología de punta',
        'Capacitación continua para docentes en metodologías modernas',
        'Implementación de laboratorios de ciencia en todas las escuelas públicas',
        'Programa de alfabetización digital para zonas rurales',
      ],
      salud: [
        'Cobertura universal de salud con atención gratuita en hospitales públicos',
        'Hospitales nuevos en zonas rurales de Cusco, Ayacucho y Huancavelica',
        'Telemedicina para zonas alejadas con conectividad satelital',
        'Contratación de 5,000 médicos especialistas para hospitales regionales',
        'Programa de prevención de enfermedades crónicas en todo el país',
        'Medicamentos oncológicos gratuitos para pacientes de escasos recursos',
      ],
      seguridad: [
        'Mayor presencia policial en barrios con alta incidencia delictiva',
        'Cámaras de seguridad inteligentes con reconocimiento facial en Lima y principales ciudades',
        'Programas de prevención juvenil en colegios de zonas vulnerables',
        'Creación de 50 comisarías nuevas en distritos de alto riesgo',
        'Modernización del equipamiento policial con patrulleros y motos',
        'Sistema de denuncia digital anónima con respuesta inmediata',
      ],
      economia: [
        'Reducción del IVA en productos básicos de la canasta familiar',
        'Apoyo a pequeñas empresas con créditos blandos del Banco de la Nación',
        'Creación de 500,000 empleos formales en sectores productivos',
        'Incentivos tributarios para empresas que contraten jóvenes profesionales',
        'Fomento del turismo interno con promoción de destinos regionales',
        'Construcción de infraestructura vial para conectar zonas productivas',
      ],
      medio_ambiente: [
        'Energía solar en edificios públicos con meta de 100% para 2030',
        'Reforestación de áreas urbanas con 1 millón de árboles por año',
        'Prohibición de plásticos de un solo uso en todo el territorio nacional',
        'Protección de parques nacionales y reservas naturales',
        'Programa de reciclaje obligatorio en todos los municipios',
        'Incentivos para vehículos eléctricos e híbridos',
      ],
    },
  },
  {
    id: 2,
    numero: '2',
    presidente: {
      nombre: 'Carlos Mendoza',
      foto: 'man president candidate suit',
    },
    vicepresidente: {
      nombre: 'Ana Silva',
      foto: 'woman vice president candidate',
    },
    partido: 'Frente Democrático',
    partidoId: 'fd',
    color: '#10B981',
    zona: ['la_libertad', 'piura', 'lambayeque'],
    propuestas: {
      educacion: [
        'Vouchers educativos para familias de hasta S/2,000 mensuales',
        'Inglés obligatorio desde primaria con profesores nativos',
        'Alianzas con universidades internacionales para intercambios estudiantiles',
        'Evaluación constante de calidad educativa en todos los colegios',
        'Meritocracia en la contratación de docentes con mejores salarios',
        'Educación técnica de alto nivel con certificación internacional',
      ],
      salud: [
        'Seguros de salud privados accesibles con subsidio estatal del 50%',
        'Incentivos fiscales para clínicas privadas que atiendan pacientes de bajos recursos',
        'Reducción de listas de espera con alianzas público-privadas',
        'Hospitales de alta complejidad en Trujillo, Chiclayo y Piura',
        'Programa de salud preventiva con chequeos médicos anuales gratuitos',
        'Importación de medicamentos genéricos de calidad a precios reducidos',
      ],
      seguridad: [
        'Mano dura contra el crimen con penas más severas para delincuentes reincidentes',
        'Aumento del pie de fuerza policial con 20,000 nuevos efectivos',
        'Penas más severas para crímenes violentos y tráfico de drogas',
        'Construcción de centros penitenciarios de máxima seguridad',
        'Uso de tecnología de vigilancia en fronteras y puertos',
        'Coordinación con INTERPOL para combatir crimen organizado',
      ],
      economia: [
        'Reducción de impuestos a empresas del 29.5% al 25%',
        'Atracción de inversión extranjera con facilidades tributarias',
        'Zona franca en todas las regiones para exportaciones',
        'Simplificación de trámites para apertura de negocios en 24 horas',
        'Promoción de startups tecnológicas con capital semilla estatal',
        'Acuerdos de libre comercio con nuevos mercados asiáticos',
      ],
      medio_ambiente: [
        'Incentivos para vehículos eléctricos con exoneración de impuestos',
        'Parques industriales ecológicos con energía renovable',
        'Reciclaje obligatorio empresarial con sanciones por incumplimiento',
        'Protección de bosques amazónicos con patrullaje militar',
        'Programa de reforestación con participación del sector privado',
        'Certificación ambiental para empresas responsables',
      ],
    },
  },
  {
    id: 3,
    numero: '3',
    presidente: {
      nombre: 'Ana Flores',
      foto: 'woman president candidate professional',
    },
    vicepresidente: {
      nombre: 'Jorge Morales',
      foto: 'man vice president candidate professional',
    },
    partido: 'Unión por el Cambio',
    partidoId: 'uc',
    color: '#8B5CF6',
    zona: ['cusco', 'puno', 'junin'],
    propuestas: {
      educacion: [
        'Educación ambiental obligatoria desde inicial hasta secundaria',
        'Escuelas sostenibles certificadas con energía solar y reciclaje',
        'Huertos escolares en todas las escuelas para enseñar agricultura sostenible',
        'Cursos de emprendimiento verde para estudiantes de secundaria',
        'Becas para carreras relacionadas con medio ambiente y sostenibilidad',
        'Programa de intercambio estudiantil en temas ambientales',
      ],
      salud: [
        'Medicina preventiva como prioridad con campañas de vacunación masiva',
        'Alimentación saludable en hospitales con productos orgánicos locales',
        'Centros de salud mental gratuitos en todas las regiones',
        'Promoción de medicina natural y tradicional andina',
        'Programa de salud comunitaria con participación de promotores locales',
        'Atención especializada en salud infantil y materna en zonas rurales',
      ],
      seguridad: [
        'Policía comunitaria cercana con presencia en barrios y comunidades',
        'Justicia restaurativa para delitos menores con reinserción social',
        'Iluminación LED en calles de todas las ciudades y pueblos',
        'Programa de empleo juvenil para prevenir la delincuencia',
        'Capacitación policial en derechos humanos y trato ciudadano',
        'Creación de redes vecinales de seguridad con apoyo estatal',
      ],
      economia: [
        'Economía circular y reciclaje como eje de desarrollo económico',
        'Agricultura orgánica subsidiada con certificación internacional',
        'Turismo ecológico como motor de desarrollo en Cusco, Puno y regiones',
        'Microcréditos para emprendimientos verdes y sostenibles',
        'Fomento de artesanía local con ferias y exportaciones',
        'Energías renovables como fuente de empleo en zonas rurales',
      ],
      medio_ambiente: [
        '100% energías renovables para 2030 con inversión en solar y eólica',
        'Protección de reservas naturales con guardaparques y tecnología',
        'Transporte público eléctrico en todas las ciudades principales',
        'Prohibición total de minería ilegal con sanciones severas',
        'Recuperación de ecosistemas degradados en todo el país',
        'Educación ambiental obligatoria para empresas extractivas',
      ],
    },
  },
]
*/
