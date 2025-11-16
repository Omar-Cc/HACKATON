import { Link } from '@tanstack/react-router'
import { ArrowRight, Award, TrendingUp, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { ResultadoMatch } from './types'

interface ResultadosMatchProps {
  readonly resultados: ResultadoMatch[]
  readonly onReset: () => void
}

export function ResultadosMatch({ resultados, onReset }: ResultadosMatchProps) {
  const topCandidatos = resultados.slice(0, 5)
  const mejorMatch = topCandidatos[0]

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, { emoji: string; nombre: string }> = {
      educacion: { emoji: '📚', nombre: 'Educación' },
      salud: { emoji: '🏥', nombre: 'Salud' },
      seguridad: { emoji: '🛡️', nombre: 'Seguridad' },
      economia: { emoji: '💼', nombre: 'Economía' },
      medio_ambiente: { emoji: '🌱', nombre: 'Medio Ambiente' },
      social: { emoji: '🤝', nombre: 'Social' },
    }
    return labels[categoria] || { emoji: '', nombre: categoria }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Header de Resultados */}
      <div className="text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Award className="text-primary h-8 w-8" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">¡Tu Match Electoral!</h1>
        <p className="text-muted-foreground text-lg">
          Estos candidatos se alinean más con tus valores y prioridades
        </p>
      </div>

      {/* Mejor Match - Destacado */}
      <Card className="border-primary bg-primary/5 border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="default" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Mejor Match
            </Badge>
            <span className="text-primary text-4xl font-bold">
              {Math.round(mejorMatch.porcentajeAfinidad)}%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {mejorMatch.avatar || mejorMatch.nombreCandidato.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-2xl font-bold">
                  {mejorMatch.nombreCandidato}
                </h2>
                <p className="text-muted-foreground">{mejorMatch.partido}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Coincidencias por categoría:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {mejorMatch.coincidencias.map((coincidencia) => {
                    const categoria = getCategoriaLabel(coincidencia.categoria)
                    return (
                      <div key={coincidencia.categoria} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {categoria.emoji} {categoria.nombre}
                          </span>
                          <span className="font-medium">
                            {Math.round(coincidencia.afinidad)}%
                          </span>
                        </div>
                        <Progress
                          value={coincidencia.afinidad}
                          className="h-2"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              <Link
                to="/candidato/$id"
                params={{ id: mejorMatch.candidatoId.toString() }}
              >
                <Button className="gap-2">
                  Ver Perfil Completo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Otros Matches */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">
          Otros candidatos compatibles
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {topCandidatos.slice(1).map((candidato, index) => (
            <Card
              key={candidato.candidatoId}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">#{index + 2}</Badge>
                  <span className="text-2xl font-bold">
                    {Math.round(candidato.porcentajeAfinidad)}%
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-muted font-bold">
                      {candidato.avatar || candidato.nombreCandidato.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">
                      {candidato.nombreCandidato}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {candidato.partido}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {candidato.coincidencias.slice(0, 3).map((coincidencia) => {
                    const categoria = getCategoriaLabel(coincidencia.categoria)
                    return (
                      <div
                        key={coincidencia.categoria}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {categoria.emoji} {categoria.nombre}
                        </span>
                        <span className="font-medium">
                          {Math.round(coincidencia.afinidad)}%
                        </span>
                      </div>
                    )
                  })}
                </div>

                <Link
                  to="/candidato/$id"
                  params={{ id: candidato.candidatoId.toString() }}
                >
                  <Button variant="outline" className="w-full gap-2">
                    Ver Perfil
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Acciones finales */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Hacer Quiz de Nuevo
        </Button>
        <Link to="/elector/candidatos">
          <Button variant="secondary" className="gap-2">
            Ver Todos los Candidatos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
