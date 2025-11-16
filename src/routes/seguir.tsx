import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seguir')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/seguir"!</div>
}
