import React from 'react'
// 1. Importamos Link y la flecha para el header de móvil
import { Link } from '@tanstack/react-router'
import {
  CreditCard,
  Clock,
  MapPin,
  XCircle,
  User,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react'

// ... (El 'type Recomendacion' y las listas 'recomendacionesAntes' y 'recomendacionesDurante' no cambian) ...
type Recomendacion = {
  titulo: string
  descripcion: string
  icono: React.ElementType
}

const recomendacionesAntes: Recomendacion[] = [
  {
    titulo: 'Lleva tu DNI',
    descripcion:
      'Es el único documento válido para votar. Asegúrate de que esté vigente.',
    icono: CreditCard,
  },
  {
    titulo: 'Verifica tu local con tiempo',
    descripcion:
      'Consulta en esta app tu local y mesa de votación días antes para evitar confusiones.',
    icono: MapPin,
  },
  {
    titulo: 'Descarga tu mapa de geolocalización',
    descripcion:
      'Descarga con días de anticipación el mapa o la ubicación de tu local. La señal de internet puede fallar ese día.',
    icono: MapPin,
  },
]

const recomendacionesDurante: Recomendacion[] = [
  {
    titulo: 'Ve a la hora indicada',
    descripcion:
      'Si se te ha asignado un horario sugerido, respétalo para evitar aglomeraciones.',
    icono: Clock,
  },
  {
    titulo: 'Prohibido tomar fotos al voto',
    descripcion:
      'Está prohibido tomarle foto a la cédula de votación marcada. Es un delito electoral.',
    icono: XCircle,
  },
  {
    titulo: 'No vayas con propaganda política',
    descripcion:
      'No puedes usar ropa, mascarillas o cualquier distintivo de un partido político en el local de votación.',
    icono: User,
  },
]

// --- 2. Creamos un componente para el contenido ---
//    (Así no repetimos el código de las tarjetas)
const ContenidoPagina: React.FC = () => (
  <>
    {/* --- Alerta Principal --- */}
    <div className="bg-accent mb-10 flex items-start gap-4 rounded-lg p-6">
      <AlertTriangle className="text-primary shrink-0 text-3xl" />
      <p className="text-muted-foreground text-lg font-medium">
        Recuerda: Tu DNI es indispensable. Sin él, no podrás votar. Ve con
        tiempo y cumple los protocolos.
      </p>
    </div>

    {/* --- Contenedor de 2 Columnas para las listas --- */}
    {/* En móvil, 'lg:grid-cols-2' se convierte en 1 columna */}
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* --- COLUMNA 1: Antes de Votar --- */}
      <div className="flex flex-col gap-6">
        <h2 className="text-foreground mb-2 text-2xl font-bold">
          Antes de Salir de Casa
        </h2>
        {recomendacionesAntes.map((item) => (
          <div
            key={item.titulo}
            className="bg-card border-border flex items-start rounded-lg border p-6 shadow-md"
          >
            <div className="bg-accent shrink-0 rounded-full p-3">
              <item.icono className="text-primary text-2xl" />
            </div>
            <div className="ml-5">
              <h3 className="text-foreground mb-1 text-xl font-bold">
                {item.titulo}
              </h3>
              <p className="text-muted-foreground text-lg">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- COLUMNA 2: En el Local de Votación --- */}
      <div className="flex flex-col gap-6">
        <h2 className="text-foreground mb-2 text-2xl font-bold">
          En el Local de Votación
        </h2>
        {recomendacionesDurante.map((item) => (
          <div
            key={item.titulo}
            className="bg-card border-border flex items-start rounded-lg border p-6 shadow-md"
          >
            <div className="bg-accent shrink-0 rounded-full p-3">
              <item.icono className="text-primary text-2xl" />
            </div>
            <div className="ml-5">
              <h3 className="text-foreground mb-1 text-xl font-bold">
                {item.titulo}
              </h3>
              <p className="text-muted-foreground text-lg">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
)

const PaginaSeguridad: React.FC = () => {
  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE PC (Renderiza dentro del layout padre) */}
      {/* ========================================================== */}
      <div className="hidden md:block">
        {/* Título y Descripción (Solo para PC) */}
        <h1 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
          Recomendaciones de Seguridad
        </h1>
        <p className="text-muted-foreground mb-10 max-w-3xl text-lg">
          Sigue estas recomendaciones para una jornada electoral tranquila,
          segura y sin contratiempos.
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
            to="/elector"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Seguridad</h1>
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

export default PaginaSeguridad
