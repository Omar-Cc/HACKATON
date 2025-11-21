import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PartidoWatermarkProps {
  logo?: string
  siglas?: string
  color?: string
  className?: string
  logoOpacity?: number
  siglasOpacity?: number
}

export function PartidoWatermark({
  logo,
  siglas,
  color = '#000000',
  className,
  logoOpacity = 0.18,
  siglasOpacity = 0.06,
}: PartidoWatermarkProps) {
  // Estado para controlar si la imagen falló al cargar
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center',
        className
      )}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. LOGICA DE SIGLAS:
          Se muestran SOLO si:
          a) No se pasó ningún logo
          b) O se pasó un logo pero falló al cargar (imgError === true)
      */}
      {(!logo || imgError) && siglas && (
        <span
          className="text-9xl font-black"
          style={{
            color: color,
            opacity: siglasOpacity,
          }}
        >
          {siglas}
        </span>
      )}

      {/* 2. LOGICA DE LOGO:
          Se muestra si existe y NO ha dado error.
          Si da error (onError), cambiamos el estado para ocultar esto y mostrar las siglas.
      */}
      {logo && !imgError && (
        <img
          src={logo.startsWith('http') ? logo : `/assets/${logo}`}
          alt=""
          className="absolute max-h-[60%] max-w-[60%] object-contain"
          style={{ opacity: logoOpacity }}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}
