import { Navbar } from '@/components/layout/navbar'
import {
  createRootRoute,
  Outlet,
  Link,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Calendar } from 'lucide-react'

const RootLayout = () => {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Floating Calendar Button - fixed bottom-right (bigger & more visible) */}
      {location.pathname !== '/calendario' && (
        <div className="pointer-events-none">
          <Link
            to="/calendario"
            aria-label="Ir al calendario"
            title="Ir al Calendario"
            className="pointer-events-auto fixed right-6 bottom-6 z-50 transform overflow-hidden rounded-full bg-linear-to-br from-blue-600 to-indigo-600 p-4 shadow-2xl transition-transform duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none md:p-5"
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
      <TanStackRouterDevtools
        position="bottom-right"
        initialIsOpen={false}
        toggleButtonProps={{ style: { display: 'none' } }}
      />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })
