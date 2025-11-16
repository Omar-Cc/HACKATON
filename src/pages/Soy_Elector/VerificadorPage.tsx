import { useState } from 'react'
import {
  Shield,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormularioPregunta,
  ResultadoVerificacion,
  verificarPregunta,
} from '@/features/verificador'
import type { ResultadoVerificacionType } from '@/features/verificador'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type Estado = 'inicial' | 'resultado' | 'no-encontrado'

export default function VerificadorPage() {
  const [estado, setEstado] = useState<Estado>('inicial')
  const [resultado, setResultado] = useState<ResultadoVerificacionType | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  const handlePregunta = (pregunta: string) => {
    setIsLoading(true)

    // Simular delay de búsqueda (en producción sería una llamada a API)
    setTimeout(() => {
      const resultadoVerificacion = verificarPregunta(pregunta)

      if (resultadoVerificacion) {
        setResultado(resultadoVerificacion)
        setEstado('resultado')
      } else {
        setEstado('no-encontrado')
      }

      setIsLoading(false)
    }, 800)
  }

  const handleNuevaPregunta = () => {
    setEstado('inicial')
    setResultado(null)
  }

  if (estado === 'resultado' && resultado) {
    return (
      <>
        {/* Header móvil */}
        <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg md:hidden">
          <Link
            to="/elector"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver al menú principal"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Verificador de Desinformación</h1>
        </header>

        <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50 p-4 py-12 dark:from-slate-900 dark:via-green-950 dark:to-slate-900">
          <ResultadoVerificacion
            resultado={resultado}
            onNuevaPregunta={handleNuevaPregunta}
          />
        </div>
      </>
    )
  }

  if (estado === 'no-encontrado') {
    return (
      <>
        {/* Header móvil */}
        <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg md:hidden">
          <Link
            to="/elector"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver al menú principal"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Verificador de Desinformación</h1>
        </header>

        <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50 p-4 py-12 dark:from-slate-900 dark:via-green-950 dark:to-slate-900">
          <div className="mx-auto max-w-3xl space-y-6">
            <Alert>
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg">
                No encontramos información sobre tu pregunta
              </AlertTitle>
              <AlertDescription className="mt-2">
                Lo sentimos, no tenemos información verificada para responder a
                tu pregunta en este momento. Intenta reformular tu pregunta o
                selecciona una de las preguntas sugeridas.
              </AlertDescription>
            </Alert>

            <FormularioPregunta
              onSubmit={handlePregunta}
              isLoading={isLoading}
            />
          </div>
        </div>
      </>
    )
  }

  // Pantalla inicial
  return (
    <>
      {/* Header móvil */}
      <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg md:hidden">
        <Link
          to="/elector"
          className="rounded-full p-2 hover:bg-white/10"
          aria-label="Volver al menú principal"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Verificador de Desinformación</h1>
      </header>

      <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50 p-4 py-12 dark:from-slate-900 dark:via-green-950 dark:to-slate-900">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <Shield className="text-primary h-10 w-10" />
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Detector de Desinformación
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              Pregunta "¿Es verdad que...?" y recibe respuestas basadas en
              fuentes verificadas
            </p>
          </div>

          {/* Formulario */}
          <FormularioPregunta onSubmit={handlePregunta} isLoading={isLoading} />

          {/* Características */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Fuentes Verificadas</CardTitle>
                <CardDescription>
                  Todas nuestras respuestas están respaldadas por fuentes
                  oficiales, periodísticas y académicas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle2 className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Información Actualizada</CardTitle>
                <CardDescription>
                  Base de datos constantemente actualizada con las últimas
                  verificaciones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <Sparkles className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Respuestas Claras</CardTitle>
                <CardDescription>
                  Explicaciones sencillas con contexto adicional y enlaces a
                  documentos originales
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Nota de transparencia */}
          <Card className="border-primary border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="text-primary mt-1 h-6 w-6 shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Sobre esta herramienta</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Este verificador compara tu pregunta con nuestra base de
                    datos de información verificada. Siempre revisa las fuentes
                    originales haciendo clic en los enlaces proporcionados. Si
                    tienes dudas, consulta directamente con las instituciones
                    oficiales como el JNE, ONPE o Defensoría del Pueblo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
