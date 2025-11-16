// src/pages/Soy_Elector/Elector_principal.tsx

import React from 'react'
import { Link } from '@tanstack/react-router'
// Importamos todos los íconos necesarios
import {
  FaMapMarkerAlt,
  FaFileAlt,
  FaLaptopCode,
  FaPoll,
  FaShieldAlt,
  FaUsers,
  FaGavel,
  FaCog,
  FaHandPointLeft,
} from 'react-icons/fa'
import { ArrowRight } from 'lucide-react'

// --- (opcionesMobile no cambia) ---
const opcionesMobile = [
  { icono: FaMapMarkerAlt, texto: 'Local de votación', path: '/elector/local' },
  { icono: FaFileAlt, texto: 'Cómo votar', path: '/elector/como-votar' },
  {
    icono: FaLaptopCode,
    texto: 'Simulador de votación',
    path: '/elector/simulador',
  },
  { icono: FaPoll, texto: 'Intención de voto', path: '/elector/intencion' },
  { icono: FaShieldAlt, texto: 'Seguridad', path: '/elector/seguridad' },
  {
    icono: FaUsers,
    texto: 'Candidatos y Partidos',
    path: '/elector/candidatos',
  },
  { icono: FaGavel, texto: 'Marco Legal', path: '/elector/legal' },
]

const ElectorPrincipal: React.FC = () => {
  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE MÓVIL (Con el Link corregido) */}
      {/* ========================================================== */}
      <div className="bg-background min-h-screen md:hidden">
        {/* Header de Móvil */}
        <header className="bg-primary text-primary-foreground flex items-start justify-between rounded-b-[30px] p-6 pb-8 shadow-lg">
          <div>
            <h1 className="text-3xl font-bold">Hola, ciudadano</h1>
            <p className="mt-1 text-lg opacity-90">¿Qué necesitas saber hoy?</p>
          </div>

          {/* --- ✅ ¡AQUÍ ESTÁ LA CORRECCIÓN! --- */}
          {/* Cambiamos <button> por <Link> */}
          <Link
            to="/elector/ajustes" // <-- Navega a la página de Ajustes
            className="rounded-full p-2 transition-colors hover:bg-white/10"
            aria-label="Configuración"
          >
            <FaCog size={24} />
          </Link>
        </header>

        {/* Lista de Opciones de Móvil */}
        <main className="-mt-10 p-6">
          <div className="space-y-4">
            {opcionesMobile.map((opcion) => (
              <Link
                key={opcion.texto}
                to={opcion.path}
                className="bg-card flex items-center rounded-2xl p-5 shadow-md"
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

      {/* ========================================================== */}
      {/* 2. UI DE PC (Sin cambios) */}
      {/* ========================================================== */}
      <div className="bg-card hidden h-full w-full flex-col items-center justify-center p-8 md:flex">
        {/* Icono e indicación para desktop */}
        <div className="mb-8 hidden flex-col items-center md:flex">
          <div className="mb-6 flex items-center justify-center">
            <FaHandPointLeft className="text-primary mr-4 text-3xl" />
            <span className="text-primary text-xl font-semibold">
              Selecciona una opción del menú lateral
            </span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-card-foreground mb-6 text-4xl font-bold md:text-5xl">
            Bienvenido al Portal del Elector
          </h1>

          <p className="text-muted-foreground mb-12 text-xl leading-relaxed md:text-2xl">
            Toda la información que necesitas para tu jornada electoral está
            aquí.
          </p>

          {/* Tabla de características */}
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-accent border-border rounded-lg border p-6 text-center">
              <div className="text-accent-foreground mb-3 text-2xl font-bold">
                Información
              </div>
              <div className="text-muted-foreground">
                Datos actualizados y verificados
              </div>
            </div>

            <div className="bg-accent border-border rounded-lg border p-6 text-center">
              <div className="text-accent-foreground mb-3 text-2xl font-bold">
                Guías
              </div>
              <div className="text-muted-foreground">
                Instrucciones paso a paso
              </div>
            </div>

            <div className="bg-accent border-border rounded-lg border p-6 text-center">
              <div className="text-accent-foreground mb-3 text-2xl font-bold">
                Recursos
              </div>
              <div className="text-muted-foreground">Herramientas útiles</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ElectorPrincipal
