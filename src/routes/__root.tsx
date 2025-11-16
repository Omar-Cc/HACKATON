import { Navbar } from '@/components/layout/navbar'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {!isHome && <Navbar />}
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
