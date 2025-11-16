// src/pages/Soy_Elector/Marco_Legal.tsx

import React from 'react'
// 1. Importamos Link y la flecha para el header de móvil
import { Link } from '@tanstack/react-router'
import * as Accordion from '@radix-ui/react-accordion'
import {
  FaGavel,
  FaChevronDown,
  FaBook,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaArrowLeft, // <-- ¡Icono para el botón de atrás!
} from 'react-icons/fa'

// ... (El 'type TemaLegal' y 'const temasLegales' no cambian) ...
type TemaLegal = {
  id: string
  titulo: string
  icono: React.ElementType
  contenido: string
}

const temasLegales: TemaLegal[] = [
  {
    id: 'ley-general',
    titulo: 'Ley Orgánica de Elecciones (Ley N° 26859)',
    icono: FaBook,
    contenido:
      'Esta es la ley principal que regula todos los procesos electorales en el país, desde la convocatoria hasta la proclamación de resultados. Define los derechos y obligaciones de los ciudadanos, partidos políticos y organismos electorales.',
  },
  {
    id: 'delitos',
    titulo: 'Delitos Electorales',
    icono: FaExclamationTriangle,
    contenido:
      'Acciones que están prohibidas y son sancionadas por ley. Incluyen: suplantación de identidad, tomar fotos al voto (como vimos en Seguridad), destruir material electoral, y realizar propaganda en el día de la elección.',
  },
  {
    id: 'multas',
    titulo: 'Multas y Sanciones por No Votar',
    icono: FaMoneyBillWave,
    contenido:
      'El voto es obligatorio para todos los ciudadanos peruanos desde los 18 hasta los 70 años. No asistir a votar o no cumplir con el deber de ser miembro de mesa genera una multa económica. El monto de la multa varía según el distrito de residencia.',
  },
  {
    id: 'ley-seca',
    titulo: 'Ley Seca y Prohibiciones de Último Minuto',
    icono: FaGavel,
    contenido:
      'Desde 48 horas antes y hasta el mediodía del día siguiente a la elección, está prohibida la venta y consumo de bebidas alcohólicas en lugares públicos. También se prohíben los espectáculos públicos y las reuniones políticas durante este período.',
  },
]

// --- 2. Creamos un componente para el contenido ---
//    (Así no repetimos el código del acordeón)
const ContenidoPagina: React.FC = () => (
  <div className="max-w-4xl">
    {/* 'type="multiple"' permite abrir varios a la vez */}
    <Accordion.Root type="multiple" className="space-y-4">
      {temasLegales.map((tema) => (
        <Accordion.Item
          key={tema.id}
          value={tema.id}
          className="bg-card border-border overflow-hidden rounded-lg border shadow-md"
        >
          {/* El Título Clickeable */}
          <Accordion.Trigger className="hover:bg-accent/50 group flex w-full items-center justify-between p-6 text-left transition-colors">
            <div className="flex items-center gap-4">
              <tema.icono className="text-primary text-2xl" />
              <span className="text-foreground text-xl font-semibold">
                {tema.titulo}
              </span>
            </div>
            {/* La flecha que gira */}
            <FaChevronDown className="text-primary transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>

          {/* El Contenido que se expande */}
          <Accordion.Content className="text-muted-foreground border-border data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden border-t p-6 pt-0 text-lg">
            {tema.contenido}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>
)

const PaginaMarcoLegal: React.FC = () => {
  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE PC (Renderiza dentro del layout padre) */}
      {/* ========================================================== */}
      <div className="hidden md:block">
        {/* Título y Descripción (Solo para PC) */}
        <h1 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
          Marco Legal
        </h1>
        <p className="text-muted-foreground mb-10 max-w-3xl text-lg">
          Conoce las leyes y regulaciones más importantes que rigen esta jornada
          electoral. Estar informado es tu derecho y deber.
        </p>

        {/* Renderiza el contenido */}
        <ContenidoPagina />
      </div>

      {/* ========================================================== */}
      {/* 2. UI DE MÓVIL (Layout propio) */}
      {/* ========================================================== */}
      <div className="bg-background min-h-screen md:hidden">
        {/* Header de Móvil con FLECHA ATRÁS */}
        <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg">
          <Link
            to="/elector" // Link de regreso al menú principal de móvil
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver"
          >
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Marco Legal</h1>
        </header>

        {/* Contenido de Móvil */}
        <main className="p-6">
          {/* Renderiza el mismo contenido */}
          <ContenidoPagina />
        </main>
      </div>
    </>
  )
}

export default PaginaMarcoLegal
