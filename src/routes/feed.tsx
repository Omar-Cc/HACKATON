import { createFileRoute } from '@tanstack/react-router'
import FeedPage from '../pages/FeedPage'

// File route for /feed
export const Route = createFileRoute('/feed')({
  component: FeedPage,
})
