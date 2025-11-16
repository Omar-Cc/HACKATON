import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Search, Filter, GitCompare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Combobox } from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Candidato } from '@/types/candidatos'

// Mock data: candidatos de ejemplo
const MOCK_CANDIDATOS: Candidato[] = [
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

export default function ParlamentoAndinoTab() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedParties, setSelectedParties] = useState<string[]>([])
  const [selectedCandidatos, setSelectedCandidatos] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const MAX_COMPARACION = 3

  // Handlers para selección
  const toggleCandidato = (id: string) => {
    setSelectedCandidatos((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cId) => cId !== id)
      }
      if (prev.length < MAX_COMPARACION) {
        return [...prev, id]
      }
      return prev
    })
  }

  const clearSelection = () => {
    setSelectedCandidatos([])
  }

  // Filtrado de candidatos
  const filteredCandidatos = MOCK_CANDIDATOS.filter((c) => {
    const matchesSearch = c.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesParty =
      selectedParties.length === 0 || selectedParties.includes(c.partido.nombre)
    return matchesSearch && matchesParty
  })

  const partidos = [
    'Alianza para el Progreso',
    'Renovación Popular',
    'Fuerza Popular',
    'Perú Libre',
  ]
  const partidosOptions = partidos.map((p) => ({ value: p, label: p }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-start gap-3">
          <Filter className="text-primary mt-1 h-6 w-6" />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              Buscar Candidatos al Parlamento Andino
            </h2>
            <p className="text-primary mt-1 text-sm">
              5 representantes elegidos por distrito único nacional
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="search-input-pa"
              className="mb-2 block text-sm font-medium"
            >
              Buscar por nombre...
            </label>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="search-input-pa"
                type="text"
                placeholder="Buscar por nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="party-select-pa"
              className="mb-2 block text-sm font-medium"
            >
              Partido político
            </label>
            <Combobox
              id="party-select-pa"
              options={partidosOptions}
              value={selectedParties}
              onValueChange={(value) => setSelectedParties(value as string[])}
              placeholder="Seleccionar partidos..."
              searchPlaceholder="Buscar partido..."
              multiple
            />
          </div>
        </div>
      </div>

      {/* Lista de candidatos */}
      <div className="grid gap-4 md:grid-cols-4">
        {filteredCandidatos.map((candidato) => {
          const isSelected = selectedCandidatos.includes(candidato.id)
          const partidoColor = candidato.partido.color
          const partidoShort = candidato.partido.nombreCorto

          return (
            <Card
              key={candidato.id}
              className={`relative overflow-hidden ${isSelected ? 'ring-primary ring-2' : ''}`}
            >
              {/* Logo del partido como marca de agua */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5"
                style={{ zIndex: 0 }}
              >
                <span
                  className="text-9xl font-black"
                  style={{ color: partidoColor }}
                >
                  {partidoShort}
                </span>
              </div>

              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-start gap-3">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full font-semibold">
                      {candidato.avatar}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {candidato.nombre}
                      </CardTitle>
                      <CardDescription>
                        {candidato.profesion}, {candidato.edad} años
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="shrink-0">
                      #{candidato.id}
                    </Badge>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleCandidato(candidato.id)}
                      disabled={
                        !isSelected &&
                        selectedCandidatos.length >= MAX_COMPARACION
                      }
                      aria-label={`Seleccionar ${candidato.nombre} para comparar`}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      style={{ backgroundColor: partidoColor, color: '#fff' }}
                    >
                      {partidoShort}
                    </Badge>
                    <Badge variant="secondary">Distrito Nacional</Badge>
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-medium">Experiencia:</p>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      {candidato.experiencia.map((exp) => (
                        <li key={exp} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="mt-3 w-full" asChild>
                    <Link to="/candidato/$id" params={{ id: candidato.id }}>
                      Ver perfil completo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Estado vacío / mensaje */}
      <div className="bg-muted/30 rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">
          Estamos trabajando para traerte la lista completa de candidatos al
          Parlamento Andino. En la versión final podrás:
        </p>
        <ul className="text-muted-foreground mt-3 space-y-1 text-sm">
          <li>✓ Filtrar por partido político</li>
          <li>✓ Buscar por nombre de candidato</li>
          <li>✓ Ver el perfil detallado y su experiencia internacional</li>
          <li>✓ Comparar hasta 3 candidatos</li>
        </ul>
      </div>

      {/* Panel flotante de comparación */}
      {selectedCandidatos.length > 0 && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Card className="border-primary border-2 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <GitCompare className="text-primary h-5 w-5" />
                  <span className="font-semibold">
                    {selectedCandidatos.length} candidato
                    {selectedCandidatos.length > 1 ? 's' : ''} seleccionado
                    {selectedCandidatos.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Limpiar
                  </Button>
                  <Button
                    size="sm"
                    disabled={selectedCandidatos.length < 2}
                    onClick={() => setShowComparison(true)}
                  >
                    Comparar ({selectedCandidatos.length}/{MAX_COMPARACION})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de comparación */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompare className="text-primary h-6 w-6" />
              Comparación de Candidatos al Parlamento Andino
            </DialogTitle>
            <DialogDescription>
              Compara los perfiles y experiencia internacional de los candidatos
              seleccionados
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedCandidatos.map((candidatoId) => {
              const candidato = MOCK_CANDIDATOS.find(
                (c) => c.id === candidatoId
              )
              if (!candidato) return null

              const partidoColor = candidato.partido.color
              const partidoShort = candidato.partido.nombreCorto

              return (
                <Card key={candidato.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold">
                        {candidato.avatar}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">
                          {candidato.nombre}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {candidato.profesion}
                        </CardDescription>
                        <Badge variant="outline" className="mt-2">
                          {candidato.edad} años
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-2 text-sm font-semibold">
                        Partido Político
                      </p>
                      <Badge
                        style={{ backgroundColor: partidoColor, color: '#fff' }}
                        className="text-sm"
                      >
                        {partidoShort}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-2 text-sm font-semibold">
                        Distrito
                      </p>
                      <p className="text-sm">Nacional (CAN)</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-2 text-sm font-semibold">
                        Experiencia
                      </p>
                      <ul className="space-y-1 text-sm">
                        {candidato.experiencia.map((exp) => (
                          <li key={exp} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/candidato/$id" params={{ id: candidato.id }}>
                        Ver perfil completo
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
