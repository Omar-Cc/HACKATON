import { useParams } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function UserProfilePage() {
  const params = useParams({ from: '/u/$slug' as const })
  const slug = params?.slug ?? 'usuario'
  const displayName = decodeURIComponent(slug).replace(/-/g, ' ')

  return (
    <div className="container mx-auto py-8">
      <Card className="rounded-xl">
        <CardContent className="flex items-center gap-6 p-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{displayName}</h2>
            <p className="text-muted-foreground mt-1">
              Perfil público • @{slug}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Aquí aparecerá información pública del usuario, sus publicaciones
              y actividad.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
