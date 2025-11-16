import { createFileRoute } from '@tanstack/react-router'
import MiembroMesa from '../pages/MiembroMesa'

export const Route = createFileRoute('/miembro-mesa')({
  component: MiembroMesa,
})
