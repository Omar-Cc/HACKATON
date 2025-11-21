import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DiputadosTab from '@/features/congreso/DiputadosTab'
import SenadoresTab from '@/features/congreso/SenadoresTab'
import ParlamentoAndinoTab from '@/features/congreso/ParlamentoAndinoTab'
import HeroSection from '@/features/congreso/HeroSection'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

function CongresoPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section: Título General y Contexto Bicameralidad */}
      <HeroSection />

      <div className="container mx-auto px-4">
        <Tabs defaultValue="diputados" className="mt-6 space-y-8">
          {/* Navegación de Pestañas */}
          <TabsList className="bg-muted/50 grid h-auto w-full grid-cols-3 py-2">
            <TabsTrigger
              value="diputados"
              className="py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm sm:text-base"
            >
              Diputados
            </TabsTrigger>
            <TabsTrigger
              value="senadores"
              className="py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm sm:text-base"
            >
              Senadores
            </TabsTrigger>
            <TabsTrigger
              value="parlamento"
              className="py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm sm:text-base"
            >
              P. Andino
            </TabsTrigger>
          </TabsList>

          {/* --- PESTAÑA DIPUTADOS --- */}
          <TabsContent value="diputados" className="space-y-6">
            {/* 1. Contexto Educativo Específico */}
            <Card className="border-slate-200 bg-slate-50/50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Cámara de Diputados
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Cámara Baja • 130 Miembros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>
                  Los diputados se eligen por{' '}
                  <strong>distritos electorales múltiples</strong> (regiones).
                  Sus funciones principales son iniciar el proceso legislativo,
                  aprobar leyes, interpelar y censurar ministros.
                </p>
              </CardContent>
            </Card>

            {/* 2. Herramienta Interactiva (El Filtro Regional) */}
            <DiputadosTab />
          </TabsContent>

          {/* --- PESTAÑA SENADORES --- */}
          <TabsContent value="senadores" className="space-y-6">
            {/* 1. Contexto Educativo Específico */}
            <Card className="border-slate-200 bg-slate-50/50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Cámara de Senadores
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Cámara Alta • 60 Miembros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>
                  La elección es <strong>mixta</strong>: 30 senadores se eligen
                  a nivel nacional (distrito único) y 30 por circunscripciones
                  regionales. Su función es revisar leyes y designar altas
                  autoridades.
                </p>
              </CardContent>
            </Card>

            {/* 2. Herramienta Interactiva */}
            <SenadoresTab />
          </TabsContent>

          {/* --- PESTAÑA PARLAMENTO ANDINO --- */}
          <TabsContent value="parlamento" className="space-y-6">
            {/* 1. Contexto Educativo Complejo */}
            <Card className="border-slate-200 bg-slate-50/50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Parlamento Andino
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Representación Internacional • 5 Titulares
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-600">
                  <p>
                    Representantes del Perú ante el órgano deliberante de la
                    Comunidad Andina. Se eligen en una lista única nacional.
                  </p>

                  {/* Datos Clave en Grid pequeño (Blanco neutro) */}
                  <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm">
                      <h4 className="mb-1 font-semibold text-slate-800">
                        Composición
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-xs text-slate-600">
                        <li>5 representantes titulares</li>
                        <li>10 representantes suplentes</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm">
                      <h4 className="mb-1 font-semibold text-slate-800">
                        Periodo 2026-2031
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-xs text-slate-600">
                        <li>Mandato irrenunciable</li>
                        <li>Reelección inmediata permitida</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Herramienta Interactiva */}
            <ParlamentoAndinoTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CongresoPage
