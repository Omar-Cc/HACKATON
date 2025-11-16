// src/pages/Soy_Elector/Layout_Elector.tsx

import React from 'react'
import { Outlet, Link, useMatchRoute } from '@tanstack/react-router'
import { Settings, ArrowRight } from 'lucide-react'
// Importamos las opciones centralizadas
import { opcionesMenuElector } from '@/data/menuElector'
// Importamos el store y clsx (para accesibilidad)
import { useAccessibilityStore } from '../../store/accessibilityStore'
import clsx from 'clsx'

const LayoutElector: React.FC = () => {
  // Leemos el estado de accesibilidad
  const { textSize, highContrast } = useAccessibilityStore()
  const matchRoute = useMatchRoute()

  // Verificamos si estamos en la ruta index de elector
  const isElectorIndex = matchRoute({ to: '/elector', fuzzy: false })

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
        {/* --- HEADER --- */}
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

        {/* --- CONTENEDOR PRINCIPAL --- */}
        <div className="flex w-full flex-1">
          {/* --- SIDEBAR --- */}
          <aside className="bg-card border-border flex w-80 shrink-0 flex-col border-r">
            <div className="border-border border-b p-6">
              <h2 className="text-card-foreground text-xl font-bold">
                Selecciona una opción del menú
              </h2>
            </div>
            <nav className="flex-1 p-2">
              <ul className="space-y-1">
                {opcionesMenuElector.map((opcion) => (
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

          {/* --- CONTENIDO PRINCIPAL --- */}
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
        {/* Si estamos en /elector (index), mostramos el menú móvil */}
        {isElectorIndex ? (
          <div className="bg-background min-h-screen">
            {/* Header de Móvil */}
            <header className="bg-primary text-primary-foreground flex items-start justify-between rounded-b-[30px] p-6 pb-8 shadow-lg">
              <div>
                <h1 className="text-3xl font-bold">Hola, ciudadano</h1>
                <p className="mt-1 text-lg opacity-90">
                  ¿Qué necesitas saber hoy?
                </p>
              </div>

              {/* Link a Ajustes */}
              <Link
                to="/elector/ajustes"
                className="rounded-full p-2 transition-colors hover:bg-white/10"
                aria-label="Configuración"
              >
                <Settings size={24} />
              </Link>
            </header>

            {/* Lista de Opciones de Móvil */}
            <main className="-mt-10 p-6">
              <div className="space-y-4">
                {opcionesMenuElector.map((opcion) => (
                  <Link
                    key={opcion.texto}
                    to={opcion.path}
                    className="bg-card flex items-center rounded-2xl p-5 shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <opcion.icono className="text-primary mr-4 text-2xl" />
                    <span className="text-foreground flex-1 text-lg font-semibold">
                      {opcion.texto}
                    </span>
                    <ArrowRight className="text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </main>
          </div>
        ) : (
          /* Si NO estamos en /elector, mostramos el contenido de la subruta */
          <Outlet />
        )}
      </div>
    </>
  )
}

export default LayoutElector
