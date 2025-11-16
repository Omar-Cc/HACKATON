import { Users, Building2, Globe, Calendar, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground px-6 py-12">
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Columna izquierda: texto principal */}
          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit border-none bg-white/20 text-white">
              Cambio Histórico 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold">
              Perú regresa al Congreso Bicameral
            </h1>
            <p className="text-primary-foreground/90 mb-6 text-lg">
              Después de más de <strong>30 años</strong>, el Perú vuelve a
              elegir un poder legislativo con dos cámaras: Diputados y
              Senadores, marcando un hito en nuestra democracia.
            </p>

            {/* Estadísticas rápidas */}
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
                <Users className="mx-auto mb-1 h-6 w-6" />
                <div className="text-2xl font-bold">190</div>
                <div className="text-xs">Legisladores totales</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
                <Building2 className="mx-auto mb-1 h-6 w-6" />
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs">Cámaras legislativas</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
                <Calendar className="mx-auto mb-1 h-6 w-6" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs">Años de mandato</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">
                Elecciones 2026: Primer proceso electoral bicameral del siglo
                XXI
              </h3>
              <Button variant="secondary" asChild>
                <a href="#cronograma">Ver cronograma electoral</a>
              </Button>
            </div>
          </div>

          {/* Columna derecha: cards informativas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-3">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-1 text-4xl">130</h3>
                <p className="text-muted-foreground text-sm">Diputados</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Por distrito múltiple
                </p>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-3">
                  <Building2 className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-1 text-4xl">60</h3>
                <p className="text-muted-foreground text-sm">Senadores</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  30+30 mixto
                </p>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-3">
                  <Globe className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-1 text-4xl">5</h3>
                <p className="text-muted-foreground text-sm">
                  Parlamento Andino
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Representación regional
                </p>
              </div>
            </div>

            <div className="bg-card/10 text-primary-foreground rounded-lg border border-white/20 p-4 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <p className="mb-1 text-4xl">+30</p>
                <p className="text-sm text-white/90">Años después</p>
                <p className="mt-1 text-xs text-white/80">Última vez: 1992</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
