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

export const DIPUTADOS: Candidato[] = [
  {
    id: '3',
    numero: '3',
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
    numero: '12',
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
    numero: '27',
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

export const SENADORES: Candidato[] = [
  {
    id: 'S1',
    numero: '1',
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
    numero: '5',
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
    numero: '12',
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

export const PARLAMENTO_ANDINO: Candidato[] = [
  {
    id: 'PA-FP',
    numero: '1',
    nombre: 'Luis Galarreta',
    profesion: 'Abogado y Político',
    edad: 54,
    partido: {
      nombre: 'Fuerza Popular',
      nombreCorto: 'FP',
      color: '#f05023',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Logo_de_fuerza_popular_2024_png.png',
    },
    tipo: 'parlamento-andino',
    experiencia: [
      'Parlamentario Andino (2021-Actual)',
      'Ex-Presidente del Congreso (2017-2018)',
      'Congresista (2006-2020)',
    ],
    avatar: 'LG',
    fotoPrincipal:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Congress_of_the_Republic_of_Peru_-_39489264575.jpg',
  },
  {
    id: 'PA-RP',
    numero: '2',
    nombre: 'Jorge Zeballos',
    profesion: 'Abogado',
    edad: 65,
    partido: {
      nombre: 'Renovación Popular',
      nombreCorto: 'RP',
      color: '#00a3e0',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Logo_Renovaci%C3%B3n_Popular_2023.png',
    },
    tipo: 'parlamento-andino',
    experiencia: [
      'Parlamentario Andino (2021-Actual)',
      'Ex-Congresista (2006-2011)',
      'Docente Universitario',
    ],
    avatar: 'JZ',
    fotoPrincipal:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbI1fVRBRBK1mOicrcDtDrSzggwOYOzqJNUas9_q1PRx4JHxiHiQiybPq0J92fhE3nDatWIzf2o-v2sc8cKE3-3fTCABUfwJx1W3vFLg&s=10',
  },
  {
    id: 'PA-RP2',
    numero: '3',
    nombre: 'Gustavo Pacheco',
    profesion: 'Abogado y Político',
    edad: 68,
    partido: {
      nombre: 'Renovación Popular',
      nombreCorto: 'RP',
      color: '#00a3e0',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Logo_Renovaci%C3%B3n_Popular_2023.png',
    },
    tipo: 'parlamento-andino',
    // (Nota: Fue electo con RP pero ahora está en APP,
    // lo cual es un dato real perfecto para tu "Historial Político")
    experiencia: [
      'Parlamentario Andino (2021-Actual)',
      'Ex-Congresista (2001-2006)',
      'Ex-Ministro de Energía y Minas',
    ],
    avatar: 'GP',
    fotoPrincipal: 'https://fpp.org.pe/wp-content/uploads/2024/07/gp_ecpv.jpg',
  },
  {
    id: 'PA-AP',
    numero: '4',
    nombre: 'Leslye Lazo',
    profesion: 'Abogada',
    edad: 42,
    partido: {
      nombre: 'Acción Popular',
      nombreCorto: 'AP',
      color: '#c00000',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Acci%C3%B3n_Popular.svg',
    },
    tipo: 'parlamento-andino',
    experiencia: [
      'Parlamentaria Andina (2022-Actual)',
      'Ex-Congresista (2020-2021)',
      'Abogada en Sector Privado',
    ],
    avatar: 'LL',
    fotoPrincipal:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4NbikEQGA3NScB1KszkRqJt_GmODm7849lg&s',
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
