import { useState } from 'react'
import { Sparkles, Target, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  MatchElectoralQuiz,
  ResultadosMatch,
  calcularResultados,
} from '@/features/quiz-afinidad'
import type { RespuestaUsuario, ResultadoMatch } from '@/features/quiz-afinidad'

type EstadoQuiz = 'inicio' | 'respondiendo' | 'resultados'

export default function MatchElectoralPage() {
  const [estado, setEstado] = useState<EstadoQuiz>('inicio')
  const [resultados, setResultados] = useState<ResultadoMatch[]>([])

  const handleStartQuiz = () => {
    setEstado('respondiendo')
  }

  const handleCompleteQuiz = (respuestas: RespuestaUsuario[]) => {
    const resultadosCalculados = calcularResultados(respuestas)
    setResultados(resultadosCalculados)
    setEstado('resultados')
  }

  const handleReset = () => {
    setEstado('inicio')
    setResultados([])
  }

  if (estado === 'resultados') {
    return <ResultadosMatch resultados={resultados} onReset={handleReset} />
  }

  if (estado === 'respondiendo') {
    return <MatchElectoralQuiz onComplete={handleCompleteQuiz} />
  }

  // Pantalla de inicio
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <Sparkles className="text-primary h-10 w-10" />
        </div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Match Electoral</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
          Responde preguntas clave y descubre qué candidatos se alinean más con
          tus valores y prioridades
        </p>
      </div>

      {/* Características */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Target className="text-primary h-6 w-6" />
            </div>
            <CardTitle>12 Preguntas</CardTitle>
            <CardDescription>
              Temas clave sobre educación, salud, seguridad, economía y más
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <CheckCircle2 className="text-primary h-6 w-6" />
            </div>
            <CardTitle>Algoritmo Preciso</CardTitle>
            <CardDescription>
              Comparamos tus respuestas con las propuestas reales de cada
              candidato
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Sparkles className="text-primary h-6 w-6" />
            </div>
            <CardTitle>Resultados Claros</CardTitle>
            <CardDescription>
              Descubre tu porcentaje de afinidad con cada candidato
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="border-primary border-2">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold">
              ¿Listo para descubrir tu match?
            </h2>
            <p className="text-muted-foreground mb-6">
              El quiz toma aproximadamente 3-5 minutos en completarse
            </p>
            <Button size="lg" onClick={handleStartQuiz} className="gap-2">
              <Sparkles className="h-5 w-5" />
              Comenzar Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Nota de Privacidad */}
      <p className="text-muted-foreground text-center text-sm">
        💡 Tus respuestas son completamente anónimas y no se almacenan en ningún
        servidor
      </p>
    </div>
  )
}
