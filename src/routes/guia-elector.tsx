import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/guia-elector')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/guia-elector"!</div>
}
