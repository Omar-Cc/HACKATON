import {
  createFileRoute,
  Outlet,
  Link,
  useMatchRoute,
} from '@tanstack/react-router'
// Importamos los íconos
import { Repeat, Share2, ArrowLeft } from 'lucide-react'

// Este es el componente Layout (el "caparazón")
function CandidatosLayout() {
  // Hook para saber en qué ruta hija estamos
  const matchRoute = useMatchRoute()

  // Verificamos si la ruta activa es la de "comparar"
  const isComparePage = matchRoute({ to: '/elector/candidatos/comparar' })

  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE PC (El código que tú pegaste) */}
      {/* ========================================================== */}
      <div className="hidden min-h-full flex-col md:flex">
        {/* --- ÁREA DEL TÍTULO (PC) --- */}
        <div className="shrink-0 p-6 md:p-8">
          {isComparePage ? (
            // --- Header "Comparar" (PC) ---
            <div className="flex items-center gap-4">
              <Link
                to="/elector/candidatos"
                className="hover:bg-accent text-muted-foreground rounded-full p-2"
                aria-label="Volver a la lista"
              >
                <ArrowLeft size={20} />
              </Link>
              <Share2 size={28} className="text-primary" />
              <div>
                <h1 className="text-foreground text-2xl font-bold md:text-3xl">
                  Comparar Propuestas
                </h1>
                <p className="text-muted-foreground text-lg">
                  Compara hasta 3 candidatos
                </p>
              </div>
            </div>
          ) : (
            // --- Header "Lista" (PC) ---
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-foreground text-2xl font-bold md:text-3xl">
                  Candidatos
                </h1>
              </div>
              <Link
                to="/elector/candidatos/comparar"
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-colors"
              >
                <Repeat />
                Comparar
              </Link>
            </div>
          )}
        </div>

        {/* --- CONTENIDO HIJO (PC) --- */}
        <div className="flex-1 p-6 md:p-8 md:pt-0">
          <Outlet />
        </div>
      </div>
      {/* ========================================================== */}
      {/* 2. UI DE MÓVIL (Nuevo layout) */}
      {/* ========================================================== */}
      <div className="bg-background min-h-screen md:hidden">
        {/* --- Header de Móvil (Dinámico) --- */}
        <header className="bg-primary text-primary-foreground flex items-center justify-between rounded-b-[20px] p-4 shadow-lg">
          {isComparePage ? (
            // --- Header "Comparar" (Móvil) ---
            <div className="flex items-center gap-4">
              <Link
                to="/elector/candidatos"
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Volver a la lista"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold">Comparar</h1>
            </div>
          ) : (
            // --- Header "Lista" (Móvil) ---
            <div className="flex items-center gap-4">
              <Link
                to="/elector"
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Volver"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold">Candidatos</h1>
            </div>
          )}

          {/* Botón "Comparar" solo en la lista */}
          {!isComparePage && (
            <Link
              to="/elector/candidatos/comparar"
              className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold"
            >
              <Repeat />
              Comparar
            </Link>
          )}
        </header>

        {/* --- CONTENIDO HIJO (Móvil) --- */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </>
  )
}

// Definimos la ruta padre (sin cambios)
export const Route = createFileRoute('/elector/candidatos')({
  component: CandidatosLayout,
})
