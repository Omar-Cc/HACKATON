import {
  Search,
  ChevronLeft,
  SlidersHorizontal,
  X,
  MapPin,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { ImageWithFallback } from '@/components/imageWithFallback'
import { PLANCHAS } from '@/data/elecciones'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'

export interface Candidato {
  nombre: string
  foto: string
}

export interface Partido {
  id: string
  nombre: string
  siglas?: string
  logo?: string
  color?: string
}

export interface Plancha {
  id: number
  numero: string
  presidente: Candidato
  vicepresidente1: Candidato
  vicepresidente2: Candidato
  partido: Partido
  zona: string[]
  propuestas: {
    educacion: string[]
    salud: string[]
    seguridad: string[]
    economia: string[]
    medio_ambiente: string[]
  }
}

const planchas = PLANCHAS

const zonas = [
  { id: 'lima', label: 'Lima' },
  { id: 'cusco', label: 'Cusco' },
  { id: 'arequipa', label: 'Arequipa' },
  { id: 'la_libertad', label: 'La Libertad' },
  { id: 'piura', label: 'Piura' },
  { id: 'junin', label: 'Junín' },
  { id: 'puno', label: 'Puno' },
  { id: 'lambayeque', label: 'Lambayeque' },
  { id: 'cajamarca', label: 'Cajamarca' },
  { id: 'ancash', label: 'Áncash' },
  { id: 'loreto', label: 'Loreto' },
  { id: 'ica', label: 'Ica' },
  { id: 'huanuco', label: 'Huánuco' },
  { id: 'ucayali', label: 'Ucayali' },
  { id: 'san_martin', label: 'San Martín' },
  { id: 'tacna', label: 'Tacna' },
  { id: 'ayacucho', label: 'Ayacucho' },
  { id: 'apurimac', label: 'Apurímac' },
  { id: 'callao', label: 'Callao' },
  { id: 'moquegua', label: 'Moquegua' },
]

const temas = [
  { id: 'educacion', label: 'Educación', icon: '📚' },
  { id: 'salud', label: 'Salud', icon: '🏥' },
  { id: 'seguridad', label: 'Seguridad', icon: '🛡️' },
  { id: 'economia', label: 'Economía', icon: '💼' },
  { id: 'medio_ambiente', label: 'Medio Ambiente', icon: '🌱' },
]

export function PlanchasPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZonas, setSelectedZonas] = useState<string[]>([])
  const [selectedTemas, setSelectedTemas] = useState<string[]>([])
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>(
    []
  )

  const toggleZona = (zonaId: string) => {
    setSelectedZonas((prev) =>
      prev.includes(zonaId)
        ? prev.filter((z) => z !== zonaId)
        : [...prev, zonaId]
    )
  }

  const toggleTema = (temaId: string) => {
    setSelectedTemas((prev) =>
      prev.includes(temaId)
        ? prev.filter((t) => t !== temaId)
        : [...prev, temaId]
    )
  }

  const clearFilters = () => {
    setSelectedZonas([])
    setSelectedTemas([])
    setSearchTerm('')
  }

  const toggleComparison = (planchaId: number) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(planchaId)) {
        return prev.filter((id) => id !== planchaId)
      } else if (prev.length < 3) {
        return [...prev, planchaId]
      }
      return prev
    })
  }

  const filteredPlanchas = planchas.filter((plancha) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      plancha.presidente.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      plancha.partido.nombre.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesZona =
      selectedZonas.length === 0 ||
      selectedZonas.some((zona) => plancha.zona.includes(zona))

    const matchesTema =
      selectedTemas.length === 0 ||
      selectedTemas.every((tema) => {
        const propuestas =
          plancha.propuestas[tema as keyof typeof plancha.propuestas]
        return propuestas && propuestas.length > 0
      })

    return matchesSearch && matchesZona && matchesTema
  })

  const activeFiltersCount = selectedZonas.length + selectedTemas.length

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header - Responsive */}
      <header className="rounded-b-4xl bg-linear-to-br from-blue-600 to-blue-700 shadow-lg lg:rounded-none">
        <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 lg:py-8">
          <div className="mb-4 flex items-center justify-between lg:mb-6">
            <button className="mb-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              <Link to="/">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </button>
            <div className="text-center">
              <h1 className="mb-2 text-3xl leading-tight font-extrabold text-white lg:text-4xl">
                Candidatos Presidenciales 2026
              </h1>
              <p className="mb-6 text-sm text-white/90">
                Explora las planchas, compara propuestas y filtra por región o
                tema.
              </p>
            </div>
            <div className="w-10" />
          </div>

          <div className="max-w-2xl lg:max-w-none">
            {/* Search and Filters Container */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  aria-label="Buscar candidato o partido"
                  placeholder="Buscar candidato o partido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border-0 py-3 pr-4 pl-12 transition-shadow focus:outline-none"
                  style={{
                    backgroundColor: 'var(--input)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>

              {/* Filtros Avanzados Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label="Abrir filtros avanzados"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/30 lg:w-auto"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filtros avanzados</span>
                    {activeFiltersCount > 0 && (
                      <Badge className="bg-white text-blue-600">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtros Avanzados</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-6 ps-3">
                    {/* Filtro por Zona */}
                    <div>
                      <h3 className="mb-3">Departamentos</h3>
                      <div className="max-h-64 space-y-3 overflow-y-auto">
                        {zonas.map((zona) => {
                          const active = selectedZonas.includes(zona.id)
                          return (
                            <div
                              key={zona.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`zona-${zona.id}`}
                                checked={active}
                                onCheckedChange={() => toggleZona(zona.id)}
                              />
                              <Label
                                htmlFor={`zona-${zona.id}`}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1 text-sm"
                                style={{
                                  backgroundColor: active
                                    ? 'var(--primary)'
                                    : 'var(--muted)',
                                  color: active
                                    ? 'var(--primary-foreground)'
                                    : 'var(--muted-foreground)',
                                }}
                              >
                                {zona.label}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Filtro por Tema */}
                    <div>
                      <h3 className="mb-3">Temas de Interés</h3>
                      <div className="space-y-3">
                        {temas.map((tema) => {
                          const active = selectedTemas.includes(tema.id)
                          return (
                            <div
                              key={tema.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`tema-${tema.id}`}
                                checked={active}
                                onCheckedChange={() => toggleTema(tema.id)}
                              />
                              <Label
                                htmlFor={`tema-${tema.id}`}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1"
                                style={{
                                  backgroundColor: active
                                    ? 'var(--primary)'
                                    : 'var(--muted)',
                                  color: active
                                    ? 'var(--primary-foreground)'
                                    : 'var(--muted-foreground)',
                                }}
                              >
                                <span className="mr-1">{tema.icon}</span>
                                {tema.label}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Limpiar Filtros */}
                    {activeFiltersCount > 0 && (
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive Layout */}
      <main className="container mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 lg:py-10">
        {/* Contador y Active Filters */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <p
              className="text-sm text-slate-600 lg:text-base"
              aria-live="polite"
            >
              <span className="font-semibold">{filteredPlanchas.length}</span>{' '}
              de <span className="font-semibold">{planchas.length}</span>{' '}
              candidatos
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedZonas.map((zonaId) => {
                const zona = zonas.find((z) => z.id === zonaId)
                return (
                  <Badge
                    key={zonaId}
                    variant="secondary"
                    className="py-1 pr-2 pl-3"
                  >
                    {zona?.label}
                    <button
                      onClick={() => toggleZona(zonaId)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
              {selectedTemas.map((temaId) => {
                const tema = temas.find((t) => t.id === temaId)
                return (
                  <Badge
                    key={temaId}
                    variant="secondary"
                    className="py-1 pr-2 pl-3"
                  >
                    {tema?.icon} {tema?.label}
                    <button
                      onClick={() => toggleTema(temaId)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>

        {/* Candidatos - Responsive Grid */}
        <section>
          <h2 className="mb-4 text-lg text-slate-900 lg:text-xl">
            Todos los Candidatos
          </h2>

          {filteredPlanchas.length === 0 ? (
            <div className="rounded-2xl bg-white py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-slate-900">
                No se encontraron candidatos
              </h3>
              <p className="mb-6 text-slate-600">
                Intenta ajustar los filtros o la búsqueda
              </p>
              <Button onClick={clearFilters} variant="outline">
                Limpiar Filtros
              </Button>
            </div>
          ) : (
            <>
              {/* Mobile: Lista vertical */}
              <div className="space-y-3 lg:hidden">
                {filteredPlanchas.map((plancha) => (
                  <button
                    key={plancha.id}
                    onClick={() => toggleComparison(plancha.id)}
                    aria-pressed={selectedForComparison.includes(plancha.id)}
                    className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                      selectedForComparison.includes(plancha.id)
                        ? 'border-gray-500 bg-gray-50'
                        : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: 'var(--card)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
                          alt={plancha.presidente.nombre}
                          loading="lazy"
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-200"
                        />
                        <div
                          className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                          style={{ backgroundColor: plancha.partido.color }}
                        >
                          {plancha.numero}
                        </div>
                        {selectedForComparison.includes(plancha.id) && (
                          <div className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-900">
                          {plancha.presidente.nombre}
                        </p>
                        <p className="text-xs text-slate-600">
                          Vice: {plancha.vicepresidente1.nombre}
                        </p>
                        <p
                          className="mt-0.5 text-sm"
                          style={{ color: plancha.partido.color }}
                        >
                          {plancha.partido.nombre}{' '}
                          {plancha?.partido?.nombre?.trim() && (
                            <>- {plancha.partido.siglas}</>
                          )}
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {zonas.find((z) => z.id === plancha.zona[0])?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Desktop: Grid de Tarjetas */}
              <div className="hidden grid-cols-1 gap-6 md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4">
                {filteredPlanchas.map((plancha) => {
                  return (
                    <div
                      key={plancha.id}
                      className={`group relative overflow-hidden rounded-2xl border-2 transition-all hover:shadow-xl ${
                        selectedForComparison.includes(plancha.id)
                          ? 'scale-105 border-gray-500 shadow-lg'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      style={{ backgroundColor: 'var(--card)' }}
                    >
                      {/* Marca de agua: usar logo (imagen) cuando exista, fallback a siglas debajo */}
                      <div
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        style={{ zIndex: 0 }}
                        aria-hidden
                      >
                        {/* Siglas como fallback (debajo) */}
                        <span
                          className="text-9xl font-black"
                          style={{
                            color: plancha.partido.color,
                            opacity: 0.06,
                          }}
                        >
                          {plancha.partido?.siglas}
                        </span>

                        {/* Logo grande centrado si existe; si falla, se oculta y se ve la sigla */}
                        {plancha.partido?.logo && (
                          <img
                            src={
                              plancha.partido.logo.startsWith('http')
                                ? plancha.partido.logo
                                : `/assets/${plancha.partido.logo}`
                            }
                            alt={`${plancha.partido?.nombre} logo`}
                            className="absolute max-h-[60%] max-w-[60%] object-contain"
                            style={{ opacity: 0.18 }}
                            onError={(e) => {
                              ;(
                                e.currentTarget as HTMLImageElement
                              ).style.display = 'none'
                            }}
                          />
                        )}
                      </div>
                      {/* Header con color de partido */}
                      <div
                        className="h-2"
                        style={{ backgroundColor: plancha.partido.color }}
                      />

                      <div className="p-5">
                        {/* Header: nombre del partido (la marca de agua grande ya está en el fondo) */}
                        <div className="relative z-10 mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-white"
                              style={{ backgroundColor: plancha.partido.color }}
                            >
                              {plancha.partido?.siglas}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-900">
                                {plancha.partido?.nombre}
                                {plancha.partido?.siglas?.trim() && (
                                  <> - {plancha.partido.siglas}</>
                                )}
                              </p>
                            </div>
                          </div>
                          {selectedForComparison.includes(plancha.id) && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                              ✓
                            </div>
                          )}
                        </div>

                        {/* Plancha Completa - Presidente y Vicepresidentes */}
                        <div className="mb-4">
                          {/* Presidente */}
                          <div className="mb-3 flex items-center gap-3">
                            <div className="relative shrink-0">
                              <ImageWithFallback
                                src={plancha.presidente.foto}
                                alt={plancha.presidente.nombre}
                                loading="lazy"
                                className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-200"
                              />
                              <div
                                className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white"
                                style={{
                                  backgroundColor: plancha.partido.color,
                                }}
                              >
                                P
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="mb-0.5 text-xs tracking-wide text-slate-500 uppercase">
                                Presidente
                              </p>
                              <p className="truncate text-sm font-semibold text-slate-900">
                                {plancha.presidente.nombre}
                              </p>
                            </div>
                          </div>

                          {/* Vicepresidentes */}
                          <div className="flex gap-2">
                            {/* Vicepresidente 1 */}
                            <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-50 p-2">
                              <div className="relative shrink-0">
                                <ImageWithFallback
                                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
                                  alt={plancha.vicepresidente1.nombre}
                                  loading="lazy"
                                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                                />
                                <div
                                  className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold text-white"
                                  style={{
                                    backgroundColor: plancha.partido.color,
                                  }}
                                >
                                  1
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500">
                                  1° Vice
                                </p>
                                <p className="truncate text-xs font-medium text-slate-900">
                                  {plancha.vicepresidente1.nombre}
                                </p>
                              </div>
                            </div>

                            {/* Vicepresidente 2 */}
                            <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-50 p-2">
                              <div className="relative shrink-0">
                                <ImageWithFallback
                                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
                                  alt={plancha.vicepresidente2.nombre}
                                  loading="lazy"
                                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                                />
                                <div
                                  className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold text-white"
                                  style={{
                                    backgroundColor: plancha.partido.color,
                                  }}
                                >
                                  2
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500">
                                  2° Vice
                                </p>
                                <p className="truncate text-xs font-medium text-slate-900">
                                  {plancha.vicepresidente2.nombre}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Partido y Zona */}
                        <div className="mb-4">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {plancha.zona
                                .map(
                                  (z) =>
                                    zonas.find((zona) => zona.id === z)?.label
                                )
                                .slice(0, 2)
                                .join(', ')}
                            </span>
                            {plancha.zona.length > 2 && (
                              <span>+{plancha.zona.length - 2}</span>
                            )}
                          </div>
                        </div>

                        {/* Propuestas destacadas */}
                        <div className="mb-4 space-y-2">
                          <p className="text-xs tracking-wide text-slate-500 uppercase">
                            Propuestas destacadas:
                          </p>
                          <div className="space-y-1">
                            {Object.entries(plancha.propuestas)
                              .slice(0, 2)
                              .map(([tema, propuestas]) => (
                                <div
                                  key={tema}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-sm">
                                    {temas.find((t) => t.id === tema)?.icon}
                                  </span>
                                  <p className="line-clamp-2 text-xs text-slate-600">
                                    {propuestas[0]}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate({
                                to: '/candidato/$id',
                                params: { id: String(plancha.id) },
                              })
                            }
                            className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-700 transition-colors hover:bg-slate-200"
                          >
                            Ver perfil
                          </button>
                          <button
                            onClick={() => toggleComparison(plancha.id)}
                            aria-pressed={selectedForComparison.includes(
                              plancha.id
                            )}
                            aria-label={`${selectedForComparison.includes(plancha.id) ? 'Quitar' : 'Agregar'} ${plancha.presidente.nombre} de comparación`}
                            className={`flex-1 rounded-lg px-3 py-2 text-xs transition-colors ${
                              selectedForComparison.includes(plancha.id)
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                          >
                            {selectedForComparison.includes(plancha.id)
                              ? 'Seleccionado'
                              : 'Comparar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </section>
      </main>

      {/* Floating Action Button - Sticky Bottom */}
      {selectedForComparison.length > 0 && (
        <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-50 bg-linear-to-t from-slate-900 to-transparent p-4">
          <div className="pointer-events-auto container mx-auto max-w-7xl">
            <div className="flex items-center justify-between rounded-2xl bg-blue-600 p-4 text-white shadow-2xl transition-all hover:bg-blue-700">
              <div className="flex items-center gap-3">
                <div className="-gap-2 sm:-gap-2 flex flex-col items-center sm:flex-row">
                  {selectedForComparison.slice(0, 3).map((id) => {
                    const plancha = planchas.find((p) => p.id === id)
                    return (
                      <div
                        key={id}
                        className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white"
                      >
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
                          alt={plancha?.presidente.nombre || ''}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )
                  })}
                </div>
                <div>
                  <p className="font-semibold">
                    {selectedForComparison.length} candidato
                    {selectedForComparison.length > 1 ? 's' : ''} seleccionado
                    {selectedForComparison.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-blue-100">Máximo 3 candidatos</p>
                </div>
              </div>
              <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <button
                  onClick={() => setSelectedForComparison([])}
                  className="w-full rounded-xl bg-white/10 px-4 py-2 text-center transition-colors hover:bg-white/20"
                >
                  Limpiar
                </button>
                <button
                  onClick={() =>
                    navigate({
                      to: '/comparar',
                      search: { selectedIds: selectedForComparison.join(',') },
                    })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-50 sm:w-auto"
                >
                  <Users className="h-5 w-5" />
                  Comparar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-6 text-center md:px-6">
          <p className="text-sm text-slate-600">
            Información oficial de las Elecciones Generales 2025 - Perú
          </p>
        </div>
      </footer>
    </div>
  )
}
