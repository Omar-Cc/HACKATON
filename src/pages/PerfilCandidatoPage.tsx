import { useParams } from '@tanstack/react-router'
import {
  ExternalLink,
  FileText,
  Scale,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PartidoWatermark } from '@/components/ui/partido-watermark'
import type { Candidato } from '@/types/candidatos'
import { getPartidoColor } from '@/data/partidos'
import { getCandidatoById } from '@/data/elecciones'

// Mock data - En producción vendría del JSON o CMS
const MOCK_CANDIDATO: Candidato = {
  id: 'PRES-001',
  nombre: 'María Elena Sánchez Torres',
  profesion: 'Economista',
  edad: 52,
  partido: {
    nombre: 'Alianza para el Progreso',
    nombreCorto: 'APP',
    color: '#0073e6',
    logo: '/logos/app.png',
  },
  tipo: 'presidente',
  experiencia: [],
  avatar: 'MS',
  fotoPrincipal: '/candidatos/maria-sanchez.jpg', // Ficticio
  propuestaCentral:
    'Reformar el sistema de salud con inversión en hospitales regionales y telemedicina para garantizar atención universal de calidad en todo el Perú.',
  formacion: [
    {
      tipo: 'educacion',
      titulo: 'Magíster en Gestión Pública',
      institucion: 'Universidad del Pacífico',
      anio: '2015',
    },
    {
      tipo: 'educacion',
      titulo: 'Licenciada en Economía',
      institucion: 'Pontificia Universidad Católica del Perú',
      anio: '2000',
    },
    {
      tipo: 'cargo',
      titulo: 'Ministra de Economía y Finanzas',
      anio: '2020-2022',
    },
    {
      tipo: 'cargo',
      titulo: 'Viceministra de Hacienda',
      anio: '2018-2020',
    },
    {
      tipo: 'proyecto',
      titulo: 'Autora del Proyecto de Ley N° 12345 - Reforma Tributaria',
      anio: '2019',
    },
  ],
  historialPolitico: [
    {
      anio: '2026',
      descripcion: 'Postula a la presidencia',
      partido: 'Alianza para el Progreso',
    },
    {
      anio: '2021',
      descripcion: 'Postuló al Congreso',
      partido: 'Partido Popular Cristiano',
    },
    {
      anio: '2016',
      descripcion: 'Elegida Regidora de Lima',
      partido: 'Peruanos por el Kambio',
    },
  ],
  enlacesVerificacion: [
    {
      titulo: 'Ver Hoja de Vida Oficial Completa',
      url: 'https://jne.gob.pe/hojadevida/...',
      fuente: 'JNE - Jurado Nacional de Elecciones',
      tipo: 'oficial',
    },
    {
      titulo: 'Consultar Declaración Jurada de Ingresos',
      url: 'https://jne.gob.pe/declaracion/...',
      fuente: 'JNE - Jurado Nacional de Elecciones',
      tipo: 'oficial',
    },
    {
      titulo: 'Revisar Historial de Sentencias',
      url: 'https://jne.gob.pe/sentencias/...',
      fuente: 'JNE - Jurado Nacional de Elecciones',
      tipo: 'oficial',
    },
    {
      titulo: 'Ver Plan de Gobierno Oficial del Partido',
      url: 'https://jne.gob.pe/plangobierno/...',
      fuente: 'JNE - Documento PDF',
      tipo: 'documento',
    },
    {
      titulo: 'Artículo: "Análisis de propuestas económicas de candidata"',
      url: 'https://elcomercio.pe/...',
      fuente: 'El Comercio',
      tipo: 'periodistico',
    },
  ],
  planAnalisis: {
    categorias: [
      { nombre: 'Salud', menciones: 45 },
      { nombre: 'Educación', menciones: 38 },
      { nombre: 'Economía', menciones: 52 },
      { nombre: 'Seguridad', menciones: 28 },
      { nombre: 'Infraestructura', menciones: 22 },
      { nombre: 'Medio Ambiente', menciones: 15 },
    ],
    fuenteUrl: 'https://jne.gob.pe/plangobierno/...',
  },
  noticiasRelacionadas: [
    {
      titulo: 'Candidata presenta plan de reactivación económica',
      resumen:
        'La candidata presidencial María Elena Sánchez presentó su plan de reactivación económica enfocado en la pequeña y mediana empresa.',
      url: 'https://elcomercio.pe/politica/...',
      imagenUrl: '/noticias/noticia1.jpg',
      fecha: '2026-01-15',
      fuente: 'El Comercio',
    },
    {
      titulo: 'Debate presidencial: propuestas en salud',
      resumen:
        'Durante el debate, la candidata defendió su propuesta de reforma del sistema de salud con énfasis en hospitales regionales.',
      url: 'https://elcomercio.pe/politica/...',
      imagenUrl: '/noticias/noticia2.jpg',
      fecha: '2026-01-10',
      fuente: 'El Comercio',
    },
    {
      titulo: 'Análisis: Viabilidad de propuestas económicas',
      resumen:
        'Expertos analizan la viabilidad fiscal de las propuestas presentadas por los candidatos presidenciales.',
      url: 'https://elcomercio.pe/economia/...',
      imagenUrl: '/noticias/noticia3.jpg',
      fecha: '2026-01-05',
      fuente: 'El Comercio',
    },
  ],
}

