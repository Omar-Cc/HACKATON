import { createFileRoute } from '@tanstack/react-router'
import LayoutElector from '../pages/Soy_Elector/Layout_Elector'

export const Route = createFileRoute('/elector')({
  component: LayoutElector,
})
