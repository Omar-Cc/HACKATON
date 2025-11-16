// src/pages/Soy_Elector/Ajustes.tsx

import React from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Settings,
  CheckCircle,
  Lightbulb,
  Type,
  Sun,
  User,
} from 'lucide-react'
// Importamos el Switch de Radix
import * as Switch from '@radix-ui/react-switch'
// Importamos el store de Zustand
import { useAccessibilityStore } from '../../store/accessibilityStore'
// Importamos clsx para clases dinámicas
import clsx from 'clsx'

// --- Componente de Contenido (para no repetir código) ---
const ContenidoPagina: React.FC = () => {
  // Leemos el estado Y las funciones para cambiarlo
  const { textSize, highContrast, setTextSize, setHighContrast } =
    useAccessibilityStore()

  return (
    // Usamos max-w-2xl para centrar y limitar el ancho
    <div className="mx-auto max-w-2xl space-y-8">
      {/* --- Alerta de Información --- */}
      <div className="bg-accent flex items-start gap-4 rounded-lg p-5">
        <User className="text-primary shrink-0 text-3xl" />
        <p className="text-muted-foreground font-medium">
          Estas opciones te ayudan a usar la aplicación de manera más cómoda
          según tus necesidades.
        </p>
      </div>

      {/* --- Sección: Tamaño de Texto --- */}
      <div className="bg-card border-border rounded-lg border p-6 shadow-md">
        <div className="mb-4 flex items-center gap-4">
          <Type className="text-primary text-2xl" />
          <div>
            <h3 className="text-foreground text-xl font-bold">
              Tamaño de texto
            </h3>
            <p className="text-md text-muted-foreground">
              Ajusta el tamaño de la letra
            </p>
          </div>
        </div>

        {/* Botones de selección de tamaño */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setTextSize('normal')}
            className={clsx(
              'w-full rounded-lg border-2 p-4 text-left text-lg font-semibold transition-all',
              textSize === 'normal'
                ? 'border-primary bg-accent text-accent-foreground'
                : 'border-border bg-card hover:bg-accent/50'
            )}
          >
            Normal
          </button>
          <button
            onClick={() => setTextSize('grande')}
            className={clsx(
              'w-full rounded-lg border-2 p-4 text-left text-lg font-semibold transition-all',
              textSize === 'grande'
                ? 'border-primary bg-accent text-accent-foreground'
                : 'border-border bg-card hover:bg-accent/50'
            )}
          >
            Grande
          </button>
          <button
            onClick={() => setTextSize('muy-grande')}
            className={clsx(
              'w-full rounded-lg border-2 p-4 text-left text-lg font-semibold transition-all',
              textSize === 'muy-grande'
                ? 'border-primary bg-accent text-accent-foreground'
                : 'border-border bg-card hover:bg-accent/50'
            )}
          >
            Muy grande
          </button>
        </div>
      </div>

      {/* --- Sección: Alto Contraste --- */}
      <div className="bg-card border-border rounded-lg border p-6 shadow-md">
        <div className="mb-4 flex items-center gap-4">
          <Sun className="text-primary text-2xl" />
          <div>
            <h3 className="text-foreground text-xl font-bold">Modo Oscuro</h3>
            <p className="text-md text-muted-foreground">
              Ayuda el descanso visual
            </p>
          </div>
        </div>

        {/* Switch Toggle de Radix */}
        <div
          className={clsx(
            'flex items-center justify-between rounded-lg border-2 p-4 transition-all',
            highContrast ? 'border-primary bg-accent' : 'border-border bg-card'
          )}
        >
          <span className="text-foreground text-lg font-semibold">
            {highContrast ? 'Activado' : 'Desactivado'}
          </span>
          <Switch.Root
            checked={highContrast}
            onCheckedChange={setHighContrast}
            className="data-[state=checked]:bg-primary relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-300 outline-none"
          >
            <Switch.Thumb className="block h-[21px] w-[21px] translate-x-[2px] rounded-full bg-white shadow-lg transition-transform duration-100 data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>
      </div>

      {/* --- Vista Previa --- */}
      <div
        className={clsx(
          'bg-card border-border rounded-lg border p-6 shadow-md',
          // Aplicamos las clases de texto aquí para la vista previa
          {
            'text-lg': textSize === 'grande',
            'text-xl': textSize === 'muy-grande',
          }
        )}
      >
        <h3 className="text-foreground mb-4 text-xl font-bold">Vista previa</h3>
        <p className="text-muted-foreground mb-4">
          Así se verá el texto con la configuración actual.
        </p>
        <div className="flex items-center gap-6 p-4">
          <button
            disabled
            className="bg-primary text-primary-foreground rounded-lg px-6 py-2 font-semibold"
          >
            Botón
          </button>
          <span className="text-foreground font-medium">Texto</span>
        </div>
      </div>

      {/* --- Más Opciones --- */}
      <div className="bg-card border-border rounded-lg border p-6 shadow-md">
        <h3 className="text-foreground mb-4 text-xl font-bold">
          Más opciones de accesibilidad
        </h3>
        <ul className="space-y-3">
          <li className="text-muted-foreground flex items-center gap-3 text-lg">
            <CheckCircle className="text-green-500" /> Iconografía clara y
            descriptiva
          </li>
          <li className="text-muted-foreground flex items-center gap-3 text-lg">
            <CheckCircle className="text-green-500" /> Navegación simplificada
          </li>
          <li className="text-muted-foreground flex items-center gap-3 text-lg">
            <CheckCircle className="text-green-500" /> Textos alternativos en
            imágenes
          </li>
          <li className="text-muted-foreground flex items-center gap-3 text-lg">
            <CheckCircle className="text-green-500" /> Compatible con lectores
            de pantalla
          </li>
        </ul>
      </div>

      {/* --- Consejo --- */}
      <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-5">
        <div className="flex items-start">
          <Lightbulb className="text-2xl text-yellow-500" />
          <div className="ml-4">
            <h3 className="text-xl font-bold text-yellow-700">Consejo</h3>
            <p className="text-lg text-yellow-600">
              Estas configuraciones se guardan automáticamente y se aplicarán en
              toda la aplicación.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Componente Principal (Renderizado Responsivo) ---
const PaginaAjustes: React.FC = () => {
  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE PC (Renderiza dentro del layout padre) */}
      {/* ========================================================== */}
      <div className="hidden md:block">
        <h1 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
          Accesibilidad
        </h1>
        <p className="text-muted-foreground mb-10 max-w-3xl text-lg">
          Personaliza tu experiencia para usar la aplicación más cómodamente.
        </p>
        <ContenidoPagina />
      </div>

      {/* ========================================================== */}
      {/* 2. UI DE MÓVIL (Layout propio) */}
      {/* ========================================================== */}
      <div className="bg-background min-h-screen md:hidden">
        {/* Header de Móvil con FLECHA ATRÁS */}
        <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg">
          <Link
            to="/elector"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <Settings size={22} />
            <h1 className="text-2xl font-bold">Accesibilidad</h1>
          </div>
        </header>

        {/* Contenido de Móvil */}
        <main className="p-6">
          <ContenidoPagina />
        </main>
      </div>
    </>
  )
}

export default PaginaAjustes
