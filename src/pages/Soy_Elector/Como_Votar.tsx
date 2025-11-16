// src/pages/Soy_Elector/Como_Votar.tsx

import React from 'react'
// 1. Importamos Link y la flecha para el header de móvil
import { Link } from '@tanstack/react-router'
import {
  MapPin,
  User,
  CheckCircle,
  Box,
  X,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react'

// ... (El 'type Paso' y 'const pasos' no cambian) ...
type Paso = {
  numero: string
  titulo: string
  descripcion: string
  icono: React.ElementType
}

const pasos: Paso[] = [
  {
    numero: '1',
    titulo: 'Ubica tu mesa',
    descripcion:
      'Busca tu número de mesa en el local de votación. Recuerda consultar antes del día de las elecciones.',
    icono: MapPin,
  },
  {
    numero: '2',
    titulo: 'Entrega tu DNI',
    descripcion:
      'Presenta tu DNI original al miembro de mesa. Debe estar vigente y en buen estado.',
    icono: User,
  },
  {
    numero: '3',
    titulo: 'Marca tu voto correctamente',
    descripcion:
      'Marca con una X o un aspa dentro del recuadro del candidato de tu preferencia. No hagas otros trazos.',
    icono: CheckCircle,
  },
  {
    numero: '4',
    titulo: 'Deposita tu voto en el ánfora',
    descripcion:
      'Dobla la cédula y colócala en el ánfora. Luego firma el padrón electoral.',
    icono: Box,
  },
]

// --- 2. Creamos un componente para el contenido ---
const ContenidoPagina: React.FC = () => (
  <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
    {/* --- COLUMNA 1: Lista de Pasos --- */}
    <div className="flex flex-col gap-6">
      {pasos.map((paso) => (
        <div
          key={paso.numero}
          className="bg-card border-border flex items-start rounded-lg border p-6 shadow-md"
        >
          <div className="bg-accent shrink-0 rounded-full p-3">
            <paso.icono className="text-primary text-2xl" />
          </div>
          <div className="ml-5">
            <p className="text-primary mb-1 text-sm font-semibold">
              PASO {paso.numero}
            </p>
            <h2 className="text-foreground mb-1 text-2xl font-bold">
              {paso.titulo}
            </h2>
            <p className="text-muted-foreground text-lg">{paso.descripcion}</p>
          </div>
        </div>
      ))}
    </div>

    {/* --- COLUMNA 2: Ejemplo y Alerta --- */}
    <div className="flex flex-col gap-6">
      {/* Tarjeta: Ejemplo de cédula válida */}
      <div className="bg-card border-border rounded-lg border p-6 shadow-md">
        <h3 className="text-foreground mb-4 text-xl font-bold">
          Ejemplo de cédula válida
        </h3>
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
          {/* CANDIDATO 1: Voto Válido */}
          <div className="bg-accent/50 border-primary relative flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center">
              {/* LOGO: Circular */}
              <div className="bg-primary mr-4 h-12 w-12 rounded-full"></div>
              <div>
                <div className="text-foreground text-lg font-bold">
                  Candidato 1
                </div>
                <div className="text-muted-foreground text-sm">Partido A</div>
              </div>
            </div>
            {/* CASILLA DE VOTO: Cuadrada con la 'X' GRANDE */}
            <div className="relative h-12 w-12 shrink-0">
              <div className="border-primary absolute inset-0 flex items-center justify-center rounded-md border-2 bg-white">
                {/* AUMENTO DE TAMAÑO DE LA 'X' */}
                <X className="text-destructive **text-5xl**" />
              </div>
            </div>
          </div>

          {/* CANDIDATO 2: Sin marcar */}
          <div className="mt-4 flex items-center justify-between p-4">
            <div className="flex items-center">
              {/* LOGO: Circular */}
              <div className="mr-4 h-12 w-12 rounded-full bg-gray-300"></div>
              <div>
                <div className="text-lg font-bold text-gray-500">
                  Candidato 2
                </div>
                <div className="text-sm text-gray-400">Partido B</div>
              </div>
            </div>
            {/* CASILLA DE VOTO: Cuadrada sin marcar */}
            <div className="h-12 w-12 shrink-0">
              <div className="h-full w-full rounded-md border-2 border-gray-300"></div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Marca solo una opción. Marcas múltiples anulan el voto.
        </p>
      </div>

      {/* Tarjeta: ¡Importante! (Alerta) */}
      <div className="border-destructive rounded-md border-l-4 bg-red-50 p-6">
        <div className="flex items-start">
          <AlertTriangle className="text-destructive text-2xl" />
          <div className="ml-4">
            <h3 className="text-destructive mb-3 text-xl font-bold">
              ¡Importante!
            </h3>
            <ul className="list-inside list-disc space-y-2 text-lg text-gray-700">
              <li>No fotografíes tu voto (es delito).</li>
              <li>No realices otros trazos en la cédula.</li>
              <li>El voto en blanco y nulo son opciones válidas.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const PaginaComoVotar: React.FC = () => {
  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE PC (Renderiza dentro del layout padre) */}
      {/* ========================================================== */}
      <div className="hidden md:block">
        {/* Título y Descripción (Solo para PC) */}
        <h1 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
          ¿Cómo Votar?
        </h1>
        <p className="text-muted-foreground mb-10 max-w-3xl text-lg">
          Sigue esta guía paso a paso para emitir tu voto de manera correcta.
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
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Cómo Votar</h1>
        </header>

        {/* Contenido de Móvil */}
        <main className="p-6">
          {/* Renderiza el mismo contenido, pero sin el título (ya está en el header) */}
          <ContenidoPagina />
        </main>
      </div>
    </>
  )
}

export default PaginaComoVotar
