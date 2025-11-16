// src/pages/Soy_Elector/Elector_principal.tsx

import React from 'react'
import { Hand } from 'lucide-react'

const ElectorPrincipal: React.FC = () => {
  return (
    <div className="bg-card flex h-full w-full flex-col items-center justify-center p-8">
      {/* Icono e indicación para desktop */}
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-6 flex items-center justify-center">
          <Hand className="text-primary mr-4 text-3xl" />
          <span className="text-primary text-xl font-semibold">
            Selecciona una opción del menú lateral
          </span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-card-foreground mb-6 text-4xl font-bold md:text-5xl">
          Bienvenido al Portal del Elector
        </h1>

        <p className="text-muted-foreground mb-12 text-xl leading-relaxed md:text-2xl">
          Toda la información que necesitas para tu jornada electoral está aquí.
        </p>

        {/* Tabla de características */}
        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-accent border-border rounded-lg border p-6 text-center">
            <div className="text-accent-foreground mb-3 text-2xl font-bold">
              Información
            </div>
            <div className="text-muted-foreground">
              Datos actualizados y verificados
            </div>
          </div>

          <div className="bg-accent border-border rounded-lg border p-6 text-center">
            <div className="text-accent-foreground mb-3 text-2xl font-bold">
              Guías
            </div>
            <div className="text-muted-foreground">
              Instrucciones paso a paso
            </div>
          </div>

          <div className="bg-accent border-border rounded-lg border p-6 text-center">
            <div className="text-accent-foreground mb-3 text-2xl font-bold">
              Recursos
            </div>
            <div className="text-muted-foreground">Herramientas útiles</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectorPrincipal
