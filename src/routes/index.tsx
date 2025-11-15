import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/pages/HomePage' // si aún no existe, lo puedes crear

export const Route = createFileRoute('/')({
  component: HomePage,
})
