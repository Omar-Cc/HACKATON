import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft, Search, X, Filter } from 'lucide-react'
import { ImageWithFallback } from '@/components/imageWithFallback'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  PLANCHAS,
  DIPUTADOS,
  SENADORES,
  PARLAMENTO_ANDINO,
} from '@/data/elecciones'
import type { Candidato } from '@/types/candidatos'

interface Plancha {
  id: number
  numero: string
  presidente: {
    nombre: string
    foto: string
  }
  vicepresidente: {
    nombre: string
    foto: string
  }
  partido: string
  partidoId: string
  color: string
  propuestas: {
    educacion: string[]
    salud: string[]
    seguridad: string[]
    economia: string[]
    medio_ambiente: string[]
  }
  zona: string[]
}

type TipoComparacion =
  | 'planchas'
  | 'diputados'
  | 'senadores'
  | 'parlamento-andino'

// Map PLANCHAS centralizadas a la estructura que usa esta página
const planchasMock: Plancha[] = PLANCHAS.map((p) => {
  // PLANCHAS comes from a shared source and may have slightly different field names
  const pSource = p as unknown as {
    id: number
    numero: string
    presidente: { nombre: string; foto: string }
    vicepresidente1?: { nombre: string; foto: string }
    vicepresidente2?: { nombre: string; foto: string }
    partido: { nombre: string; id: string; color?: string }
    propuestas: Plancha['propuestas']
    zona: string[]
  }

  return {
    id: pSource.id,
    numero: pSource.numero,
    presidente: pSource.presidente,
    vicepresidente: pSource.vicepresidente1 ??
      pSource.vicepresidente2 ?? { nombre: '', foto: '' },
    partido: pSource.partido.nombre,
    partidoId: pSource.partido.id,
    color: pSource.partido.color || '#000000',
    propuestas: pSource.propuestas,
    zona: pSource.zona,
  }
})

const temas = [
  { id: 'educacion', label: 'Educación', icon: '📚' },
  { id: 'salud', label: 'Salud', icon: '🏥' },
  { id: 'seguridad', label: 'Seguridad', icon: '🛡️' },
  { id: 'economia', label: 'Economía', icon: '💼' },
  { id: 'medio_ambiente', label: 'Medio Ambiente', icon: '🌱' },
]

// Helper: genera siglas a partir del nombre del partido (p. ej. "Partido Progreso Nacional" -> "PPN")
function getSiglas(nombre = '') {
  return nombre
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase()
}

