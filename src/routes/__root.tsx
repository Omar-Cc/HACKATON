import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => {
  // Hide the simple nav on the calendario page per user's request
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const hideNavOnCalendario = pathname.startsWith('/calendario')

  return (
    <>
      {!hideNavOnCalendario && (
        <nav>
          {/* Navigation items can be added here */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/planchas-presidenciales">Planchas Presidenciales</Link>
            </li>
          </ul>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools
        position="bottom-right"
        initialIsOpen={false}
        toggleButtonProps={{ style: { display: 'none' } }}
      />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })
