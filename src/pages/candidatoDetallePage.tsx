import { useEffect, useMemo } from 'react'

import {
  ChevronLeft,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  FileText,
  ExternalLink,
} from 'lucide-react'
import { ImageWithFallback } from '@/components/imageWithFallback'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate, useParams } from '@tanstack/react-router'

interface Candidato {
  nombre: string
  foto: string
  fechaNacimiento: string
  lugarNacimiento: string
  profesion: string
  educacion: {
    grado: string
    institucion: string
    año: string
  }[]
  experienciaLaboral: {
    cargo: string
    institucion: string
    periodo: string
  }[]
  trayectoriaPolitica: {
    cargo: string
    periodo: string
    logros: string[]
  }[]
}

interface CandidatoCongreso {
  nombre: string
  foto: string
  edad: number
  profesion: string
  departamento: string
}

interface Partido {
  id: string
  nombre: string
  siglas: string
  color: string
  fundacion: string
  ideologia: string
  fundador: string
  sede: string
  mision: string
  vision: string
  valores: string[]
}

interface Plancha {
  id: number
  numero: string
  presidente: Candidato
  vicepresidente1: Candidato
  vicepresidente2: Candidato
  senadores: CandidatoCongreso[]
  diputados: CandidatoCongreso[]
  parlamentoAndino: CandidatoCongreso[]
  partido: Partido
  zona: string[]
  propuestas: {
    educacion: string[]
    salud: string[]
    seguridad: string[]
    economia: string[]
    medio_ambiente: string[]
  }
  planGobierno: {
    url: string
    paginas: number
  }
  redesSociales: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
}

