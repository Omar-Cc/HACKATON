import { Navbar } from '@/components/layout/navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <Navbar />
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

export const Route = createRootRoute({ component: RootLayout })
