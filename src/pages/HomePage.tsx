// 1. Importar useState y AHORA TAMBIÉN useEffect
import { useState, useEffect } from 'react'
import {
  Vote,
  ArrowRight,
  HeartHandshake,
  Scaling,
  ShieldOff,
  Star,
  FileText,
  MousePointerClick,
  Laptop,
  Tablet,
  Smartphone,
  CalendarDays,
  MapPin,
  ClipboardCheck,
} from 'lucide-react'

export default function Principal() {
  // 2. Estado para el enlace activo, inicializado en '#match'
  const [activeLink, setActiveLink] = useState('#match')

  // Hook useEffect para el "Scroll-Spy" automático
  useEffect(() => {
    // Lista de IDs de las secciones que queremos observar
    const sectionIds = ['#match', '#candidatos', '#calendario', '#roles']

    // Seleccionamos los elementos del DOM
    const sections = sectionIds.map((id) => document.querySelector(id))

    // Opciones para el observer: se activa cuando el 40% de la sección es visible
    const options = {
      root: null, // Observa en relación al viewport
      rootMargin: '0px',
      threshold: 0.4, // 40% de visibilidad
    }

    // El callback que se ejecuta cuando una sección entra o sale
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          // Si la sección está visible, actualizamos el estado
          setActiveLink(`#${entry.target.id}`)
        }
      })
    }

    // Creamos el observer
    const observer = new IntersectionObserver(callback, options)

    // Observamos cada sección
    sections.forEach((section) => {
      // El 'if (section)' es crucial. Evita errores si el
      // elemento no se encuentra por cualquier motivo.
      if (section) {
        observer.observe(section)
      }
    })

    // Función de limpieza: deja de observar cuando el componente se desmonta
    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, []) // El array vacío [] asegura que esto solo se ejecute al montar el componente

  return (
    <>
      {/* CAMBIO 1: Añadido <style> para el scroll-behavior: smooth */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      <div className="font-inter min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-white/80 shadow-md backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-5">
            <div className="flex h-16 items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-blue-600">
                ElecInfo 2026
              </h1>

              <div className="hidden items-center space-x-8 text-sm font-medium md:flex">
                <a
                  href="#match"
                  onClick={() => setActiveLink('#match')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#match'
                      ? 'border-blue-600 text-blue-600' // Estilo activo
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  } `}
                >
                  Funciones Claves
                </a>
                <a
                  href="#candidatos"
                  onClick={() => setActiveLink('#candidatos')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#candidatos'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  } `}
                >
                  Skills
                </a>
                <a
                  href="#calendario"
                  onClick={() => setActiveLink('#calendario')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#calendario'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  } `}
                >
                  Elector
                </a>
                <a
                  href="#roles"
                  onClick={() => setActiveLink('#roles')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#roles'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  } `}
                >
                  Miembro de mesa
                </a>
              </div>
            </div>
          </nav>
        </header>

        {/* Contenido principal */}
        <main>
          {/* HERO */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="mx-auto max-w-7xl px-6 py-20 text-center">
              {/* ICONO */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-2xl bg-white p-5 shadow-xl">
                  <Vote className="h-14 w-14 text-blue-600" strokeWidth={2} />
                </div>
              </div>

              {/* TITULAR */}
              <h2 className="font-inter text-5xl leading-tight font-extrabold">
                La plataforma que te ayuda a decidir mejor.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-normal text-blue-100">
                Match electoral, información verificada, comparador, hojas de
                vida, y herramientas para votantes y miembros de mesa.
              </p>

              {/* BOTÓN ÚNICO */}
              <div className="mt-10 flex justify-center">
                <a
                  href="#match"
                  className="group inline-flex transform items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  Probar App ElecInfo 2026
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </section>

          {/* SECCIÓN: MULTIDISPOSITIVO */}
          <section id="multidispositivo" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">
              <h2 className="mb-4 text-center text-4xl font-bold">
                Accede desde cualquier dispositivo
              </h2>
              <p className="mx-auto mt-3 mb-14 max-w-2xl text-center text-gray-600">
                Tu voto informado siempre contigo. Nuestra plataforma se adapta
                perfectamente a tu laptop, tablet o celular.
              </p>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 shadow-sm">
                  <Laptop
                    className="mb-4 h-16 w-16 text-blue-600"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-semibold">Laptop</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Análisis detallado en pantalla grande.
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 shadow-sm">
                  <Tablet
                    className="mb-4 h-16 w-16 text-blue-600"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-semibold">Tablet</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Compara candidatos cómodamente.
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 shadow-sm">
                  <Smartphone
                    className="mb-4 h-16 w-16 text-blue-600"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-semibold">Celular</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Información rápida estés donde estés.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN ¿QUÉ PUEDO HACER AQUÍ? */}
          {/* CAMBIO 2: Añadido scroll-mt-16 (altura de la navbar) */}
          <section id="match" className="scroll-mt-16 bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-bold">
                ¿Qué puedo hacer en ElecInfo 2026?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
                Un MVP diseñado para ayudarte a tomar decisiones informadas
                rápidamente.
              </p>

              <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="transform rounded-2xl bg-white p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                    <HeartHandshake
                      className="h-7 w-7 text-blue-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Match electoral</h3>
                  <p className="mb-3 text-sm font-normal text-gray-600">
                    Responde un quizz o pregunta al chatbot. Te mostramos los
                    candidatos que se alinean contigo.
                  </p>
                  <p className="text-xs font-medium text-blue-600">
                    MVP: coincidencias por tema.
                  </p>
                </div>

                <div className="transform rounded-2xl bg-white p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
                    <Scaling
                      className="h-7 w-7 text-green-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Comparador</h3>
                  <p className="mb-3 text-sm font-normal text-gray-600">
                    Selecciona 2 o más candidatos y compararemos sus propuestas
                    por tema.
                  </p>
                  <p className="text-xs font-medium text-green-600">
                    MVP: “Versus” por palabras clave.
                  </p>
                </div>

                <div className="transform rounded-2xl bg-white p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100">
                    <ShieldOff
                      className="h-7 w-7 text-red-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">
                    Detector de desinformación
                  </h3>
                  <p className="mb-3 text-sm font-normal text-gray-600">
                    Pregunta “¿Es verdad que…?”. El chatbot responde con datos
                    verificados.
                  </p>
                  <p className="text-xs font-medium text-red-600">
                    MVP: base de datos + IA.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HERRAMIENTAS */}
          {/* CAMBIO 2: Añadido scroll-mt-16 (altura de la navbar) */}
          <section id="candidatos" className="scroll-mt-16 bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-bold">
                Herramientas para un voto consciente
              </h2>

              <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                    <Star className="h-7 w-7 text-purple-600" strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Favoritos</h3>
                  <p className="text-sm font-normal text-gray-600">
                    Sigue candidatos que te importan y recibe actualizaciones
                    clave.
                  </p>
                </div>

                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100">
                    <FileText
                      className="h-7 w-7 text-yellow-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Hojas de vida</h3>
                  <p className="text-sm font-normal text-gray-600">
                    Historial político, estudios, cargos, denuncias y
                    trayectoria.
                  </p>
                </div>

                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                    <MousePointerClick
                      className="h-7 w-7 text-blue-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Simulador de voto</h3>
                  <p className="text-sm font-normal text-gray-600">
                    Aprende a marcar correctamente tu voto y evita anulaciones.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CALENDARIO ELECTORAL */}
          <section id="calendario" className="scroll-mt-16 bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-bold">
                Calendario Electoral Clave
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-center text-gray-600">
                Sigue las fechas más importantes del proceso electoral 2026. No
                te pierdas ningún hito.
              </p>

              <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100">
                    <CalendarDays
                      className="h-7 w-7 text-red-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Sorteo Miembros de Mesa
                  </h3>
                  <p className="mb-3 text-sm font-normal text-gray-600">
                    Publicación oficial de quienes conformarán las mesas de
                    sufragio.
                  </p>
                  <p className="text-sm font-bold text-red-600">
                    Quedan 20 días
                  </p>
                </div>

                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                    <CalendarDays
                      className="h-7 w-7 text-blue-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Cierre de Campañas
                  </h3>
                  <p className="mb-3 text-sm font-normal text-gray-600">
                    Fecha límite para que los partidos realicen propaganda
                    electoral.
                  </p>
                  <p className="text-sm font-bold text-blue-600">
                    Quedan 45 días
                  </p>
                </div>

                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
                    <CalendarDays
                      className="h-7 w-7 text-green-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Día de Elección (1ra Vuelta)
                  </h3>
                  <p className="mb-3 text-sm font-normal text-gray-600">
                    Jornada de votación nacional para presidente y congresistas.
                  </p>
                  <p className="text-sm font-bold text-green-600">
                    Quedan 48 días
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* GUÍAS PARA ELECTOR Y MIEMBRO DE MESA */}
          <section id="roles" className="scroll-mt-16 bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-bold">
                Tu Votación, Más Fácil
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-center text-gray-600">
                Preparamos guías y herramientas específicas para tu rol en las
                elecciones.
              </p>

              <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Se eliminó id="elector" y scroll-mt-16 de esta tarjeta */}
                <div className="transform rounded-2xl bg-white p-8 shadow transition-shadow duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                    <MapPin className="h-7 w-7 text-blue-600" strokeWidth={2} />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">
                    Información para Electores
                  </h3>
                  <p className="mb-3 text-sm font-normal text-gray-700">
                    Consulta tu local de votación, descarga un mapa de tu mesa y
                    revisa recomendaciones clave (horarios, DNI) para un voto
                    rápido y seguro.
                  </p>
                  <a
                    href="#elector"
                    className="group inline-flex items-center text-sm font-bold text-blue-600"
                  >
                    Ver mi local
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                {/* Se eliminó id="miembro" y scroll-mt-16 de esta tarjeta */}
                <div className="transform rounded-2xl bg-white p-8 shadow transition-shadow duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
                    <ClipboardCheck
                      className="h-7 w-7 text-green-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">
                    Guía para Miembro de Mesa
                  </h3>
                  <p className="mb-3 text-sm font-normal text-gray-700">
                    Accede al checklist de instalación, guías animadas de
                    escrutinio y solución de problemas comunes. Cumple tu deber
                    cívico sin estrés.
                  </p>
                  <a
                    href="#miembro"
                    className="group inline-flex items-center text-sm font-bold text-green-600"
                  >
                    Acceder a guías
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-800 py-6">
          <p className="text-center text-sm font-normal text-gray-400">
            © 2026 — ElecInfo · Hackathon UTP · Innovative Minds
          </p>
        </footer>
      </div>
    </>
  )
}
