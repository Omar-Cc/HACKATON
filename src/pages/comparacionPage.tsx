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

import { PLANCHAS } from '@/data/elecciones'

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
  /* const [planchas, setPlanchas] = useState<Plancha[]>([]) */
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
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n) && n > 0)
  }, [])

  const planchas = useMemo(() => {
    return planchasMock.filter((p) => selectedIds.includes(p.id))
  }, [selectedIds])

  useEffect(() => {
    if (planchas.length === 0) {
      navigate({ to: '/planchas-presidenciales' })
    }
  }, [planchas, navigate])
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

  // Filtrar propuestas por palabra clave y tema seleccionado
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
    const filtered = getFilteredPropuestas(plancha)
    return Object.values(filtered).flat().length
  }

  const hasActiveFilters = searchTerm.trim() !== '' || selectedTemas.length > 0

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Sticky sticky top-0 z-40 */}
      <header className="bg-linear-to-br from-blue-600 to-blue-700 shadow-lg">
        <div className="container mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8 lg:py-6">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => navigate({ to: '/planchas-presidenciales' })}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="mb-2 text-3xl leading-tight font-extrabold text-white lg:text-4xl">
              Comparación de Candidatos
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
                placeholder="Buscar propuesta por palabra clave (ej: Cusco, policía, hospital)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-0 py-3 pr-4 pl-12 transition-shadow focus:outline-none"
                style={{
                  backgroundColor: 'var(--input)',
                  color: 'var(--foreground)',
                }}
              />
            </div>

            {/* Filtro de Temas */}
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

            {/* Control para activar/desactivar sincronización de scroll (desktop) */}
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
        {hasActiveFilters && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              {planchas
                .map((p) => getTotalPropuestasVisibles(p))
                .reduce((a, b) => a + b, 0)}{' '}
              propuestas encontradas en total
            </p>
          </div>
        )}

        {/* Vista Mobile: Accordion */}
        <div className="space-y-4 lg:hidden">
          {planchas.map((plancha) => {
            const propuestasFiltradas = getFilteredPropuestas(plancha)
            const totalVisible = getTotalPropuestasVisibles(plancha)

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
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
                      alt={plancha.presidente.nombre}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
                    />
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

                      <Badge
                        className="mt-1"
                        style={{ backgroundColor: plancha.color }}
                      >
                        #{plancha.numero}
                      </Badge>
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <p className="text-xs text-slate-600">
                      {totalVisible} propuestas coinciden
                    </p>
                  )}
                </div>

                {/* Propuestas */}
                <div className="space-y-4 p-4">
                  {Object.entries(propuestasFiltradas).map(
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
              gridTemplateColumns: `repeat(${planchas.length}, minmax(350px, 1fr))`,
            }}
          >
            {planchas.map((plancha, idx) => {
              const propuestasFiltradas = getFilteredPropuestas(plancha)
              const totalVisible = getTotalPropuestasVisibles(plancha)

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
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop"
                        alt={plancha.presidente.nombre}
                        loading="lazy"
                        className="mb-3 h-24 w-24 rounded-full object-cover ring-4 ring-white"
                      />
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
                      <Badge
                        className="mb-2"
                        style={{ backgroundColor: plancha.color }}
                      >
                        Candidato #{plancha.numero}
                      </Badge>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {plancha.presidente.nombre}
                      </h3>
                      <p className="mb-1 text-xs text-slate-600">
                        Vicepresidente: {plancha.vicepresidente.nombre}
                      </p>
                      <p className="text-sm" style={{ color: plancha.color }}>
                        {plancha.partido}
                      </p>
                    </div>
                    {hasActiveFilters && (
                      <div className="text-center">
                        <Badge variant="outline">
                          {totalVisible} propuestas coinciden
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Propuestas */}
                  <div
                    className="max-h-[600px] space-y-6 overflow-y-auto px-6"
                    ref={(el) => {
                      if (el) scrollContainersRef.current[idx] = el
                    }}
                  >
                    {Object.entries(propuestasFiltradas).map(
                      ([tema, propuestas]) => {
                        if (propuestas.length === 0) return null

                        const temaInfo = temas.find((t) => t.id === tema)
                        return (
                          <div key={tema}>
                            <h4 className="sticky top-0 mb-3 flex items-center gap-2 border-b border-slate-100 bg-white py-2 font-semibold text-slate-700">
                              <span className="text-lg">{temaInfo?.icon}</span>
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
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mensaje si no hay resultados */}
        {hasActiveFilters &&
          planchas.every((p) => getTotalPropuestasVisibles(p) === 0) && (
            <div className="rounded-2xl bg-white py-16 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-slate-900">
                No se encontraron propuestas
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
