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
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center',
        className
      )}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Siglas como fallback (siempre debajo) */}
      {siglas && (
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

      {/* Logo grande centrado si existe; si falla, se oculta y se ve la sigla */}
      {logo && (
        <img
          src={logo.startsWith('http') ? logo : `/assets/${logo}`}
          alt=""
          className="absolute max-h-[60%] max-w-[60%] object-contain"
          style={{ opacity: logoOpacity }}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      )}
    </div>
  )
}
