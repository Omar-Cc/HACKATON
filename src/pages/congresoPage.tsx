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
    <div className="space-y-8">
      {/* Hero Section */}
      <HeroSection />

      <div className="container mx-auto px-4">
        <Tabs defaultValue="diputados" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diputados">Diputados</TabsTrigger>
            <TabsTrigger value="senadores">Senadores</TabsTrigger>
            <TabsTrigger value="parlamento">Parlamento Andino</TabsTrigger>
          </TabsList>

          <TabsContent value="diputados" id="diputados">
            <DiputadosTab />
          </TabsContent>

          <TabsContent value="senadores" id="senadores">
            <SenadoresTab />
          </TabsContent>

          <TabsContent value="parlamento" id="parlamento">
            <ParlamentoAndinoTab />
          </TabsContent>
        </Tabs>

        {/* Explicación: Qué son los Diputados y contexto de la bicameralidad (2026) */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">¿Qué son los Diputados?</h2>
          <p className="text-muted-foreground mt-2">
            La Cámara de Diputados es la cámara baja del parlamento. Para las
            elecciones generales de 2026 se restaurará el sistema bicameral en
            el Perú, por lo que el Congreso estará compuesto por dos cámaras: la
            Cámara de Diputados (130 miembros) y la Cámara de Senadores (60
            miembros).
          </p>

          <div className="mt-4 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Candidaturas a la Cámara de Diputados</CardTitle>
                <CardDescription>
                  La cámara baja del parlamento, que tendrá 130 miembros.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Los diputados se eligen por distritos electorales múltiples y
                  representan a la población de cada región según la
                  distribución aprobada. Sus funciones incluyen iniciar el
                  proceso legislativo, aprobar leyes, interpelar y, en ciertos
                  casos, censurar ministros.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Candidaturas a la Cámara de Senadores</CardTitle>
                <CardDescription>
                  La cámara alta del parlamento, que tendrá 60 miembros.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  La elección de senadores es mixta: existen senadores elegidos
                  a nivel nacional (por un distrito único nacional) y senadores
                  elegidos por circunscripciones regionales (representación
                  regional). En total serán 60 senadores: 30 a nivel nacional y
                  30 regionales (con asignaciones específicas por región).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Candidatos al Parlamento Andino</CardTitle>
                <CardDescription>
                  Representantes peruanos ante el Parlamento Andino
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Además de las candidaturas para las cámaras nacionales, la
                  cédula de 2026 incluirá una lista para elegir a los
                  representantes del Perú ante el Parlamento Andino.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CongresoPage
