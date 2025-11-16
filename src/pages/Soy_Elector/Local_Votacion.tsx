// src/pages/Soy_Elector/Local_Votacion.tsx

import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  MapPin,
  User,
  Lightbulb,
  Loader,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
  const [dni, setDni] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [error, setError] = useState('')

  // Función para abrir Google Maps con la dirección
  const abrirGoogleMapsConDireccion = () => {
    const direccion =
      'Institución Educativa José María Eguren, Av. Los Álamos 245, Barranco'
    const direccionCodificada = encodeURIComponent(direccion)
    const url = `https://www.google.com/maps/search/?api=1&query=${direccionCodificada}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Validar y buscar DNI
  const buscarLocalVotacion = () => {
    setError('')

    // Validar que sea un DNI de 8 dígitos
    if (dni.length !== 8 || !/^\d{8}$/.test(dni)) {
      setError('Por favor, ingresa un DNI válido de 8 dígitos')
      return
    }

    setIsLoading(true)

    // Simular búsqueda en base de datos
    setTimeout(() => {
      // Enmascarar DNI (mostrar solo últimos 4 dígitos)
      const dniEnmascarado = `****${dni.slice(-4)}`

      setResultado({
        nombre: 'Juan Alberto Pérez Rodríguez',
        dni: dniEnmascarado,
        local: 'Institución Educativa José María Eguren',
        direccion: 'Av. Los Álamos 245, Barranco',
        mesa: '042536',
        horario: '8:00 AM - 4:00 PM',
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Solo números
    if (value.length <= 8) {
      setDni(value)
      setError('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && dni.length === 8) {
      buscarLocalVotacion()
    }
  }

  return (
    <>
      {/* Formulario de búsqueda por DNI - Se muestra cuando NO hay resultado */}
      {!resultado && !isLoading && (
        <div className="mx-auto max-w-md space-y-6">
          <div className="bg-card rounded-lg border p-8 shadow-lg">
            <div className="mb-6 text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Search className="text-primary h-8 w-8" />
              </div>
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                Consulta tu Local de Votación
              </h2>
              <p className="text-muted-foreground text-sm">
                Ingresa tu número de DNI para conocer tu local de votación y
                número de mesa
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="dni"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Número de DNI
                </label>
                <Input
                  id="dni"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: 12345678"
                  value={dni}
                  onChange={handleDniChange}
                  onKeyPress={handleKeyPress}
                  maxLength={8}
                  className={`text-center text-lg ${error ? 'border-red-500' : ''}`}
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <Button
                onClick={buscarLocalVotacion}
                disabled={dni.length !== 8}
                className="w-full"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Buscar mi local
              </Button>
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>💡 Nota:</strong> Este es un servicio de consulta
                gratuito. Tu DNI solo se utiliza para buscar tu local de
                votación.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loader mientras busca - Se muestra después de dar click en buscar */}
      {isLoading && (
        <div className="bg-card border-border flex items-center justify-center rounded-lg border p-12 shadow-md">
          <Loader className="text-primary mr-4 animate-spin text-2xl" />
          <p className="text-muted-foreground text-lg">
            Buscando tu información...
          </p>
        </div>
      )}

      {/* Resultados - Se muestran después del loading */}
      {resultado && !isLoading && (
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

              {/* Botón con funcionalidad Google Maps */}
              <button
                onClick={abrirGoogleMapsConDireccion}
                className="bg-primary text-primary-foreground hover:bg-primary/90 group flex w-full items-center justify-center rounded-lg p-4 text-lg font-semibold transition-colors"
              >
                <ArrowRight
                  className="mr-2 transition-transform group-hover:translate-x-1"
                  size={20}
                />
                Ver ubicación exacta en Google Maps
                <ExternalLink className="ml-2 text-sm" size={16} />
              </button>

              <div className="bg-accent flex items-start gap-3 rounded-lg p-5">
                <Lightbulb className="text-primary shrink-0 text-2xl" />
                <p className="text-muted-foreground font-medium">
                  Recuerda: Llega con anticipación y lleva tu DNI original. El
                  local abre a las 8:00 AM.
                </p>
              </div>

              {/* Información adicional para desktop */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Al hacer clic en el botón, se abrirá
                  Google Maps con la ubicación exacta de tu local de votación.
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

            {/* Botón con funcionalidad Google Maps */}
            <button
              onClick={abrirGoogleMapsConDireccion}
              className="bg-primary text-primary-foreground hover:bg-primary/90 group flex w-full items-center justify-center rounded-lg p-4 text-lg font-semibold transition-colors"
            >
              <ArrowRight
                className="mr-2 transition-transform group-hover:translate-x-1"
                size={20}
              />
              Abrir en Google Maps
              <ExternalLink className="ml-2 text-sm" size={16} />
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
          <Link
            to="/elector"
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
