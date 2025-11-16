import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface FormularioPreguntaProps {
  readonly onSubmit: (pregunta: string) => void
  readonly isLoading?: boolean
}

const PREGUNTAS_SUGERIDAS = [
  '¿Es verdad que la educación universitaria será gratuita?',
  '¿Los candidatos pueden tener antecedentes penales?',
  '¿Se reducirán los impuestos a las empresas?',
  '¿El voto es obligatorio en Perú?',
  '¿Es cierto que se construirán 50 hospitales nuevos?',
]

export function FormularioPregunta({
  onSubmit,
  isLoading = false,
}: FormularioPreguntaProps) {
  const [pregunta, setPregunta] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pregunta.trim()) {
      onSubmit(pregunta.trim())
    }
  }

  const handleSugerencia = (sugerencia: string) => {
    setPregunta(sugerencia)
    onSubmit(sugerencia)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Formulario principal */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            Haz tu pregunta
          </CardTitle>
          <CardDescription>
            Pregunta "¿Es verdad que...?" y recibe respuestas basadas en fuentes
            verificadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ejemplo: ¿Es verdad que la educación será gratuita?"
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                className="text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!pregunta.trim() || isLoading}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Verificar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preguntas sugeridas */}
      <div>
        <h3 className="text-muted-foreground mb-3 text-sm font-medium">
          Preguntas frecuentes que puedes consultar:
        </h3>
        <div className="flex flex-wrap gap-2">
          {PREGUNTAS_SUGERIDAS.map((sugerencia, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer px-4 py-2 text-sm transition-colors"
              onClick={() => handleSugerencia(sugerencia)}
            >
              {sugerencia}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