export default function PerfilCandidatoPage() {
  const params = useParams({ from: '/candidato/$id' as const })
  const routeId = params?.id
  const candidatoReal: Candidato =
    (routeId ? getCandidatoById(routeId) : null) ?? MOCK_CANDIDATO
  const partidoColor = getPartidoColor(candidatoReal.partido.color)

  const getBadgeTexto = () => {
    if (candidatoReal.tipo === 'presidente') return 'Candidato a la Presidencia'
    if (candidatoReal.tipo === 'senador') {
      return candidatoReal.tipoSenador === 'nacional'
        ? 'Senador - Lista Nacional'
        : `Senador Regional - ${candidatoReal.region}`
    }
    if (candidatoReal.tipo === 'diputado')
      return `Diputado por ${candidatoReal.region}`
    return `Parlamento Andino - Distrito Nacional`
  }

  const maxMenciones = candidatoReal.planAnalisis
    ? Math.max(...candidatoReal.planAnalisis.categorias.map((c) => c.menciones))
    : 100

  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* 1. BLOQUE DE CABECERA (Para TODOS) */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="from-primary/10 to-primary/5 relative bg-linear-to-r p-8">
            {/* Marca de agua del partido */}
            <PartidoWatermark
              logo={candidatoReal.partido.logo}
              siglas={candidatoReal.partido.nombreCorto}
              color={partidoColor}
              siglasOpacity={0.05}
            />

            <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row">
              {/* Foto del candidato */}
              <div className="shrink-0">
                {candidatoReal.fotoPrincipal ? (
                  <img
                    src={candidatoReal.fotoPrincipal}
                    alt={candidatoReal.nombre}
                    className="border-background h-32 w-32 rounded-full border-4 object-cover shadow-lg"
                  />
                ) : (
                  <div className="bg-primary/20 text-primary border-background flex h-32 w-32 items-center justify-center rounded-full border-4 text-4xl font-bold shadow-lg">
                    {candidatoReal.avatar}
                  </div>
                )}
              </div>

              {/* Información principal */}
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-3xl font-bold md:text-4xl">
                    {candidatoReal.nombre}
                  </h1>
                  <p className="text-muted-foreground mt-1 text-lg">
                    {candidatoReal.profesion}, {candidatoReal.edad} años
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    style={{ backgroundColor: partidoColor, color: '#fff' }}
                    className="px-4 py-1 text-base"
                  >
                    {candidatoReal.partido.nombre}
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-1 text-base">
                    {getBadgeTexto()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. BLOQUE DE "PROPUESTA CENTRAL" (SOLO PARA PRESIDENTE) */}
      {candidatoReal.tipo === 'presidente' &&
        candidatoReal.propuestaCentral && (
          <Alert className="border-primary/50 bg-primary/5">
            <TrendingUp className="h-5 w-5" />
            <AlertTitle className="text-lg">
              Propuesta Central de Campaña
            </AlertTitle>
            <AlertDescription className="mt-2 text-base">
              "{candidatoReal.propuestaCentral}"
            </AlertDescription>
          </Alert>
        )}

      {/* 3. BLOQUE DE "FICHA DE TRANSPARENCIA" (PARA TODOS - El Núcleo) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6" />
            Ficha de Transparencia
          </CardTitle>
          <CardDescription>
            Información verificada y enlaces a fuentes oficiales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="experiencia" className="w-full">
            <TabsList className="mb-14 grid w-full grid-cols-1 gap-2 md:mb-0 md:grid-cols-3 md:gap-0">
              <TabsTrigger value="experiencia">
                Experiencia y Formación
              </TabsTrigger>
              <TabsTrigger value="historial">Historial Político</TabsTrigger>
              <TabsTrigger value="verificacion">
                Verificación y Enlaces
              </TabsTrigger>
            </TabsList>

            {/* Pestaña 1: Experiencia y Formación */}
            <TabsContent value="experiencia" className="mt-6 space-y-4">
              <div className="space-y-3">
                {candidatoReal.formacion &&
                candidatoReal.formacion.length > 0 ? (
                  candidatoReal.formacion.map((item) => (
                    <div
                      key={`${item.tipo}-${item.titulo}`}
                      className="bg-muted/30 flex items-start gap-3 rounded-lg p-3"
                    >
                      <div className="mt-1">
                        {item.tipo === 'educacion' && (
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        )}
                        {item.tipo === 'cargo' && (
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                        {item.tipo === 'proyecto' && (
                          <div className="h-2 w-2 rounded-full bg-purple-500" />
                        )}
                        {item.tipo === 'logro' && (
                          <div className="h-2 w-2 rounded-full bg-orange-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.titulo}</p>
                        {item.institucion && (
                          <p className="text-muted-foreground text-sm">
                            {item.institucion}
                          </p>
                        )}
                        {item.anio && (
                          <p className="text-muted-foreground mt-1 text-xs">
                            {item.anio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    No hay información de formación disponible.
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Pestaña 2: Historial Político */}
            <TabsContent value="historial" className="mt-6 space-y-4">
              <div className="border-primary/20 relative space-y-6 border-l-2 pl-6">
                {candidatoReal.historialPolitico &&
                candidatoReal.historialPolitico.length > 0 ? (
                  candidatoReal.historialPolitico.map((item) => (
                    <div
                      key={`${item.anio}-${item.descripcion}`}
                      className="relative"
                    >
                      <div className="absolute -left-[29px] mt-1.5">
                        <Calendar className="text-primary bg-background h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-primary font-semibold">
                          {item.anio}
                        </p>
                        <p className="font-medium">{item.descripcion}</p>
                        {item.partido && (
                          <Badge variant="outline" className="mt-1">
                            {item.partido}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    No hay información de historial político disponible.
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Pestaña 3: Verificación y Enlaces de Interés */}
            <TabsContent value="verificacion" className="mt-6 space-y-4">
              <p className="text-muted-foreground mb-4 text-sm">
                Enlaces a fuentes oficiales y periodísticas para verificar la
                información del candidato.
              </p>
              <div className="space-y-3">
                {candidatoReal.enlacesVerificacion &&
                candidatoReal.enlacesVerificacion.length > 0 ? (
                  candidatoReal.enlacesVerificacion.map((enlace) => (
                    <a
                      key={enlace.url}
                      href={enlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:border-primary hover:bg-primary/5 group flex items-start gap-3 rounded-lg border p-4 transition-all"
                    >
                      <div className="mt-1 shrink-0">
                        {enlace.tipo === 'oficial' && (
                          <Scale className="h-5 w-5 text-blue-600" />
                        )}
                        {enlace.tipo === 'documento' && (
                          <FileText className="h-5 w-5 text-green-600" />
                        )}
                        {enlace.tipo === 'periodistico' && (
                          <ExternalLink className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="group-hover:text-primary font-medium transition-colors">
                          {enlace.titulo}
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Fuente: {enlace.fuente}
                        </p>
                      </div>
                      <ExternalLink className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                    </a>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    No hay enlaces de verificación disponibles.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 4. BLOQUE DE "ANÁLISIS DE PLAN" (SOLO PARA PRESIDENTE) */}
      {candidatoReal.tipo === 'presidente' && candidatoReal.planAnalisis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6" />
              Análisis del Plan de Gobierno
            </CardTitle>
            <CardDescription>
              Conteo de menciones de temas clave en el plan de gobierno oficial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidatoReal.planAnalisis.categorias.map((categoria) => {
                const porcentaje = (categoria.menciones / maxMenciones) * 100
                return (
                  <div key={categoria.nombre} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{categoria.nombre}</span>
                      <span className="text-muted-foreground text-sm">
                        {categoria.menciones} menciones
                      </span>
                    </div>
                    <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full transition-all duration-500"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            {candidatoReal.planAnalisis.fuenteUrl && (
              <div className="mt-6 border-t pt-6">
                <a
                  href={candidatoReal.planAnalisis.fuenteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary inline-flex items-center gap-2 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  Ver plan de gobierno completo (PDF)
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 5. BLOQUE DE "NOTICIAS RELACIONADAS" (PARA TODOS) */}
      {candidatoReal.noticiasRelacionadas &&
        candidatoReal.noticiasRelacionadas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ExternalLink className="h-6 w-6" />
                Noticias Relacionadas
              </CardTitle>
              <CardDescription>
                Cobertura periodística más reciente sobre el candidato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {candidatoReal.noticiasRelacionadas.map((noticia) => (
                  <a
                    key={noticia.url}
                    href={noticia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:border-primary block overflow-hidden rounded-lg border transition-all hover:shadow-md"
                  >
                    {noticia.imagenUrl && (
                      <div className="bg-muted aspect-video overflow-hidden">
                        <img
                          src={noticia.imagenUrl}
                          alt={noticia.titulo}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="space-y-2 p-4">
                      <p className="text-muted-foreground text-xs">
                        {new Date(noticia.fecha).toLocaleDateString('es-PE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}{' '}
                        • {noticia.fuente}
                      </p>
                      <h3 className="group-hover:text-primary line-clamp-2 font-semibold transition-colors">
                        {noticia.titulo}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {noticia.resumen}
                      </p>
                      <div className="text-primary flex items-center gap-1 pt-2 text-sm font-medium">
                        Leer más
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  )
}