// Mock data - En producción vendría de una API
const planchasDetalladas: Plancha[] = [
  {
    id: 1,
    numero: '1',
    presidente: {
      nombre: 'María González',
      foto: 'woman president candidate',
      fechaNacimiento: '15 de marzo de 1975',
      lugarNacimiento: 'Lima, Perú',
      profesion: 'Economista y Administradora Pública',
      educacion: [
        {
          grado: 'Doctorado en Economía',
          institucion: 'Universidad de Harvard',
          año: '2005',
        },
        {
          grado: 'Maestría en Políticas Públicas',
          institucion: 'London School of Economics',
          año: '2000',
        },
        {
          grado: 'Licenciatura en Economía',
          institucion: 'Pontificia Universidad Católica del Perú',
          año: '1997',
        },
      ],
      experienciaLaboral: [
        {
          cargo: 'Ministra de Economía y Finanzas',
          institucion: 'Gobierno del Perú',
          periodo: '2018-2021',
        },
        {
          cargo: 'Consultora Senior',
          institucion: 'Banco Mundial',
          periodo: '2010-2018',
        },
        {
          cargo: 'Economista Principal',
          institucion: 'Banco Central de Reserva del Perú',
          periodo: '2005-2010',
        },
      ],
      trayectoriaPolitica: [
        {
          cargo: 'Ministra de Economía y Finanzas',
          periodo: '2018-2021',
          logros: [
            'Reducción del déficit fiscal en 2.5 puntos porcentuales',
            'Implementación del programa de inclusión financiera rural',
            'Negociación exitosa de tratados de libre comercio con Asia',
          ],
        },
        {
          cargo: 'Congresista de la República',
          periodo: '2016-2018',
          logros: [
            'Autora de la Ley de Transparencia Fiscal',
            'Presidenta de la Comisión de Economía',
            'Impulso de reformas tributarias para pequeñas empresas',
          ],
        },
      ],
    },
    vicepresidente1: {
      nombre: 'Carlos Rodríguez',
      foto: 'man vice president candidate',
      fechaNacimiento: '22 de julio de 1968',
      lugarNacimiento: 'Cusco, Perú',
      profesion: 'Ingeniero Civil y Gestor de Proyectos',
      educacion: [
        {
          grado: 'Maestría en Gestión de Proyectos',
          institucion: 'Universidad Politécnica de Madrid',
          año: '1998',
        },
        {
          grado: 'Ingeniería Civil',
          institucion: 'Universidad Nacional de Ingeniería',
          año: '1992',
        },
      ],
      experienciaLaboral: [
        {
          cargo: 'Ministro de Vivienda y Construcción',
          institucion: 'Gobierno del Perú',
          periodo: '2015-2020',
        },
        {
          cargo: 'Gerente de Infraestructura',
          institucion: 'Gobierno Regional de Cusco',
          periodo: '2010-2015',
        },
      ],
      trayectoriaPolitica: [
        {
          cargo: 'Ministro de Vivienda y Construcción',
          periodo: '2015-2020',
          logros: [
            'Construcción de 50,000 viviendas sociales',
            'Programa Agua para Todos en zonas rurales',
            'Reconstrucción post-terremoto en el sur del país',
          ],
        },
      ],
    },
    vicepresidente2: {
      nombre: 'Ana Silva',
      foto: 'woman vice president candidate',
      fechaNacimiento: '5 de enero de 1980',
      lugarNacimiento: 'Piura, Perú',
      profesion: 'Médica Cirujana',
      educacion: [
        {
          grado: 'Especialidad en Salud Pública',
          institucion: 'Universidad Cayetano Heredia',
          año: '2008',
        },
        {
          grado: 'Medicina',
          institucion: 'Universidad Nacional de Piura',
          año: '2003',
        },
      ],
      experienciaLaboral: [
        {
          cargo: 'Directora Regional de Salud',
          institucion: 'Gobierno Regional de Piura',
          periodo: '2016-2023',
        },
      ],
      trayectoriaPolitica: [
        {
          cargo: 'Directora Regional de Salud',
          periodo: '2016-2023',
          logros: [
            'Reducción de mortalidad materna en 50%',
            'Implementación de telemedicina en zonas rurales',
          ],
        },
      ],
    },
    senadores: [
      {
        nombre: 'Juan Pérez',
        foto: 'man senator candidate',
        edad: 55,
        profesion: 'Abogado',
        departamento: 'Lima',
      },
      {
        nombre: 'María López',
        foto: 'woman senator candidate',
        edad: 48,
        profesion: 'Economista',
        departamento: 'Cusco',
      },
    ],
    diputados: [
      {
        nombre: 'Carlos Gómez',
        foto: 'man deputy candidate',
        edad: 42,
        profesion: 'Ingeniero',
        departamento: 'Lima',
      },
      {
        nombre: 'Ana Martínez',
        foto: 'woman deputy candidate',
        edad: 39,
        profesion: 'Médica',
        departamento: 'Cusco',
      },
    ],
    parlamentoAndino: [
      {
        nombre: 'Pedro Sánchez',
        foto: 'man parliamentarian candidate',
        edad: 45,
        profesion: 'Abogado',
        departamento: 'Lima',
      },
      {
        nombre: 'Luisa Fernández',
        foto: 'woman parliamentarian candidate',
        edad: 40,
        profesion: 'Economista',
        departamento: 'Cusco',
      },
    ],
    partido: {
      id: 'ppn',
      nombre: 'Partido Progreso Nacional',
      siglas: 'PPN',
      color: '#3B82F6',
      fundacion: '2010',
      ideologia: 'Centro-izquierda, Social-demócrata',
      fundador: 'Dr. Alberto Mendoza',
      sede: 'Av. Arequipa 2540, Lima',
      mision:
        'Construir un Perú más justo e inclusivo, donde cada ciudadano tenga acceso a oportunidades de desarrollo y una vida digna, mediante políticas públicas progresistas y participación ciudadana activa.',
      vision:
        'Ser el partido político líder en la transformación del Perú hacia un país desarrollado, con instituciones sólidas, economía sostenible y justicia social para todos los peruanos.',
      valores: [
        'Transparencia y rendición de cuentas',
        'Justicia social e igualdad de oportunidades',
        'Desarrollo sostenible y protección ambiental',
        'Educación de calidad como derecho universal',
        'Respeto a la diversidad cultural',
      ],
    },
    zona: ['lima', 'cusco', 'arequipa'],
    propuestas: {
      educacion: [
        'Educación universitaria gratuita para estudiantes destacados de bajos recursos',
        'Becas integrales que cubran matrícula, alimentación y materiales de estudio',
        'Modernización de infraestructura educativa con tecnología de punta en todas las regiones',
        'Capacitación continua obligatoria para docentes en metodologías modernas y pedagogía digital',
        'Implementación de laboratorios de ciencia en todas las escuelas públicas del país',
        'Programa de alfabetización digital para zonas rurales con conectividad garantizada',
        'Incremento del presupuesto educativo al 6% del PBI',
        'Creación de 50 institutos tecnológicos de excelencia en todo el país',
        'Programa de alimentación escolar gratuita en todas las escuelas públicas',
        'Educación sexual integral desde la primaria',
      ],
      salud: [
        'Cobertura universal de salud con atención gratuita en hospitales públicos',
        'Construcción de 20 hospitales nuevos en zonas rurales de Cusco, Ayacucho y Huancavelica',
        'Telemedicina para zonas alejadas con conectividad satelital gratuita',
        'Contratación de 5,000 médicos especialistas para hospitales regionales',
        'Programa de prevención de enfermedades crónicas en todo el país',
        'Medicamentos oncológicos gratuitos para pacientes de escasos recursos',
        'Implementación de 100 centros de salud mental comunitarios',
        'Programa materno-infantil con seguimiento personalizado',
        'Vacunación completa garantizada para todos los niños',
        'Ambulancias equipadas en todas las provincias',
      ],
      seguridad: [
        'Mayor presencia policial en barrios con alta incidencia delictiva',
        'Cámaras de seguridad inteligentes con reconocimiento facial en Lima y principales ciudades',
        'Programas de prevención juvenil en colegios de zonas vulnerables',
        'Creación de 50 comisarías nuevas en distritos de alto riesgo',
        'Modernización del equipamiento policial con patrulleros y motos',
        'Sistema de denuncia digital anónima con respuesta inmediata 24/7',
        'Aumento de salarios policiales en 30%',
        'Programa de reinserción social para jóvenes infractores',
        'Lucha frontal contra la corrupción policial',
        'Coordinación internacional contra el crimen organizado',
      ],
      economia: [
        'Reducción del IVA en productos básicos de la canasta familiar del 18% al 8%',
        'Apoyo a pequeñas empresas con créditos blandos del Banco de la Nación al 5% anual',
        'Creación de 500,000 empleos formales en sectores productivos en 5 años',
        'Incentivos tributarios para empresas que contraten jóvenes profesionales',
        'Fomento del turismo interno con promoción de destinos regionales',
        'Construcción de infraestructura vial para conectar zonas productivas con puertos',
        'Programa de formalización de microempresas con asesoría gratuita',
        'Reducción de trámites burocráticos para apertura de negocios',
        'Apoyo a la agricultura familiar con subsidios directos',
        'Reactivación de la industria manufacturera nacional',
      ],
      medio_ambiente: [
        'Energía solar en el 100% de edificios públicos para 2030',
        'Reforestación de áreas urbanas con 1 millón de árboles por año',
        'Prohibición total de plásticos de un solo uso en todo el territorio nacional',
        'Protección de parques nacionales y reservas naturales con guardaparques',
        'Programa de reciclaje obligatorio en todos los municipios',
        'Incentivos tributarios para vehículos eléctricos e híbridos',
        'Transporte público eléctrico en todas las ciudades principales',
        'Protección de glaciares y fuentes de agua',
        'Programa de educación ambiental en todas las escuelas',
        'Sanciones severas para empresas contaminantes',
      ],
    },
    planGobierno: {
      url: '#',
      paginas: 145,
    },
    redesSociales: {
      facebook: 'https://facebook.com/mariagonzalez',
      twitter: 'https://twitter.com/mariagonzalez',
      instagram: 'https://instagram.com/mariagonzalez',
    },
  },
  {
    id: 2,
    numero: '2',
    presidente: {
      nombre: 'Carlos Mendoza',
      foto: 'man president candidate suit',
      fechaNacimiento: '8 de noviembre de 1972',
      lugarNacimiento: 'Trujillo, La Libertad',
      profesion: 'Abogado y Empresario',
      educacion: [
        {
          grado: 'MBA',
          institucion: 'ESAN',
          año: '2002',
        },
        {
          grado: 'Derecho',
          institucion: 'Universidad Nacional de Trujillo',
          año: '1995',
        },
      ],
      experienciaLaboral: [
        {
          cargo: 'CEO',
          institucion: 'Grupo Empresarial del Norte',
          periodo: '2010-2023',
        },
        {
          cargo: 'Socio Principal',
          institucion: 'Estudio Jurídico Mendoza & Asociados',
          periodo: '2000-2010',
        },
      ],
      trayectoriaPolitica: [
        {
          cargo: 'Alcalde de Trujillo',
          periodo: '2015-2019',
          logros: [
            'Modernización del transporte público con corredores viales',
            'Reducción de la delincuencia en 40%',
            'Implementación de gobierno digital',
          ],
        },
      ],
    },
    vicepresidente1: {
      nombre: 'Ana Silva',
      foto: 'woman vice president candidate',
      fechaNacimiento: '5 de enero de 1980',
      lugarNacimiento: 'Piura, Perú',
      profesion: 'Médica Cirujana',
      educacion: [
        {
          grado: 'Especialidad en Salud Pública',
          institucion: 'Universidad Cayetano Heredia',
          año: '2008',
        },
        {
          grado: 'Medicina',
          institucion: 'Universidad Nacional de Piura',
          año: '2003',
        },
      ],
      experienciaLaboral: [
        {
          cargo: 'Directora Regional de Salud',
          institucion: 'Gobierno Regional de Piura',
          periodo: '2016-2023',
        },
      ],
      trayectoriaPolitica: [
        {
          cargo: 'Directora Regional de Salud',
          periodo: '2016-2023',
          logros: [
            'Reducción de mortalidad materna en 50%',
            'Implementación de telemedicina en zonas rurales',
          ],
        },
      ],
    },
    vicepresidente2: {
      nombre: 'Luisa Fernández',
      foto: 'woman vice president candidate',
      fechaNacimiento: '12 de abril de 1978',
      lugarNacimiento: 'Lima, Perú',
      profesion: 'Economista',
      educacion: [
        {
          grado: 'Maestría en Economía',
          institucion: 'Universidad de Harvard',
          año: '2005',
        },
        {
          grado: 'Licenciatura en Economía',
          institucion: 'Pontificia Universidad Católica del Perú',
          año: '1997',
        },
      ],
      experienciaLaboral: [
        {
          cargo: 'Ministra de Economía y Finanzas',
          institucion: 'Gobierno del Perú',
          periodo: '2018-2021',
        },
        {
          cargo: 'Consultora Senior',
          institucion: 'Banco Mundial',
          periodo: '2010-2018',
        },
        {
          cargo: 'Economista Principal',
          institucion: 'Banco Central de Reserva del Perú',
          periodo: '2005-2010',
        },
      ],
      trayectoriaPolitica: [
        {
          cargo: 'Ministra de Economía y Finanzas',
          periodo: '2018-2021',
          logros: [
            'Reducción del déficit fiscal en 2.5 puntos porcentuales',
            'Implementación del programa de inclusión financiera rural',
            'Negociación exitosa de tratados de libre comercio con Asia',
          ],
        },
        {
          cargo: 'Congresista de la República',
          periodo: '2016-2018',
          logros: [
            'Autora de la Ley de Transparencia Fiscal',
            'Presidenta de la Comisión de Economía',
            'Impulso de reformas tributarias para pequeñas empresas',
          ],
        },
      ],
    },
    senadores: [
      {
        nombre: 'Juan Pérez',
        foto: 'man senator candidate',
        edad: 55,
        profesion: 'Abogado',
        departamento: 'Lima',
      },
      {
        nombre: 'María López',
        foto: 'woman senator candidate',
        edad: 48,
        profesion: 'Economista',
        departamento: 'Cusco',
      },
    ],
    diputados: [
      {
        nombre: 'Carlos Gómez',
        foto: 'man deputy candidate',
        edad: 42,
        profesion: 'Ingeniero',
        departamento: 'Lima',
      },
      {
        nombre: 'Ana Martínez',
        foto: 'woman deputy candidate',
        edad: 39,
        profesion: 'Médica',
        departamento: 'Cusco',
      },
    ],
    parlamentoAndino: [
      {
        nombre: 'Pedro Sánchez',
        foto: 'man parliamentarian candidate',
        edad: 45,
        profesion: 'Abogado',
        departamento: 'Lima',
      },
      {
        nombre: 'Luisa Fernández',
        foto: 'woman parliamentarian candidate',
        edad: 40,
        profesion: 'Economista',
        departamento: 'Cusco',
      },
    ],
    partido: {
      id: 'fd',
      nombre: 'Frente Democrático',
      siglas: 'FD',
      color: '#10B981',
      fundacion: '2015',
      ideologia: 'Centro-derecha, Liberal',
      fundador: 'Lic. Roberto Paz',
      sede: 'Jr. Lampa 835, Lima',
      mision:
        'Promover el desarrollo económico con libertad individual, mediante políticas que incentiven la inversión privada y el emprendimiento.',
      vision:
        'Un Perú próspero donde el esfuerzo individual sea recompensado y cada ciudadano pueda alcanzar su máximo potencial.',
      valores: [
        'Libertad económica',
        'Meritocracia',
        'Estado eficiente',
        'Seguridad jurídica',
        'Responsabilidad fiscal',
      ],
    },
    zona: ['la_libertad', 'piura', 'lambayeque'],
    propuestas: {
      educacion: [
        'Vouchers educativos de S/2,000 mensuales para familias de bajos recursos',
        'Inglés obligatorio desde primaria con profesores nativos certificados',
        'Alianzas estratégicas con universidades internacionales de prestigio',
        'Evaluación constante de calidad educativa con estándares internacionales',
        'Meritocracia en la contratación docente con mejores salarios',
        'Educación técnica de alto nivel con certificación internacional',
      ],
      salud: [
        'Seguros de salud privados accesibles con subsidio estatal del 50%',
        'Incentivos fiscales para clínicas que atiendan pacientes de bajos recursos',
        'Reducción de listas de espera con alianzas público-privadas',
        'Hospitales de alta complejidad en Trujillo, Chiclayo y Piura',
        'Salud preventiva con chequeos médicos anuales gratuitos',
        'Importación de medicamentos genéricos de calidad',
      ],
      seguridad: [
        'Mano dura contra el crimen con penas severas',
        'Aumento del pie de fuerza policial con 20,000 efectivos',
        'Construcción de centros penitenciarios de máxima seguridad',
        'Tecnología de vigilancia en fronteras y puertos',
        'Coordinación con INTERPOL contra crimen organizado',
      ],
      economia: [
        'Reducción de impuestos empresariales del 29.5% al 25%',
        'Atracción de inversión extranjera con facilidades tributarias',
        'Zonas francas en todas las regiones',
        'Simplificación de trámites en 24 horas',
        'Capital semilla para startups tecnológicas',
      ],
      medio_ambiente: [
        'Incentivos para vehículos eléctricos',
        'Parques industriales ecológicos',
        'Reciclaje obligatorio empresarial',
        'Protección de bosques amazónicos',
        'Certificación ambiental empresarial',
      ],
    },
    planGobierno: {
      url: '#',
      paginas: 120,
    },
    redesSociales: {
      facebook: 'https://facebook.com/carlosmendoza',
      twitter: 'https://twitter.com/carlosmendoza',
    },
  },
]

