import { useState } from 'react'
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FastForward,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { PREGUNTAS } from './questions'
import type { RespuestaUsuario } from './types'

interface MatchElectoralQuizProps {
  onComplete: (respuestas: RespuestaUsuario[]) => void
}

export function MatchElectoralQuiz({ onComplete }: MatchElectoralQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [respuestas, setRespuestas] = useState<RespuestaUsuario[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const preguntaActual = PREGUNTAS[currentIndex]
  const progreso = ((currentIndex + 1) / PREGUNTAS.length) * 100
  const isLastQuestion = currentIndex === PREGUNTAS.length - 1

  const handleSelectOption = (opcionId: string, valor: number) => {
    setSelectedOption(opcionId)

    // Actualizar o agregar respuesta
    const nuevasRespuestas = respuestas.filter(
      (r) => r.preguntaId !== preguntaActual.id
    )
    nuevasRespuestas.push({
      preguntaId: preguntaActual.id,
      opcionId,
      valor,
      categoria: preguntaActual.categoria,
    })
    setRespuestas(nuevasRespuestas)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(respuestas)
    } else {
      setCurrentIndex((prev) => prev + 1)
      // Cargar respuesta previa si existe
      const respuestaPreviaIndex = respuestas.findIndex(
        (r) => r.preguntaId === PREGUNTAS[currentIndex + 1].id
      )
      if (respuestaPreviaIndex !== -1) {
        setSelectedOption(respuestas[respuestaPreviaIndex].opcionId)
      } else {
        setSelectedOption(null)
      }
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      // Cargar respuesta previa
      const respuestaPreviaIndex = respuestas.findIndex(
        (r) => r.preguntaId === PREGUNTAS[currentIndex - 1].id
      )
      if (respuestaPreviaIndex !== -1) {
        setSelectedOption(respuestas[respuestaPreviaIndex].opcionId)
      } else {
        setSelectedOption(null)
      }
    }
  }

  const handleSkipAndComplete = () => {
    // Completar automáticamente las preguntas restantes con respuestas neutrales (valor medio)
    const respuestasCompletas = [...respuestas]

    for (const pregunta of PREGUNTAS) {
      const yaRespondida = respuestasCompletas.some(
        (r) => r.preguntaId === pregunta.id
      )

      if (!yaRespondida) {
        // Seleccionar la opción del medio (neutral)
        const opcionMedia =
          pregunta.opciones[Math.floor(pregunta.opciones.length / 2)]
        respuestasCompletas.push({
          preguntaId: pregunta.id,
          opcionId: opcionMedia.id,
          valor: opcionMedia.valor,
          categoria: pregunta.categoria,
        })
      }
    }

    onComplete(respuestasCompletas)
  }

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      educacion: '📚 Educación',
      salud: '🏥 Salud',
      seguridad: '🛡️ Seguridad',
      economia: '💼 Economía',
      medio_ambiente: '🌱 Medio Ambiente',
      social: '🤝 Social',
    }
    return labels[categoria] || categoria
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 py-12">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Pregunta {currentIndex + 1} de {PREGUNTAS.length}
          </span>
          <span className="font-medium">{Math.round(progreso)}%</span>
        </div>
        <Progress value={progreso} className="h-2" />
      </div>

      {/* Card con la pregunta */}
      <Card className="border-2">
        <CardHeader>
          <Badge variant="secondary" className="mb-3 w-fit">
            {getCategoriaLabel(preguntaActual.categoria)}
          </Badge>
          <CardTitle className="text-2xl leading-relaxed">
            {preguntaActual.texto}
          </CardTitle>
          <CardDescription>
            Selecciona la opción que mejor refleje tu opinión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {preguntaActual.opciones.map((opcion) => {
            const isSelected = selectedOption === opcion.id
            return (
              <button
                key={opcion.id}
                onClick={() => handleSelectOption(opcion.id, opcion.valor)}
                className={`group relative w-full rounded-xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-accent'
                } `}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-base ${isSelected ? 'font-semibold' : ''}`}
                  >
                    {opcion.texto}
                  </span>
                  {isSelected && (
                    <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Botones de navegación */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </Button>

        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          className="gap-2"
        >
          {isLastQuestion ? (
            <>
              Ver Resultados
              <Sparkles className="h-4 w-4" />
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkipAndComplete}
          className="text-muted-foreground hover:text-foreground gap-2"
        >
          <FastForward className="h-4 w-4" />
          Saltar
        </Button>

        <div className="w-10 md:hidden"></div>
      </div>
    </div>
  )
}
