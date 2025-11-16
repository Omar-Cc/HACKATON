// src/routes/elector.candidatos.comparar.tsx

import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
// 1. Importamos Checkbox de Radix
import * as Checkbox from '@radix-ui/react-checkbox'
import {
  Check,
  Book,
  Shield,
  TrendingUp,
  Briefcase,
  Bus,
  Heart,
} from 'lucide-react'

// --- Datos Falsos (Mock Data) ---
const candidatos = [
  {
    id: 'c1',
    nombre: 'María González',
    partido: 'Partido Progreso Nacional',
    color: 'border-blue-500',
  },
  {
    id: 'c2',
    nombre: 'Carlos Mendoza',
    partido: 'Frente Democrático',
    color: 'border-green-500',
  },
  {
    id: 'c3',
    nombre: 'Ana Flores',
    partido: 'Unión por el Cambio',
    color: 'border-purple-500',
  },
]
const temas = [
  { id: 'todos', nombre: 'Todos', icono: null },
  { id: 'edu', nombre: 'Educación', icono: Book },
  { id: 'seg', nombre: 'Seguridad', icono: Shield },
  { id: 'eco', nombre: 'Economía', icono: TrendingUp },
  { id: 'sal', nombre: 'Salud', icono: Heart },
  { id: 'tra', nombre: 'Transporte', icono: Bus },
  { id: 'emp', nombre: 'Empleo', icono: Briefcase },
]
const propuestas = [
  {
    candidatoId: 'c1',
    tema: 'edu',
    texto: 'Aumentar presupuesto de educación al 6% del PBI',
  },
  {
    candidatoId: 'c2',
    tema: 'edu',
    texto: 'Reforma curricular con habilidades del siglo XXI',
  },
  {
    candidatoId: 'c1',
    tema: 'seg',
    texto: 'Instalar 10,000 cámaras de vigilancia',
  },
  {
    candidatoId: 'c2',
    tema: 'seg',
    texto: 'Patrullaje integrado policía y serenazgo',
  },
  {
    candidatoId: 'c3',
    tema: 'seg',
    texto: 'Reformar el sistema judicial contra la corrupción',
  },
]
// ---

function PaginaCompararPropuestas() {
  // Estado para los candidatos seleccionados (IDs)
  const [selectedCandidatos, setSelectedCandidatos] = useState<string[]>([
    'c1',
    'c2',
  ])
  // Estado para el tema seleccionado (ID)
  const [selectedTema, setSelectedTema] = useState<string>('todos')

  // Lógica para manejar la selección de candidatos (máx 3)
  const handleSelectCandidato = (id: string) => {
    setSelectedCandidatos((prev) => {
      const isSelected = prev.includes(id)
      if (isSelected) {
        // Deseleccionar
        return prev.filter((cId) => cId !== id)
      } else {
        // Seleccionar (si no hemos llegado al límite)
        if (prev.length < 3) {
          return [...prev, id]
        }
      }
      return prev // No hacer nada si se excede el límite
    })
  }

  // Filtrar las propuestas que se mostrarán
  const propuestasFiltradas = propuestas.filter(
    (p) =>
      selectedCandidatos.includes(p.candidatoId) &&
      (selectedTema === 'todos' || p.tema === selectedTema)
  )

  // Agrupar propuestas por tema
  const propuestasAgrupadas = propuestasFiltradas.reduce(
    (acc, p) => {
      ;(acc[p.tema] = acc[p.tema] || []).push(p)
      return acc
    },
    {} as Record<string, typeof propuestas>
  )

  return (
    <div className="mx-auto max-w-4xl">
      {/* --- Selección de Candidatos --- */}
      <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
        <h3 className="text-foreground mb-4 text-xl font-bold">
          Selecciona candidatos
        </h3>
        <div className="space-y-3">
          {candidatos.map((c) => {
            const isSelected = selectedCandidatos.includes(c.id)
            return (
              <button
                key={c.id}
                onClick={() => handleSelectCandidato(c.id)}
                className={`flex w-full items-center rounded-lg border-2 p-4 transition-all ${isSelected ? `${c.color} bg-accent/50` : `border-border bg-card hover:bg-accent/30`} `}
              >
                <Checkbox.Root
                  checked={isSelected}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md border-2"
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <div className="ml-4 text-left">
                  <p className="text-foreground text-lg font-bold">
                    {c.nombre}
                  </p>
                  <p className="text-md text-muted-foreground">{c.partido}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* --- Filtro por Tema --- */}
      <div className="bg-card border-border mb-8 rounded-lg border p-6 shadow-md">
        <h3 className="text-foreground mb-4 text-xl font-bold">
          Filtrar por tema
        </h3>
        <div className="flex flex-wrap gap-2">
          {temas.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTema(t.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${
                selectedTema === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-primary hover:bg-accent/80'
              } `}
            >
              {t.icono && React.createElement(t.icono)}
              {t.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* --- Resultados de Comparación --- */}
      <div className="space-y-6">
        {Object.entries(propuestasAgrupadas).map(([temaId, propuestas]) => (
          <div
            key={temaId}
            className="bg-card border-border rounded-lg border p-6 shadow-md"
          >
            <h3 className="text-foreground mb-4 text-xl font-bold capitalize">
              {temas.find((t) => t.id === temaId)?.nombre}
            </h3>
            <div className="space-y-4">
              {propuestas.map((p) => {
                const candidato = candidatos.find((c) => c.id === p.candidatoId)
                return (
                  <div
                    key={p.texto}
                    className={`bg-accent/30 rounded-lg border-l-4 p-4 ${candidato?.color}`}
                  >
                    <p className="text-foreground text-lg">{p.texto}</p>
                    <p className="text-primary mt-1 text-sm font-bold">
                      {candidato?.nombre}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Definimos la ruta hija
export const Route = createFileRoute('/elector/candidatos/comparar')({
  component: PaginaCompararPropuestas,
})