const zonas = [
  { id: 'lima', label: 'Lima' },
  { id: 'cusco', label: 'Cusco' },
  { id: 'arequipa', label: 'Arequipa' },
  { id: 'la_libertad', label: 'La Libertad' },
  { id: 'piura', label: 'Piura' },
  { id: 'lambayeque', label: 'Lambayeque' },
]

const temas = [
  { id: 'educacion', label: 'Educación', icon: '📚' },
  { id: 'salud', label: 'Salud', icon: '🏥' },
  { id: 'seguridad', label: 'Seguridad', icon: '🛡️' },
  { id: 'economia', label: 'Economía', icon: '💼' },
  { id: 'medio_ambiente', label: 'Medio Ambiente', icon: '🌱' },
]

export function CandidatoDetalle() {
  const navigate = useNavigate()
  const { id } = useParams({ from: '/candidato/$id' as const })
  /* const [plancha, setPlancha] = useState<Plancha | null>(null) */
  const candidatoId = Number.parseInt(id || '0')

  const plancha = useMemo(() => {
    return planchasDetalladas.find((p) => p.id === candidatoId) || null
  }, [candidatoId])

  useEffect(() => {
    if (!plancha) {
      navigate({ to: '/planchas-presidenciales' })
    }
  }, [plancha, navigate])

  if (!plancha) return null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-linear-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          <button
            onClick={() => navigate({ to: '/planchas-presidenciales' })}
            className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Plancha Header */}
          <div className="flex flex-col items-start gap-6 lg:flex-row">
            {/* Logo del Partido */}
            <div className="flex items-center gap-4">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-semibold text-white shadow-lg"
                style={{ backgroundColor: plancha.partido.color }}
              >
                {plancha.partido.siglas}
              </div>
              <div className="space-x-4 lg:hidden">
                <h1 className="text-2xl lg:text-3xl">
                  {plancha.presidente.nombre}
                </h1>

                <p className="mb-4 text-lg text-blue-100">
                  Candidato a la Presidencia
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="hidden lg:block">
                <h1 className="text-2xl lg:text-3xl">
                  {plancha.presidente.nombre}
                </h1>

                <p className="mb-4 text-lg text-blue-100">
                  Candidato a la Presidencia
                </p>
              </div>

              {/* Plancha Presidencial Completa */}
              <div className="mb-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="mb-3 text-sm tracking-wide text-blue-100 uppercase">
                  Plancha Presidencial
                </p>

                {/* Presidente */}
                <div className="mb-3 flex items-center gap-3 border-b border-white/20 pb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop"
                    alt={plancha.presidente.nombre}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <p className="text-xs text-blue-200">Presidente</p>
                    <p className="font-medium text-white">
                      {plancha.presidente.nombre}
                    </p>
                  </div>
                </div>

                {/* Vicepresidentes */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {/* Primer Vicepresidente */}
                  <div className="flex items-center gap-2">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
                      alt={plancha.vicepresidente1.nombre}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-blue-200">
                        Primer Vicepresidente
                      </p>
                      <p className="truncate text-sm font-medium text-white">
                        {plancha.vicepresidente1.nombre}
                      </p>
                    </div>
                  </div>

                  {/* Segundo Vicepresidente */}
                  <div className="flex items-center gap-2">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
                      alt={plancha.vicepresidente2.nombre}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-blue-200">
                        Segundo Vicepresidente
                      </p>
                      <p className="truncate text-sm font-medium text-white">
                        {plancha.vicepresidente2.nombre}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="border-0 bg-white/20 text-white"
                >
                  {plancha.partido.siglas}
                </Badge>
                {plancha.zona.map((z) => {
                  const zona = zonas.find((zona) => zona.id === z)
                  return (
                    <Badge
                      key={z}
                      variant="secondary"
                      className="border-0 bg-white/10 text-white"
                    >
                      <MapPin className="mr-1 h-3 w-3" />
                      {zona?.label}
                    </Badge>
                  )
                })}
              </div>

              {/* Redes Sociales */}
              {plancha.redesSociales && (
                <div className="flex gap-2">
                  {plancha.redesSociales.facebook && (
                    <a
                      href={plancha.redesSociales.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {plancha.redesSociales.twitter && (
                    <a
                      href={plancha.redesSociales.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {plancha.redesSociales.instagram && (
                    <a
                      href={plancha.redesSociales.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Plan de Gobierno */}
            <div className="w-full lg:w-auto">
              <Button
                className="w-full bg-white text-blue-600 hover:bg-blue-50 lg:w-auto"
                onClick={() => window.open(plancha.planGobierno.url, '_blank')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Plan de Gobierno ({plancha.planGobierno.paginas} páginas)
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Tabs defaultValue="presidente" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="presidente">Presidente</TabsTrigger>
            <TabsTrigger value="vicepresidente">Vicepresidentes</TabsTrigger>
            <TabsTrigger value="senadores">
              Senadores ({plancha.senadores.length})
            </TabsTrigger>
            <TabsTrigger value="diputados">
              Diputados ({plancha.diputados.length})
            </TabsTrigger>
            <TabsTrigger value="andino">
              Parl. Andino ({plancha.parlamentoAndino.length})
            </TabsTrigger>
            <TabsTrigger value="partido">Partido</TabsTrigger>
          </TabsList>

          {/* Tab Presidente */}
          <TabsContent value="presidente" className="space-y-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm text-slate-600">
                    Fecha de Nacimiento
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    {plancha.presidente.fechaNacimiento}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-slate-600">
                    Lugar de Nacimiento
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {plancha.presidente.lugarNacimiento}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="mb-1 text-sm text-slate-600">Profesión</p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    {plancha.presidente.profesion}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Educación */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Formación Académica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plancha.presidente.educacion.map((edu, idx) => (
                    <div
                      key={`${edu.grado}-${idx}`}
                      className="border-l-4 border-blue-600 pl-4"
                    >
                      <h4 className="font-semibold text-slate-900">
                        {edu.grado}
                      </h4>
                      <p className="text-slate-600">{edu.institucion}</p>
                      <p className="text-sm text-slate-500">{edu.año}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experiencia Laboral */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experiencia Laboral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plancha.presidente.experienciaLaboral.map((exp, idx) => (
                    <div
                      key={`${exp.cargo}-${idx}`}
                      className="border-l-4 border-green-600 pl-4"
                    >
                      <h4 className="font-semibold text-slate-900">
                        {exp.cargo}
                      </h4>
                      <p className="text-slate-600">{exp.institucion}</p>
                      <p className="text-sm text-slate-500">{exp.periodo}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trayectoria Política */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Trayectoria Política
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {plancha.presidente.trayectoriaPolitica.map((tray, idx) => (
                    <div key={`${tray.cargo}-${idx}`}>
                      <div className="mb-3 border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-slate-900">
                          {tray.cargo}
                        </h4>
                        <p className="mb-2 text-sm text-slate-500">
                          {tray.periodo}
                        </p>
                      </div>
                      <div className="ml-4">
                        <p className="mb-2 text-sm font-medium text-slate-700">
                          Principales Logros:
                        </p>
                        <ul className="space-y-1">
                          {tray.logros.map((logro, lidx) => (
                            <li
                              key={`${logro}-${lidx}`}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <span className="mt-1 text-green-600">✓</span>
                              {logro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {idx <
                        plancha.presidente.trayectoriaPolitica.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Propuestas de Gobierno */}
            <Card>
              <CardHeader>
                <CardTitle>Propuestas de Gobierno</CardTitle>
                <CardDescription>
                  Plan detallado por áreas temáticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="educacion" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                    {temas.map((tema) => (
                      <TabsTrigger
                        key={tema.id}
                        value={tema.id}
                        className="text-xs lg:text-sm"
                      >
                        <span className="mr-1">{tema.icon}</span>
                        <span className="hidden lg:inline">{tema.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {temas.map((tema) => (
                    <TabsContent key={tema.id} value={tema.id} className="mt-4">
                      <h4 className="mb-4 flex items-center gap-2 font-semibold">
                        <span className="text-xl">{tema.icon}</span>
                        {tema.label}
                      </h4>
                      <ul className="space-y-3">
                        {plancha.propuestas[
                          tema.id as keyof typeof plancha.propuestas
                        ].map((propuesta, idx) => (
                          <li
                            key={`${propuesta}-${idx}`}
                            className="flex items-start gap-3 border-l-3 pl-4 text-slate-700"
                            style={{ borderColor: plancha.partido.color }}
                          >
                            <span className="font-semibold text-blue-600">
                              {idx + 1}.
                            </span>
                            {propuesta}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Vicepresidente */}
          <TabsContent value="vicepresidente" className="space-y-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm text-slate-600">
                    Fecha de Nacimiento
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    {plancha.vicepresidente1.fechaNacimiento}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-slate-600">
                    Lugar de Nacimiento
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {plancha.vicepresidente1.lugarNacimiento}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="mb-1 text-sm text-slate-600">Profesión</p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    {plancha.vicepresidente1.profesion}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Educación */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Formación Académica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plancha.vicepresidente1.educacion.map((edu, idx) => (
                    <div
                      key={`${edu.grado}-${idx}`}
                      className="border-l-4 border-blue-600 pl-4"
                    >
                      <h4 className="font-semibold text-slate-900">
                        {edu.grado}
                      </h4>
                      <p className="text-slate-600">{edu.institucion}</p>
                      <p className="text-sm text-slate-500">{edu.año}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experiencia Laboral */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experiencia Laboral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plancha.vicepresidente1.experienciaLaboral.map(
                    (exp, idx) => (
                      <div
                        key={`${exp.cargo}-${idx}`}
                        className="border-l-4 border-green-600 pl-4"
                      >
                        <h4 className="font-semibold text-slate-900">
                          {exp.cargo}
                        </h4>
                        <p className="text-slate-600">{exp.institucion}</p>
                        <p className="text-sm text-slate-500">{exp.periodo}</p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trayectoria Política */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Trayectoria Política
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {plancha.vicepresidente1.trayectoriaPolitica.map(
                    (tray, idx) => (
                      <div key={`${tray.cargo}-${idx}`}>
                        <div className="mb-3 border-l-4 border-purple-600 pl-4">
                          <h4 className="font-semibold text-slate-900">
                            {tray.cargo}
                          </h4>
                          <p className="mb-2 text-sm text-slate-500">
                            {tray.periodo}
                          </p>
                        </div>
                        <div className="ml-4">
                          <p className="mb-2 text-sm font-medium text-slate-700">
                            Principales Logros:
                          </p>
                          <ul className="space-y-1">
                            {tray.logros.map((logro, lidx) => (
                              <li
                                key={`${logro}-${lidx}`}
                                className="flex items-start gap-2 text-sm text-slate-600"
                              >
                                <span className="mt-1 text-green-600">✓</span>
                                {logro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Senadores */}
          <TabsContent value="senadores" className="space-y-6">
            {plancha.senadores.map((senador) => (
              <Card
                key={`${senador.nombre}-${senador.edad}-${senador.departamento}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {senador.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Edad</p>
                    <p className="font-medium">{senador.edad} años</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Profesión</p>
                    <p className="font-medium">{senador.profesion}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-1 text-sm text-slate-600">Departamento</p>
                    <p className="font-medium">{senador.departamento}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tab Diputados */}
          <TabsContent value="diputados" className="space-y-6">
            {plancha.diputados.map((diputado) => (
              <Card
                key={`${diputado.nombre}-${diputado.edad}-${diputado.departamento}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {diputado.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Edad</p>
                    <p className="font-medium">{diputado.edad} años</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Profesión</p>
                    <p className="font-medium">{diputado.profesion}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-1 text-sm text-slate-600">Departamento</p>
                    <p className="font-medium">{diputado.departamento}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tab Parlamento Andino */}
          <TabsContent value="andino" className="space-y-6">
            {plancha.parlamentoAndino.map((parlamento) => (
              <Card
                key={`${parlamento.nombre}-${parlamento.edad}-${parlamento.departamento}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {parlamento.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Edad</p>
                    <p className="font-medium">{parlamento.edad} años</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Profesión</p>
                    <p className="font-medium">{parlamento.profesion}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-1 text-sm text-slate-600">Departamento</p>
                    <p className="font-medium">{parlamento.departamento}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tab Partido */}
          <TabsContent value="partido" className="space-y-6">
            {/* Información del Partido */}
            <Card>
              <CardHeader
                style={{ backgroundColor: `${plancha.partido.color}15` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl text-white"
                    style={{ backgroundColor: plancha.partido.color }}
                  >
                    {plancha.partido.siglas}
                  </div>
                  <div>
                    <CardTitle>{plancha.partido.nombre}</CardTitle>
                    <CardDescription>{plancha.partido.siglas}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Fundación</p>
                    <p className="font-medium">{plancha.partido.fundacion}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Ideología</p>
                    <p className="font-medium">{plancha.partido.ideologia}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Fundador</p>
                    <p className="font-medium">{plancha.partido.fundador}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-600">Sede Central</p>
                    <p className="font-medium">{plancha.partido.sede}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Misión y Visión */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-slate-700">
                    {plancha.partido.mision}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-slate-700">
                    {plancha.partido.vision}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Valores */}
            <Card>
              <CardHeader>
                <CardTitle>Valores del Partido</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plancha.partido.valores.map((valor, idx) => (
                    <li
                      key={`${valor}-${idx}`}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm text-white"
                        style={{ backgroundColor: plancha.partido.color }}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-slate-700">{valor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
