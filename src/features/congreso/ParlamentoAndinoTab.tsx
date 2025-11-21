import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
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
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { PartidoWatermark } from '@/components/ui/partido-watermark'
import type { Candidato } from '@/types/candidatos'
import { PARLAMENTO_ANDINO } from '@/data/elecciones'
import { PARTIDOS_POLITICOS } from '@/data/partidos'

export default function ParlamentoAndinoTab() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedParties, setSelectedParties] = useState<string[]>([])
  const [selectedCandidatos, setSelectedCandidatos] = useState<string[]>([])
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
  const filteredCandidatos = PARLAMENTO_ANDINO.filter((c: Candidato) => {
    const matchesSearch = c.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesParty =
      selectedParties.length === 0 || selectedParties.includes(c.partido.nombre)
    return matchesSearch && matchesParty
  })

  const partidos = PARTIDOS_POLITICOS.map((p) => p.nombre)
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
            <p className="text-muted-foreground mt-2 text-sm">
              5 representantes titulares y 10 suplentes por distrito único
              nacional • Periodo 2026-2031
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
              {/* Marca de agua del partido */}
              <PartidoWatermark
                logo={candidato.partido.logo}
                siglas={candidato.partido.nombreCorto}
                color={candidato.partido.color}
              />

              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={candidato.fotoPrincipal}
                        alt={candidato.nombre}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {candidato.avatar}
                      </AvatarFallback>
                    </Avatar>
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
                      #{candidato.numero}
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
              <CardContent className="relative z-10 h-full">
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
                </div>
              </CardContent>

              <CardFooter className="relative z-10">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/candidato/$id" params={{ id: candidato.id }}>
                    Ver perfil completo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
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
                    onClick={() => {
                      navigate({
                        to: '/comparar',
                        search: {
                          tipo: 'parlamento-andino',
                          selectedIds: selectedCandidatos.join(','),
                        },
                      })
                    }}
                  >
                    Comparar ({selectedCandidatos.length}/{MAX_COMPARACION})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
