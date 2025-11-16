// src/pages/Soy_Elector/Layout_Elector.tsx

import React from 'react'
import { Outlet, Link } from '@tanstack/react-router'
// import { Toaster } from 'sonner'; // <-- 1. ¡LÍNEA ELIMINADA!
import {
  Settings,
  MapPin,
  FileText,
  Laptop,
  BarChart2,
  Shield,
  Users,
  Gavel,
  Sparkles,
  Search,
} from 'lucide-react'
// Importamos el store y clsx (para accesibilidad)
import { useAccessibilityStore } from '../../store/accessibilityStore'
import clsx from 'clsx'

type OpcionMenu = {
  icono: React.ElementType
  texto: string
  path: string
}

const opciones: OpcionMenu[] = [
  { icono: Sparkles, texto: 'Match Electoral', path: '/elector/match' },
  { icono: Search, texto: 'Verificador de Info', path: '/elector/verificar' },
  { icono: MapPin, texto: 'Local de votación', path: '/elector/local' },
  { icono: FileText, texto: 'Cómo votar', path: '/elector/como-votar' },
  {
    icono: Laptop,
    texto: 'Simulador de votación',
    path: '/elector/simulador',
  },
  { icono: BarChart2, texto: 'Intención de voto', path: '/elector/intencion' },
  { icono: Shield, texto: 'Seguridad', path: '/elector/seguridad' },
  {
    icono: Users,
    texto: 'Candidatos y Partidos',
    path: '/elector/candidatos',
  },
  { icono: Gavel, texto: 'Marco Legal', path: '/elector/legal' },
]

const LayoutElector: React.FC = () => {
  // Leemos el estado de accesibilidad
  const { textSize, highContrast } = useAccessibilityStore()

  return (
    <>
      {/* ========================================================== */}
      {/* 1. LAYOUT DE PC (con clases de accesibilidad) */}
      {/* ========================================================== */}
      <div
        className={clsx('bg-background hidden min-h-screen flex-col md:flex', {
          'text-lg': textSize === 'grande',
          'text-xl': textSize === 'muy-grande',
          dark: highContrast,
        })}
      >
        {/* <Toaster ... /> */} {/* <-- 2. ¡LÍNEA ELIMINADA! */}
        {/* --- HEADER (Tu nuevo estilo) --- */}
        <header className="bg-primary text-primary-foreground p-6 pb-10 shadow-md">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-2xl font-bold md:text-3xl">
                  Hola, ciudadano
                </h1>
                <p className="text-lg opacity-95 md:text-xl">
                  ¿Qué necesitas saber hoy?
                </p>
              </div>

              {/* El Link a Ajustes */}
              <Link
                to="/elector/ajustes"
                className="hover:bg-primary-foreground/10 rounded-full p-3 transition-colors"
                aria-label="Configuración"
              >
                <Settings size={24} />
              </Link>
            </div>
          </div>
        </header>
        {/* --- CONTENEDOR PRINCIPAL (Tu nuevo estilo) --- */}
        <div className="flex w-full flex-1">
          {/* --- SIDEBAR (Tu nuevo estilo) --- */}
          <aside className="bg-card border-border flex w-80 shrink-0 flex-col border-r">
            <div className="border-border border-b p-6">
              <h2 className="text-card-foreground text-xl font-bold">
                Selecciona una opción del menú
              </h2>
            </div>
            <nav className="flex-1 p-2">
              <ul className="space-y-1">
                {opciones.map((opcion) => (
                  <li key={opcion.texto}>
                    <Link
                      to={opcion.path}
                      className="text-card-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary flex items-center border-l-4 border-transparent p-4 text-base font-medium transition-all"
                      activeProps={{
                        className:
                          'bg-accent text-accent-foreground border-l-4 border-primary font-semibold',
                      }}
                    >
                      <opcion.icono className="mr-4 h-5 w-5 shrink-0" />
                      <span className="text-lg">{opcion.texto}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* --- CONTENIDO PRINCIPAL (Tu nuevo estilo) --- */}
          <main className="bg-background min-h-0 flex-1 p-8 md:p-12">
            <Outlet />
          </main>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. LAYOUT DE MÓVIL (con clases de accesibilidad) */}
      {/* ========================================================== */}
      <div
        className={clsx('md:hidden', {
          'text-lg': textSize === 'grande',
          'text-xl': textSize === 'muy-grande',
          dark: highContrast,
        })}
      >
        {/* <Toaster ... /> */} {/* <-- 3. ¡LÍNEA ELIMINADA! */}
        <Outlet />
      </div>
    </>
  )
}

export default LayoutElector