export function ComparacionPage() {
  const navigate = useNavigate()
  const searchParams = useMemo(() => {
    if (typeof globalThis !== 'undefined' && globalThis.location) {
      return new URLSearchParams(globalThis.location.search)
    }
    return new URLSearchParams()
  }, [])

  const tipoComparacion = (searchParams.get('tipo') ||
    'planchas') as TipoComparacion

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTemas, setSelectedTemas] = useState<string[]>([])
  const [syncScroll, setSyncScroll] = useState(true)

  // Refs para sincronizar el scroll vertical entre las columnas de propuestas (vista desktop)
  const scrollContainersRef = useRef<HTMLDivElement[]>([])
  const isSyncingRef = useRef(false)

  const selectedIds = useMemo(() => {
    const search =
      typeof globalThis !== 'undefined' && globalThis.location
        ? new URLSearchParams(globalThis.location.search)
        : new URLSearchParams()

    const selected = search.get('selectedIds') || ''

    return selected
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
  }, [])

  // Obtener los candidatos según el tipo
  const candidatos = useMemo(() => {
    let source: Candidato[] = []

    switch (tipoComparacion) {
      case 'diputados':
        source = DIPUTADOS
        break
      case 'senadores':
        source = SENADORES
        break
      case 'parlamento-andino':
        source = PARLAMENTO_ANDINO
        break
      case 'planchas':
      default:
        // Para planchas, usar la estructura existente
        return planchasMock.filter((p) => selectedIds.includes(String(p.id)))
    }

    return source.filter((c) => selectedIds.includes(c.id))
  }, [selectedIds, tipoComparacion])

  // Mantener compatibilidad con el código existente para planchas
  const planchas = useMemo(() => {
    if (tipoComparacion === 'planchas') {
      return candidatos as Plancha[]
    }
    return []
  }, [candidatos, tipoComparacion])

  const esComparacionCongreso = tipoComparacion !== 'planchas'

  useEffect(() => {
    if (candidatos.length === 0 && planchas.length === 0) {
      const destino =
        tipoComparacion === 'planchas'
          ? '/planchas-presidenciales'
          : '/congreso'
      navigate({ to: destino })
    }
  }, [candidatos, planchas, navigate, tipoComparacion])
  useEffect(() => {
    scrollContainersRef.current = scrollContainersRef.current.slice(
      0,
      planchas.length
    )

    const containers = scrollContainersRef.current.filter(Boolean)

    if (containers.length === 0) return

    const onScroll = (e: Event) => {
      if (isSyncingRef.current) return
      const target = e.currentTarget as HTMLDivElement

      const maxTarget = Math.max(1, target.scrollHeight - target.clientHeight)
      const ratio = target.scrollTop / maxTarget

      isSyncingRef.current = true

      for (const c of containers) {
        if (c && c !== target) {
          const maxC = Math.max(0, c.scrollHeight - c.clientHeight)
          c.scrollTop = Math.round(ratio * maxC)
        }
      }

      requestAnimationFrame(() => {
        isSyncingRef.current = false
      })
    }

    if (!syncScroll) return

    for (const c of containers) {
      c.addEventListener('scroll', onScroll)
    }

    return () => {
      for (const c of containers) {
        c.removeEventListener('scroll', onScroll)
      }
    }
  }, [planchas, searchTerm, selectedTemas, syncScroll])

  const toggleTema = (temaId: string) => {
    setSelectedTemas((prev) => {
      if (prev.includes(temaId)) {
        return prev.filter((t) => t !== temaId)
      } else {
        return [temaId] // Solo permitir un tema a la vez para mejor UX
      }
    })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTemas([])
  }

  // Filtrar propuestas por palabra clave y tema seleccionado (solo para planchas)
  const getFilteredPropuestas = (plancha: Plancha) => {
    const propuestasFiltradas: typeof plancha.propuestas = {
      educacion: [],
      salud: [],
      seguridad: [],
      economia: [],
      medio_ambiente: [],
    }

    for (const tema of Object.keys(
      plancha.propuestas
    ) as (keyof typeof plancha.propuestas)[]) {
      const propuestas = plancha.propuestas[tema]

      // Si hay tema seleccionado, solo mostrar ese tema
      if (selectedTemas.length > 0 && !selectedTemas.includes(tema as string)) {
        continue
      }

      // Filtrar por palabra clave
      const filtered = propuestas.filter(
        (propuesta) =>
          searchTerm.trim() === '' ||
          propuesta.toLowerCase().includes(searchTerm.toLowerCase())
      )

      propuestasFiltradas[tema] = filtered
    }

    return propuestasFiltradas
  }

  // Calcular total de propuestas visibles
  const getTotalPropuestasVisibles = (plancha: Plancha) => {
    const propuestas = getFilteredPropuestas(plancha)
    return Object.values(propuestas).flat().length
  }

  // Convertir candidatos de congreso al formato de plancha para renderizado uniforme
  const candidatosAsPlanchas = useMemo(() => {
    if (!esComparacionCongreso) return []

    // Filtrar experiencia localmente
    const filterExperiencia = (candidato: Candidato) => {
      if (!candidato.experiencia) return []
      return candidato.experiencia.filter(
        (exp) =>
          searchTerm.trim() === '' ||
          exp.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return (candidatos as Candidato[]).map((candidato) => {
      const experienciaFiltrada = filterExperiencia(candidato)

      let zona: string[]
      if (candidato.region) {
        zona = [candidato.region]
      } else if (candidato.tipoSenador) {
        zona = [
          candidato.tipoSenador === 'nacional'
            ? 'Lista Nacional'
            : 'Lista Regional',
        ]
      } else {
        zona = ['Distrito Nacional']
      }

      return {
        id: Number.parseInt(candidato.id) || 0,
        numero: candidato.id,
        presidente: {
          nombre: candidato.nombre,
          foto: candidato.avatar || '',
        },
        vicepresidente: {
          nombre: `${candidato.profesion}, ${candidato.edad} años`,
          foto: '',
        },
        partido: candidato.partido.nombre,
        partidoId: candidato.partido.nombreCorto || candidato.partido.nombre,
        color: candidato.partido.color || '#4B5563',
        propuestas: {
          educacion: experienciaFiltrada.slice(
            0,
            Math.ceil(experienciaFiltrada.length / 3)
          ),
          salud: experienciaFiltrada.slice(
            Math.ceil(experienciaFiltrada.length / 3),
            Math.ceil((experienciaFiltrada.length * 2) / 3)
          ),
          seguridad: experienciaFiltrada.slice(
            Math.ceil((experienciaFiltrada.length * 2) / 3)
          ),
          economia: [],
          medio_ambiente: [],
        },
        zona,
        // Datos adicionales del congresista
        _esCongresista: true,
        _candidatoOriginal: candidato,
      } as Plancha & {
        _esCongresista?: boolean
        _candidatoOriginal?: Candidato
      }
    })
  }, [candidatos, esComparacionCongreso, searchTerm])

  // Unificar datos para renderizado
  const itemsParaRenderizar = useMemo(() => {
    return esComparacionCongreso ? candidatosAsPlanchas : planchas
  }, [esComparacionCongreso, candidatosAsPlanchas, planchas])

  const hasActiveFilters = searchTerm.trim() !== '' || selectedTemas.length > 0

  // Títulos dinámicos según el tipo
  const getTitulo = () => {
    switch (tipoComparacion) {
      case 'diputados':
        return 'Comparación de Candidatos a Diputados'
      case 'senadores':
        return 'Comparación de Candidatos a Senadores'
      case 'parlamento-andino':
        return 'Comparación de Candidatos al Parlamento Andino'
      default:
        return 'Comparación de Candidatos Presidenciales'
    }
  }

  const getBackRoute = () => {
    return tipoComparacion === 'planchas'
      ? '/planchas-presidenciales'
      : '/congreso'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Sticky sticky top-0 z-40 */}
      <header className="bg-linear-to-br from-blue-600 to-blue-700 shadow-lg">
        <div className="container mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8 lg:py-6">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => navigate({ to: getBackRoute() })}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="mb-2 text-3xl leading-tight font-extrabold text-white lg:text-4xl">
              {getTitulo()}
            </h1>
            <div className="w-10" /> {/* Spacer para balance */}
          </div>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={
                  esComparacionCongreso
                    ? 'Buscar en experiencia...'
                    : 'Buscar propuesta por palabra clave (ej: Cusco, policía, hospital)...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-0 py-3 pr-4 pl-12 transition-shadow focus:outline-none"
                style={{
                  backgroundColor: 'var(--input)',
                  color: 'var(--foreground)',
                }}
              />
            </div>

            {/* Filtro de Temas - Solo para planchas */}
            {!esComparacionCongreso && (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:w-auto">
                    <Filter className="h-5 w-5" />
                    <span>Filtrar por tema</span>
                    {selectedTemas.length > 0 && (
                      <Badge className="bg-white text-purple-600">
                        {selectedTemas.length}
                      </Badge>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtrar por Tema de Interés</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-4 ps-3">
                    <p className="text-sm text-slate-600">
                      Selecciona un tema para ver solo las propuestas
                      relacionadas:
                    </p>

                    <div className="space-y-3">
                      {temas.map((tema) => (
                        <div
                          key={tema.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`tema-${tema.id}`}
                            checked={selectedTemas.includes(tema.id)}
                            onCheckedChange={() => toggleTema(tema.id)}
                          />
                          <Label
                            htmlFor={`tema-${tema.id}`}
                            className="cursor-pointer"
                          >
                            <span className="mr-2">{tema.icon}</span>
                            {tema.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Limpiar Filtros
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {/* Control para activar/desactivar sincronización de scroll (desktop) - Solo para planchas */}
            {!esComparacionCongreso && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="sync-scroll"
                  checked={syncScroll}
                  onCheckedChange={(v: boolean | 'indeterminate' | undefined) =>
                    setSyncScroll(!!v)
                  }
                />
                <Label htmlFor="sync-scroll" className="text-sm text-white">
                  Sincronizar scroll
                </Label>
              </div>
            )}
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="border-0 bg-white/20 text-white"
                >
                  Búsqueda: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-2">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedTemas.map((temaId) => {
                const tema = temas.find((t) => t.id === temaId)
                return (
                  <Badge
                    key={temaId}
                    variant="secondary"
                    className="border-0 bg-white/20 text-white"
                  >
                    {tema?.icon} {tema?.label}
                    <button onClick={() => toggleTema(temaId)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Tabla Comparativa */}
      <main className="container mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 lg:py-8">
        {/* Info de resultados */}
        {hasActiveFilters && !esComparacionCongreso && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              {itemsParaRenderizar
                .map((p) => getTotalPropuestasVisibles(p))
                .reduce((a, b) => a + b, 0)}{' '}
              propuestas encontradas en total
            </p>
          </div>
        )}

        {hasActiveFilters && esComparacionCongreso && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              {itemsParaRenderizar
                .map((p) => getTotalPropuestasVisibles(p))
                .reduce((a, b) => a + b, 0)}{' '}
              experiencias encontradas en total
            </p>
          </div>
        )}

        {/* Vista Mobile: Accordion */}
        <div className="space-y-4 lg:hidden">
          {itemsParaRenderizar.map((plancha) => {
            const propuestasFiltradas = getFilteredPropuestas(plancha)
            const totalVisible = getTotalPropuestasVisibles(plancha)
            const esCongresista = (
              plancha as Plancha & { _esCongresista?: boolean }
            )._esCongresista
            const candidatoOriginal = (
              plancha as Plancha & { _candidatoOriginal?: Candidato }
            )._candidatoOriginal

            return (
              <div
                key={plancha.id}
                className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white"
              >
                {/* Header */}
                <div
                  className="border-b border-slate-200 p-4"
                  style={{ backgroundColor: `${plancha.color}15` }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    {!esCongresista && (
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
                        alt={plancha.presidente.nombre}
                        loading="lazy"
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
                      />
                    )}
                    {esCongresista && candidatoOriginal && (
                      <div className="bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-bold">
                        {candidatoOriginal.avatar}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8">
                          <div
                            className="absolute inset-0 flex items-center justify-center rounded text-sm font-semibold text-white"
                            style={{ backgroundColor: plancha.color }}
                          >
                            {getSiglas(plancha.partido)}
                          </div>
                          <img
                            src={`/assets/${plancha.partidoId}.png`}
                            alt={`${plancha.partido} logo`}
                            className="absolute inset-0 h-8 w-8 rounded object-cover"
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement>
                            ) => {
                              const img = e.currentTarget as HTMLImageElement
                              img.style.display = 'none'
                            }}
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {plancha.presidente.nombre}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: plancha.color }}
                          >
                            {plancha.partido}
                          </p>
                        </div>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-1">
                        {esCongresista && (
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: plancha.color,
                              color: '#fff',
                            }}
                          >
                            N° {plancha.numero}
                          </Badge>
                        )}
                        {esCongresista && candidatoOriginal?.region && (
                          <Badge variant="secondary" className="text-xs">
                            {candidatoOriginal.region}
                          </Badge>
                        )}
                        {esCongresista && candidatoOriginal?.tipoSenador && (
                          <Badge variant="outline" className="text-xs">
                            {candidatoOriginal.tipoSenador === 'nacional'
                              ? 'Lista Nacional'
                              : 'Lista Regional'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <p className="text-xs text-slate-600">
                      {totalVisible}{' '}
                      {esCongresista ? 'experiencias' : 'propuestas'} coinciden
                    </p>
                  )}
                </div>

                {/* Propuestas / Experiencia */}
                <div className="space-y-4 p-4">
                  {esCongresista ? (
                    // Para congresistas, mostrar toda la experiencia sin categorías
                    <>
                      {candidatoOriginal && (
                        <>
                          <div>
                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <span>📋</span>
                              Información
                            </h4>
                            <p className="text-sm text-slate-600">
                              {candidatoOriginal.profesion},{' '}
                              {candidatoOriginal.edad} años
                            </p>
                          </div>
                          {totalVisible > 0 && (
                            <div>
                              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <span>💼</span>
                                Experiencia
                              </h4>
                              <ul className="space-y-2">
                                {Object.values(propuestasFiltradas)
                                  .flat()
                                  .map((exp) => (
                                    <li
                                      key={`${plancha.id}-${exp.substring(0, 20)}`}
                                      className="border-l-2 pl-4 text-sm text-slate-600"
                                      style={{ borderColor: plancha.color }}
                                    >
                                      {exp}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    // Para planchas, mantener el formato por temas
                    Object.entries(propuestasFiltradas).map(
                      ([tema, propuestas]) => {
                        if (propuestas.length === 0) return null

                        const temaInfo = temas.find((t) => t.id === tema)
                        return (
                          <div key={tema}>
                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <span>{temaInfo?.icon}</span>
                              {temaInfo?.label}
                            </h4>
                            <ul className="space-y-2">
                              {propuestas.map((propuesta) => (
                                <li
                                  key={`${tema}-${propuesta}`}
                                  className="border-l-2 pl-4 text-sm text-slate-600"
                                  style={{ borderColor: plancha.color }}
                                >
                                  {propuesta}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                    )
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Vista Desktop: Tabla lado a lado */}
        <div className="hidden overflow-x-auto lg:block">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${itemsParaRenderizar.length}, minmax(350px, 1fr))`,
            }}
          >
            {itemsParaRenderizar.map((plancha, idx) => {
              const propuestasFiltradas = getFilteredPropuestas(plancha)
              const totalVisible = getTotalPropuestasVisibles(plancha)
              const esCongresista = (
                plancha as Plancha & { _esCongresista?: boolean }
              )._esCongresista
              const candidatoOriginal = (
                plancha as Plancha & { _candidatoOriginal?: Candidato }
              )._candidatoOriginal

              return (
                <div
                  key={plancha.id}
                  className="sticky top-24 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white"
                >
                  {/* Header */}
                  <div
                    className="border-b border-slate-200 p-6"
                    style={{ backgroundColor: `${plancha.color}15` }}
                  >
                    <div className="mb-4 flex flex-col items-center text-center">
                      {!esCongresista && (
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop"
                          alt={plancha.presidente.nombre}
                          loading="lazy"
                          className="mb-3 h-24 w-24 rounded-full object-cover ring-4 ring-white"
                        />
                      )}
                      {esCongresista && candidatoOriginal && (
                        <div className="bg-primary/10 text-primary mb-3 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold">
                          {candidatoOriginal.avatar}
                        </div>
                      )}
                      <div className="mb-2">
                        <div className="relative mx-auto mb-2 h-10 w-10">
                          <div
                            className="absolute inset-0 flex items-center justify-center rounded text-sm font-semibold text-white"
                            style={{ backgroundColor: plancha.color }}
                          >
                            {getSiglas(plancha.partido)}
                          </div>
                          <img
                            src={`/assets/${plancha.partidoId}.png`}
                            alt={`${plancha.partido} logo`}
                            className="absolute inset-0 h-10 w-10 rounded object-cover"
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement>
                            ) => {
                              const img = e.currentTarget as HTMLImageElement
                              img.style.display = 'none'
                            }}
                          />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {plancha.presidente.nombre}
                      </h3>
                      <p className="mb-1 text-xs text-slate-600">
                        {esCongresista && candidatoOriginal
                          ? `${candidatoOriginal.profesion}, ${candidatoOriginal.edad} años`
                          : `Vicepresidente: ${plancha.vicepresidente.nombre}`}
                      </p>
                      <p className="text-sm" style={{ color: plancha.color }}>
                        {plancha.partido}
                      </p>
                      {esCongresista && candidatoOriginal && (
                        <div className="mt-2 flex flex-wrap justify-center gap-2">
                          <Badge
                            style={{
                              backgroundColor: plancha.color,
                              color: '#fff',
                            }}
                          >
                            N° {plancha.numero}
                          </Badge>
                          {candidatoOriginal.region && (
                            <Badge variant="secondary" className="text-xs">
                              {candidatoOriginal.region}
                            </Badge>
                          )}
                          {candidatoOriginal.tipoSenador && (
                            <Badge variant="outline" className="text-xs">
                              {candidatoOriginal.tipoSenador === 'nacional'
                                ? 'Nacional'
                                : 'Regional'}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    {hasActiveFilters && (
                      <div className="text-center">
                        <Badge variant="outline">
                          {totalVisible}{' '}
                          {esCongresista ? 'experiencias' : 'propuestas'}{' '}
                          coinciden
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Propuestas / Experiencia */}
                  <div
                    className="max-h-[600px] space-y-6 overflow-y-auto px-6"
                    ref={(el) => {
                      if (el && !esCongresista)
                        scrollContainersRef.current[idx] = el
                    }}
                  >
                    {esCongresista ? (
                      // Para congresistas, mostrar toda la experiencia sin scroll sincronizado
                      <>
                        {totalVisible > 0 ? (
                          <div>
                            <h4 className="sticky top-0 mb-3 flex items-center gap-2 border-b border-slate-100 bg-white py-2 font-semibold text-slate-700">
                              <span className="text-lg">💼</span>
                              Experiencia
                            </h4>
                            <ul className="space-y-3">
                              {Object.values(propuestasFiltradas)
                                .flat()
                                .map((exp) => (
                                  <li
                                    key={`${plancha.id}-${exp.substring(0, 20)}`}
                                    className="border-l-3 pl-4 text-sm text-slate-600"
                                    style={{
                                      borderColor: plancha.color,
                                      borderLeftWidth: '3px',
                                    }}
                                  >
                                    {exp}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="py-8 text-center text-slate-500">
                            <p>
                              {searchTerm
                                ? 'No se encontró experiencia que coincida con tu búsqueda'
                                : 'Sin experiencia registrada'}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      // Para planchas, mantener el formato por temas con scroll sincronizado
                      <>
                        {Object.entries(propuestasFiltradas).map(
                          ([tema, propuestas]) => {
                            if (propuestas.length === 0) return null

                            const temaInfo = temas.find((t) => t.id === tema)
                            return (
                              <div key={tema}>
                                <h4 className="sticky top-0 mb-3 flex items-center gap-2 border-b border-slate-100 bg-white py-2 font-semibold text-slate-700">
                                  <span className="text-lg">
                                    {temaInfo?.icon}
                                  </span>
                                  {temaInfo?.label}
                                </h4>
                                <ul className="space-y-3">
                                  {propuestas.map((propuesta) => (
                                    <li
                                      key={`${tema}-${propuesta}`}
                                      className="border-l-3 pl-4 text-sm text-slate-600"
                                      style={{
                                        borderColor: plancha.color,
                                        borderLeftWidth: '3px',
                                      }}
                                    >
                                      {propuesta}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }
                        )}

                        {totalVisible === 0 && hasActiveFilters && (
                          <div className="py-8 text-center text-slate-500">
                            <p>
                              No se encontraron propuestas que coincidan con tu
                              búsqueda
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mensaje si no hay resultados */}
        {hasActiveFilters &&
          itemsParaRenderizar.every(
            (p) => getTotalPropuestasVisibles(p) === 0
          ) && (
            <div className="rounded-2xl bg-white py-16 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-slate-900">
                No se encontraron{' '}
                {esComparacionCongreso ? 'experiencias' : 'propuestas'}
              </h3>
              <p className="mb-6 text-slate-600">
                Intenta con otra palabra clave o cambia los filtros
              </p>
              <Button onClick={clearFilters} variant="outline">
                Limpiar Filtros
              </Button>
            </div>
          )}
      </main>
    </div>
  )
}
