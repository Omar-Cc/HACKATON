// src/pages/Soy_Elector/Local_Votacion.tsx

import React, { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import {
  MapPin,
  User,
  Lightbulb,
  Loader,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

type Resultado = {
  nombre: string
  dni: string
  local: string
  direccion: string
  mesa: string
  horario: string
}

// --- Componente de Contenido ---
const ContenidoPagina: React.FC = () => {
  const [resultado, setResultado] = useState<Resultado | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setResultado({
        nombre: 'Juan Alberto Pérez Rodríguez',
        dni: '****5678',
        local: 'Institución Educativa José María Eguren',
        direccion: 'Av. Los Álamos 245, Barranco',
        mesa: '042536',
        horario: '8:00 AM - 4:00 PM',
      })
    }, 1500)
  }, [])

  return (
    <>
      {resultado === null && (
        <div className="bg-card border-border flex items-center justify-center rounded-lg border p-12 shadow-md">
          <Loader className="text-primary mr-4 animate-spin text-2xl" />
          <p className="text-muted-foreground text-lg">
            Cargando tu información...
          </p>
        </div>
      )}

      {resultado && (
        <div className="mt-0 space-y-8">
          {/* Encabezado del Elector */}
          <div className="bg-card border-primary/20 overflow-hidden rounded-lg border shadow-xl">
            <div className="bg-accent border-primary/20 border-b p-6">
              <div className="flex items-center">
                <User className="text-primary text-3xl" />
                <div className="ml-4">
                  <p className="text-primary text-sm font-semibold">ELECTOR</p>
                  <p className="text-foreground text-2xl font-bold">
                    {resultado.nombre}
                  </p>
                  <p className="text-muted-foreground text-lg">
                    DNI: {resultado.dni}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- Layout de 2 Columnas (Mapa + Detalles) - En PC --- */}
          <div className="hidden grid-cols-1 gap-8 md:grid lg:grid-cols-2">
            {/* Columna 1: Mapa (REAL) */}
            <div className="bg-card h-full min-h-[500px] overflow-hidden rounded-lg shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.5601951564756!2d-77.01954568518668!3d-12.141525991402263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b810b1007809%3A0x411d5f71e863641b!2sI.E.%20Jos%C3%A9%20Mar%C3%ADa%20Eguren!5e0!3m2!1ses-419!2spe!4v1678888888888!5m2!1ses-419!2spe"
                className="h-full w-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa del local de votación"
              ></iframe>
            </div>

            {/* Columna 2: Detalles */}
            <div className="flex flex-col gap-6">
              <div className="bg-card rounded-lg p-8 shadow-xl">
                <div className="flex">
                  <MapPin className="text-primary mt-1 text-3xl" />
                  <div className="ml-5">
                    <p className="text-muted-foreground text-sm font-semibold">
                      Dirección
                    </p>
                    <h3 className="text-foreground text-2xl font-bold">
                      {resultado.local}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {resultado.direccion}
                    </p>
                  </div>
                </div>
                <hr className="border-border my-6" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm font-semibold">
                      Número de Mesa
                    </p>
                    <p className="text-foreground text-xl font-bold">
                      Mesa N° {resultado.mesa}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-semibold">
                      Horario
                    </p>
                    <p className="text-foreground text-xl font-bold">
                      {resultado.horario}
                    </p>
                  </div>
                </div>
              </div>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center rounded-lg p-4 text-lg font-semibold transition-colors">
                <ArrowRight className="mr-2" size={20} />
                Ver ubicación exacta
              </button>
              <div className="bg-accent flex items-start gap-3 rounded-lg p-5">
                <Lightbulb className="text-primary shrink-0 text-2xl" />
                <p className="text-muted-foreground font-medium">
                  Recuerda: Llega con anticipación y lleva tu DNI original. El
                  local abre a las 8:00 AM.
                </p>
              </div>
            </div>
          </div>

          {/* --- Layout de 1 Columna (Mapa + Detalles) - En MÓVIL --- */}
          <div className="block space-y-6 md:hidden">
            {/* Mapa (REAL) */}
            <div className="bg-card h-[300px] overflow-hidden rounded-lg shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.5601951564756!2d-77.01954568518668!3d-12.141525991402263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b810b1007809%3A0x411d5f71e863641b!2sI.E.%20Jos%C3%A9%20Mar%C3%ADa%20Eguren!5e0!3m2!1ses-419!2spe!4v1678888888888!5m2!1ses-419!2spe"
                className="h-full w-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa del local de votación"
              ></iframe>
            </div>
            {/* Detalles */}
            <div className="bg-card rounded-lg p-6 shadow-xl">
              <div className="flex">
                <MapPin className="text-primary mt-1 text-3xl" />
                <div className="ml-5">
                  <p className="text-muted-foreground text-sm font-semibold">
                    Dirección
                  </p>
                  <h3 className="text-foreground text-2xl font-bold">
                    {resultado.local}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {resultado.direccion}
                  </p>
                </div>
              </div>
              <hr className="border-border my-6" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm font-semibold">
                    Número de Mesa
                  </p>
                  <p className="text-foreground text-xl font-bold">
                    Mesa N° {resultado.mesa}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-semibold">
                    Horario
                  </p>
                  <p className="text-foreground text-xl font-bold">
                    {resultado.horario}
                  </p>
                </div>
              </div>
            </div>
            {/* Botón */}
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center rounded-lg p-4 text-lg font-semibold transition-colors">
              <ArrowRight className="mr-2" size={20} />
              Ver ubicación exacta
            </button>
            {/* Alerta */}
            <div className="bg-accent flex items-start gap-3 rounded-lg p-5">
              <Lightbulb className="text-primary shrink-0 text-2xl" />
              <p className="text-muted-foreground font-medium">
                Recuerda: Llega con anticipación y lleva tu DNI original. El
                local abre a las 8:00 AM.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// --- Renderizamos el Layout Responsivo ---
const PaginaLocalVotacion: React.FC = () => {
  return (
    <>
      {/* --- UI DE PC --- */}
      <div className="hidden md:block">
        <h1 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
          Tu Local de Votación
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl text-lg">
          Aquí puedes ver los detalles de tu local de votación asignado. Esta
          información se ha cargado automáticamente desde tu cuenta.
        </p>
        <ContenidoPagina />
      </div>

      {/* --- UI DE MÓVIL --- */}
      <div className="bg-background min-h-screen md:hidden">
        <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg">
          {/* ✅ CORRECCIÓN: Cambiado de '/elector/local' a '/elector' */}
          <Link
            to="/elector" // ← ¡AQUÍ ESTÁ LA CORRECCIÓN!
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver al menú principal"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Tu Local de Votación</h1>
        </header>
        <main className="p-6">
          <ContenidoPagina />
        </main>
      </div>
    </>
  )
}

export default PaginaLocalVotacion
