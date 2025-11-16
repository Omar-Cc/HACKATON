import UserProfilePage from '@/pages/UserProfilePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/u/$slug')({
  component: UserProfilePage,
})
