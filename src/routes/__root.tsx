// src/routes/__root.tsx (o donde tengas este RootLayout)

import { Navbar } from '@/components/layout/navbar'
import {
  createRootRoute,
  Outlet,
  Link,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Calendar } from 'lucide-react'

// --- 1. IMPORTA EL CHATBOT Y EL PROVIDER ---
// (Asegúrate que la ruta a 'FloatingChatbot' sea correcta)
import ChatbotProvider, { FloatingChatbot } from '@/components/FloatingChatbot'

const RootLayout = () => {
  const location = useLocation()

  return (
    // --- 2. ENVUELVE TODO CON EL PROVIDER ---
    <ChatbotProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>

      {/* Floating Calendar Button - fixed bottom-right */}
      {location.pathname !== '/calendario' && (
        <div className="pointer-events-none">
          <Link
            to="/calendario"
            aria-label="Ir al calendario"
            title="Ir al Calendario"
            // --- CAMBIO AQUÍ: Movido 'bottom-6' a 'bottom-28' para hacer espacio al chat ---
            className="pointer-events-auto fixed right-6 bottom-28 z-50 transform overflow-hidden rounded-full bg-linear-to-br from-blue-600 to-indigo-600 p-4 shadow-2xl transition-transform duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none md:p-5"
          >
            {/* decorative blurred layer to make it more vistoso */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-white/20 opacity-20 blur-sm"
            />
            <Calendar className="relative z-10 h-10 w-10 text-white md:h-12 md:w-12" />
          </Link>
        </div>
      )}

      {/* --- 3. AÑADE EL COMPONENTE FLOTANTE DEL CHAT --- */}
      {/* (Este se posicionará automáticamente en bottom-6) */}
      <FloatingChatbot />

      <TanStackRouterDevtools
        position="bottom-right"
        initialIsOpen={false}
        toggleButtonProps={{ style: { display: 'none' } }}
      />
    </ChatbotProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
