import { createFileRoute } from '@tanstack/react-router'
import CalendarioPage from '@/pages/CalendarioPage'

// Use undefined path param so type narrows correctly to generated file routes.
// The router's generated types sometimes omit entries during generation;
// passing no argument (undefined) avoids the `Argument of type '`/calendario`' is not assignable` TS error.
export const Route = createFileRoute('/calendario')({
  component: CalendarioPage,
})
