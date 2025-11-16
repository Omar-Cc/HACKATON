import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  XCircle,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import type { ResultadoVerificacion as ResultadoVerificacionType } from './types'

interface ResultadoVerificacionProps {
  readonly resultado: ResultadoVerificacionType
  readonly onNuevaPregunta: () => void
}

export function ResultadoVerificacion({
  resultado,
  onNuevaPregunta,
}: ResultadoVerificacionProps) {
  const getVeredictoBadge = () => {
    const configs = {
      verdadero: {
        icon: CheckCircle2,
        label: 'Verdadero',
        variant: 'default' as const,
        className: 'bg-green-600 hover:bg-green-700',
      },
      falso: {
        icon: XCircle,
        label: 'Falso',
        variant: 'destructive' as const,
        className: '',
      },
      'parcialmente-verdadero': {
        icon: AlertCircle,
        label: 'Parcialmente Verdadero',
        variant: 'secondary' as const,
        className: 'bg-yellow-600 text-white hover:bg-yellow-700',
      },
      'no-verificable': {
        icon: HelpCircle,
        label: 'No Verificable',
        variant: 'outline' as const,
        className: '',
      },
    }

    const config = configs[resultado.veredicto]
    const Icon = config.icon

    return (
      <Badge
        variant={config.variant}
        className={`gap-2 px-4 py-2 text-base ${config.className}`}
      >
        <Icon className="h-5 w-5" />
        {config.label}
      </Badge>
    )
  }

  const getVeredictAlert = () => {
    const configs = {
      verdadero: {
        variant: 'default' as const,
        icon: CheckCircle2,
        title: 'Información Verificada',
        className: 'border-green-600 bg-green-50 dark:bg-green-950',
      },
      falso: {
        variant: 'destructive' as const,
        icon: XCircle,
        title: 'Información Falsa',
        className: '',
      },
      'parcialmente-verdadero': {
        variant: 'default' as const,
        icon: AlertCircle,
        title: 'Información Parcialmente Verdadera',
        className: 'border-yellow-600 bg-yellow-50 dark:bg-yellow-950',
      },
      'no-verificable': {
        variant: 'default' as const,
        icon: HelpCircle,
        title: 'Información No Verificable',
        className: 'border-gray-400 bg-gray-50 dark:bg-gray-900',
      },
    }

    const config = configs[resultado.veredicto]
    const Icon = config.icon

    return (
      <Alert variant={config.variant} className={config.className}>
        <Icon className="h-5 w-5" />
        <AlertTitle className="text-lg">{config.title}</AlertTitle>
        <AlertDescription className="mt-2 text-base leading-relaxed">
          {resultado.respuesta}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Header con pregunta y veredicto */}
      <Card className="border-2">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-muted-foreground mb-2 text-sm">
                  Tu pregunta:
                </p>
                <h2 className="text-2xl font-bold">
                  {resultado.preguntaOriginal}
                </h2>
              </div>
              {getVeredictoBadge()}
            </div>

            {resultado.confianza < 70 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  La coincidencia con nuestra base de datos es del{' '}
                  {resultado.confianza}%. Los resultados pueden no ser exactos.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Respuesta detallada */}
      <div>{getVeredictAlert()}</div>

      {/* Contexto adicional si existe */}
      {resultado.contextoAdicional && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contexto adicional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {resultado.contextoAdicional}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Fuentes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fuentes Verificadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {resultado.fuentes.map((fuente, index) => (
              <a
                key={index}
                href={fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:border-primary hover:bg-accent group flex items-start gap-3 rounded-lg border p-4 transition-all"
              >
                <ExternalLink className="text-primary mt-1 h-5 w-5 shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{fuente.titulo}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {fuente.tipo}
                    </Badge>
                    {fuente.fecha && (
                      <span className="text-muted-foreground text-xs">
                        {fuente.fecha}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preguntas relacionadas */}
      {resultado.preguntasRelacionadas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preguntas relacionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resultado.preguntasRelacionadas.map((pregunta, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      // Aquí se podría hacer una nueva verificación
                      console.log('Nueva búsqueda:', pregunta)
                    }}
                    className="text-primary text-left hover:underline"
                  >
                    • {pregunta}
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Acciones */}
      <div className="flex justify-center">
        <Button
          onClick={onNuevaPregunta}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <RotateCcw className="h-5 w-5" />
          Hacer otra pregunta
        </Button>
      </div>
    </div>
  )
}
