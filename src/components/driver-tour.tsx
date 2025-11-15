import React from 'react'

export default function DriverTour() {
  const [loading, setLoading] = React.useState(false)

  async function startTour() {
    setLoading(true)
    try {
      // dynamic import so the app won't fail if the package isn't installed yet
      // user should `npm install driver.js` and the CSS file will be imported here
      const mod = await import('driver.js')
      // driver.js may export default or named 'driver'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const driver: any = mod && (mod.default || mod.driver || mod)
      // import css
      try {
        await import('driver.js/dist/driver.css')
      } catch (err) {
        // CSS import failure shouldn't break functionality
        // the user can include the CSS separately if desired

        console.warn('driver.js CSS could not be imported automatically', err)
      }

      // choose steps depending on viewport: full (desktop) vs responsive (mobile)
      const isMobile =
        typeof window !== 'undefined' ? window.innerWidth < 1024 : false

      const desktopSteps = [
        {
          element: '[data-tour=header]',
          popover: {
            title: 'Encabezado',
            description:
              'Aquí está el título principal y accesos rápidos. Muestra el estado general.',
          },
        },
        {
          element: '[data-tour=view-mode]',
          popover: {
            title: 'Modo de vista',
            description: 'Cambia entre Mes, Semana y Día con estos botones.',
          },
        },
        {
          element: '[data-tour=calendar-grid]',
          popover: {
            title: 'Calendario',
            description:
              'La vista principal donde aparece el calendario (día/semana/mes). Haz clic en un día para ver actividades.',
          },
        },
        {
          element: '[data-tour=activities-list]',
          popover: {
            title: 'Actividades',
            description:
              'Lista de actividades filtradas por día y tipo. Selecciona para abrir la vista día.',
          },
        },
      ]

      const mobileSteps = [
        {
          // focus the user on the activities panel first on small screens
          element: '[data-tour=activities-list]',
          popover: {
            title: 'Actividades (móvil)',
            description:
              'Aquí verás las actividades del día. Puedes tocar una para abrir el detalle.',
          },
        },
        {
          element: '[data-tour=mobile-mini-calendar]',
          popover: {
            title: 'Mini calendario',
            description:
              'Usa este mini calendario para cambiar el día o navegar entre meses.',
          },
        },
      ]

      const steps = isMobile ? mobileSteps : desktopSteps

      // create driver instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const driverObj: any = driver({
        showProgress: true,
        allowClose: true,
        steps,
        // on mobile, prefer a bit of padding so the popover fits
        ...(isMobile ? { padding: 10 } : {}),
      })

      // start tour
      driverObj.drive()
    } catch (err) {
      console.error(
        'No se pudo iniciar el tour. ¿Instalaste driver.js? - npm install driver.js',
        err
      )
      // show a friendly fallback

      alert(
        'No se pudo iniciar la guía. Instala "driver.js" con: npm install driver.js'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={startTour}
      className="text-primary rounded border bg-white px-3 py-2 hover:shadow-sm"
      aria-label="Iniciar guía básica"
      title="Iniciar guía básica"
      type="button"
    >
      {loading ? 'Cargando...' : '¿Necesitas ayuda?'}
    </button>
  )
}
