// src/routes/elector.candidatos.index.tsx

import { createFileRoute } from '@tanstack/react-router'
// 1. Importamos Accordion de Radix (que tienes en tu package.json)
import * as Accordion from '@radix-ui/react-accordion'
import { FaSearch, FaFilter, FaChevronDown } from 'react-icons/fa'

// --- Datos Falsos (Mock Data) ---
const partidos = [
  { id: 'ppn', nombre: 'Partido Progreso Nacional', color: 'bg-primary' },
  { id: 'fd', nombre: 'Frente Democrático', color: 'bg-green-500' },
  { id: 'upc', nombre: 'Unión por el Cambio', color: 'bg-purple-500' },
]
const candidatos = [
  {
    id: 'c1',
    nombre: 'María González',
    partido: 'Partido Progreso Nacional',
    img: 'https://via.placeholder.com/100',
  },
  {
    id: 'c2',
    nombre: 'Carlos Mendoza',
    partido: 'Frente Democrático',
    img: 'https://via.placeholder.com/100',
  },
  {
    id: 'c3',
    nombre: 'Ana Flores',
    partido: 'Unión por el Cambio',
    img: 'https://via.placeholder.com/100',
  },
]
// ---

function PaginaCandidatosLista() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* --- Barra de Búsqueda --- */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar candidato o partido..."
          className="bg-card border-border w-full rounded-lg border p-4 pl-12 shadow-md"
        />
        <FaSearch className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2" />
      </div>

      {/* --- Acordeón de Filtros --- */}
      <Accordion.Root type="single" collapsible className="mb-6 w-full">
        <Accordion.Item
          value="filtros"
          className="bg-card border-border rounded-lg border shadow-md"
        >
          <Accordion.Trigger className="text-foreground hover:bg-accent/50 flex w-full items-center justify-between p-4 text-lg font-semibold">
            <div className="flex items-center gap-3">
              <FaFilter className="text-primary" />
              Filtros avanzados
            </div>
            <FaChevronDown className="transition-transform duration-300" />
          </Accordion.Trigger>
          <Accordion.Content className="border-border border-t p-4 pt-0">
            {/* Filtro Zona Geográfica */}
            <div className="mb-4">
              <h4 className="text-foreground mb-2 font-semibold">
                Zona geográfica
              </h4>
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary text-primary-foreground rounded-full px-4 py-1">
                  Todas
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Lima
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Norte
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Sur
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Centro
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Oriente
                </button>
              </div>
            </div>
            {/* Filtro Tema de Interés */}
            <div>
              <h4 className="text-foreground mb-2 font-semibold">
                Tema de interés
              </h4>
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary text-primary-foreground rounded-full px-4 py-1">
                  Todos
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Educación
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Seguridad
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Economía
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Salud
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Transporte
                </button>
                <button className="bg-card text-muted-foreground border-border hover:bg-accent rounded-full border px-4 py-1">
                  Empleo
                </button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      {/* --- Lista de Partidos --- */}
      <div className="mb-8">
        <h3 className="text-foreground mb-3 text-xl font-bold">
          Partidos Políticos
        </h3>
        <div className="space-y-3">
          {partidos.map((partido) => (
            <div
              key={partido.id}
              className="bg-card border-border hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 ${partido.color} rounded-lg`}></div>
                <span className="text-foreground text-lg font-semibold">
                  {partido.nombre}
                </span>
              </div>
              <FaChevronDown className="text-muted-foreground -rotate-90" />
            </div>
          ))}
        </div>
      </div>

      {/* --- Lista de Candidatos --- */}
      <div>
        <h3 className="text-foreground mb-3 text-xl font-bold">
          Candidatos Presidenciales
        </h3>
        <div className="space-y-3">
          {candidatos.map((c) => (
            <div
              key={c.id}
              className="bg-card border-border hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={c.img}
                  alt={c.nombre}
                  className="h-14 w-14 rounded-full"
                />
                <div>
                  <p className="text-foreground text-lg font-bold">
                    {c.nombre}
                  </p>
                  <p className="text-md text-muted-foreground">{c.partido}</p>
                </div>
              </div>
              <FaChevronDown className="text-muted-foreground -rotate-90" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Definimos la ruta hija (index)
export const Route = createFileRoute('/elector/candidatos/')({
  component: PaginaCandidatosLista,
})
