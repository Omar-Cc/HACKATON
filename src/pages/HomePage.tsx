// 1. Importar useState y useEffect
import { useState, useEffect } from 'react'
import {
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

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-show')
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Principal() {
  useScrollReveal()

  // Estado para el enlace activo del navbar
  const [activeLink, setActiveLink] = useState('#match')

  // Scroll-spy para cambiar el estado según la sección visible
  useEffect(() => {
    const sectionIds = ['#match', '#candidatos', '#calendario', '#roles']
    const sections = sectionIds.map((id) => document.querySelector(id))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  // Click en el logo: volver al inicio (hero)
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveLink('#match') // dejamos “Funciones” activo por defecto
  }

  return (
    <>
      {/* Estilos globales para scroll suave y animaciones */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }

          .reveal-from-left {
            transform: translateX(-40px);
          }

          .reveal-from-right {
            transform: translateX(40px);
          }

          .reveal-show {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }

          /* Animación palabra por palabra del título principal */
          .hero-title-word {
            display: inline-block;
            opacity: 0;
            transform: translateY(30px);
            animation: heroDrop 0.6s ease forwards;
          }

          .hero-title-word-1 { animation-delay: 0.05s; }
          .hero-title-word-2 { animation-delay: 0.10s; }
          .hero-title-word-3 { animation-delay: 0.15s; }
          .hero-title-word-4 { animation-delay: 0.20s; }
          .hero-title-word-5 { animation-delay: 0.25s; }
          .hero-title-word-6 { animation-delay: 0.30s; }
          .hero-title-word-7 { animation-delay: 0.35s; }
          .hero-title-word-8 { animation-delay: 0.40s; }

          @keyframes heroDrop {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div className="font-inter min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-white/90 shadow-md backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-5">
            <div className="flex h-16 items-center justify-between">
              {/* Logo / Marca: vuelve al inicio */}
              <button
                type="button"
                onClick={handleLogoClick}
                className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-blue-600 focus:outline-none"
              >
                <span className="rounded-xl bg-white/90 px-3 py-1 text-sm font-bold text-blue-600 shadow-sm">
                  VotoContigo
                </span>
                <span className="text-gray-900">2026</span>
              </button>

              {/* “Sidebar” superior */}
              <div className="hidden items-center space-x-8 text-sm font-medium md:flex">
                <a
                  href="#match"
                  onClick={() => setActiveLink('#match')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#match'
                      ? 'border-blue-600 font-semibold text-blue-600'
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  Funciones
                </a>
                <a
                  href="#candidatos"
                  onClick={() => setActiveLink('#candidatos')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#candidatos'
                      ? 'border-blue-600 font-semibold text-blue-600'
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  Herramientas
                </a>
                <a
                  href="#calendario"
                  onClick={() => setActiveLink('#calendario')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#calendario'
                      ? 'border-blue-600 font-semibold text-blue-600'
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  Calendario
                </a>
                <a
                  href="#roles"
                  onClick={() => setActiveLink('#roles')}
                  className={`border-b-2 py-5 transition-all duration-300 ${
                    activeLink === '#roles'
                      ? 'border-blue-600 font-semibold text-blue-600'
                      : 'border-transparent text-gray-900 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  Guías
                </a>
              </div>
            </div>
          </nav>
        </header>

        {/* Contenido principal */}
        <main>
          {/* HERO */}
          <section
            id="hero"
            className="reveal relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white"
          >
            {/* Imagen de persona votando de fondo, muy suave */}
            <div className="pointer-events-none absolute inset-0 select-none">
              <img
                src="https://images.unsplash.com/photo-1605840214719-0e34effb8452?auto=format&fit=crop&w=1600&q=80"
                alt="Persona votando"
                className="h-full w-full object-cover opacity-15 mix-blend-soft-light"
              />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
              {/* Icono: urna con Perú dentro */}
              <div className="mb-8 flex justify-center">
                <div className="rounded-3xl bg-white p-6 shadow-2xl">
                  <svg
                    viewBox="0 0 64 64"
                    className="h-14 w-14 text-blue-600"
                    aria-hidden="true"
                  >
                    {/* Urna */}
                    <rect
                      x="8"
                      y="24"
                      width="48"
                      height="30"
                      rx="4"
                      fill="currentColor"
                      opacity="0.12"
                    />
                    <rect
                      x="12"
                      y="20"
                      width="40"
                      height="24"
                      rx="4"
                      fill="#ffffff"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    {/* Ranura */}
                    <rect
                      x="22"
                      y="18"
                      width="20"
                      height="4"
                      rx="2"
                      fill="currentColor"
                    />
                    {/* Silueta simple de Perú */}
                    <path
                      d="M30 28 L34 24 L38 26 L37 30 L39 33 L35 37 L33 36 L31 38 L29 35 L30 32 Z"
                      fill="currentColor"
                      opacity="0.9"
                    />
                  </svg>
                </div>
              </div>

              {/* Título con animación palabra por palabra */}
              <h2 className="text-5xl leading-tight font-extrabold">
                <span className="hero-title-word hero-title-word-1">La</span>{' '}
                <span className="hero-title-word hero-title-word-2">
                  plataforma
                </span>{' '}
                <span className="hero-title-word hero-title-word-3">que</span>{' '}
                <span className="hero-title-word hero-title-word-4">te</span>{' '}
                <span className="hero-title-word hero-title-word-5">ayuda</span>{' '}
                <span className="hero-title-word hero-title-word-6">a</span>{' '}
                <span className="hero-title-word hero-title-word-7 text-yellow-300">
                  decidir
                </span>{' '}
                <span className="hero-title-word hero-title-word-8 text-yellow-300">
                  mejor.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg font-medium text-blue-100">
                Accede a información verificada, comparador de candidatos, hojas
                de vida y todo lo esencial para el proceso electoral 2026.
              </p>

              {/* Botón CTA */}
              <div className="mt-10 flex justify-center">
                <a
                  href="#match"
                  className="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-bold text-blue-800 shadow-xl transition-transform duration-300 hover:scale-105"
                >
                  Explorar VotoContigo 2026
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </section>

          {/* SECCIÓN: MULTIDISPOSITIVO */}
          <section
            id="multidispositivo"
            className="reveal reveal-from-left bg-white py-20"
          >
            <div className="mx-auto max-w-7xl px-6 text-center">
              <h2 className="text-4xl font-extrabold">
                Accede desde{' '}
                <span className="text-blue-600">cualquier dispositivo</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-gray-600">
                Tu{' '}
                <span className="font-bold text-gray-900">voto informado</span>{' '}
                siempre contigo. Plataforma optimizada para laptop, tablet y
                celular.
              </p>

              <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 shadow-md transition-all hover:shadow-xl">
                  <Laptop className="mb-4 h-16 w-16 text-blue-600" />
                  <h3 className="text-xl font-bold">Laptop</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Ideal para analizar{' '}
                    <span className="font-semibold">propuestas</span> y planes
                    de gobierno con mayor detalle.
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 shadow-md transition-all hover:shadow-xl">
                  <Tablet className="mb-4 h-16 w-16 text-blue-600" />
                  <h3 className="text-xl font-bold">Tablet</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Perfecta para comparar candidatos de forma{' '}
                    <span className="font-semibold">cómoda y visual</span>.
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 shadow-md transition-all hover:shadow-xl">
                  <Smartphone className="mb-4 h-16 w-16 text-blue-600" />
                  <h3 className="text-xl font-bold">Celular</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Información <span className="font-semibold">rápida</span> y
                    accesible estés donde estés.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ¿QUÉ PUEDO HACER AQUÍ? */}
          <section id="match" className="reveal scroll-mt-16 bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-extrabold">
                ¿Qué puedo hacer en{' '}
                <span className="text-blue-600">VotoContigo 2026?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center font-medium text-gray-600">
                Un conjunto de{' '}
                <span className="font-bold">funciones claves</span> para tomar
                decisiones informadas,{' '}
                <span className="font-bold">
                  pensando en todos los peruanos.
                </span>
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
                  <p className="mt-2 text-sm text-gray-600">
                    Responde preguntas clave y descubre qué candidatos se
                    alinean más con tus{' '}
                    <span className="font-semibold">
                      valores y prioridades.
                    </span>
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
                    Selecciona{' '}
                    <span className="font-semibold">2 o más candidatos</span> y
                    compararemos sus{' '}
                    <span className="font-semibold">
                      propuestas por sector.
                    </span>
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
                  <p className="mt-2 text-sm text-gray-600">
                    Pregunta{' '}
                    <span className="font-semibold">“¿Es verdad que…?”</span> y
                    recibe respuestas basadas en fuentes verificadas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HERRAMIENTAS */}
          <section
            id="candidatos"
            className="reveal reveal-from-right scroll-mt-16 bg-white py-20"
          >
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-extrabold">
                Herramientas para un voto{' '}
                <span className="text-blue-600">consciente</span>
              </h2>

              <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                    <Star className="h-7 w-7 text-purple-600" strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Favoritos</h3>
                  <p className="text-sm font-normal text-gray-600">
                    <span className="font-semibold">Sigue</span> candidatos que
                    te importan y recibe sus{' '}
                    <span className="font-semibold">
                      últimas actualizaciones.
                    </span>
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
                  <p className="mt-2 text-sm text-gray-600">
                    Revisa <span className="font-semibold">trayectoria</span>,
                    estudios, cargos y antecedentes de cada candidato.
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
                    Aprende a marcar correctamente para evitar{' '}
                    <span className="font-semibold">votos nulos</span> o
                    viciados.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CALENDARIO ELECTORAL */}
          <section
            id="calendario"
            className="reveal scroll-mt-16 bg-white py-20"
          >
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-extrabold">
                Calendario Electoral{' '}
                <span className="text-blue-600">Clave</span>
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-center font-medium text-gray-600">
                No pierdas de vista las{' '}
                <span className="font-bold">fechas más importantes</span> del
                proceso electoral 2026.{' '}
                <span className="font-bold">¡CONTAMOS contigo!</span>
              </p>

              <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="transform rounded-2xl bg-gray-50 p-8 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100">
                    <CalendarDays
                      className="h-7 w-7 text-red-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Sorteo Miembros de Mesa
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Publicación oficial de quienes integrarán las mesas de
                    sufragio.
                  </p>
                  <p className="mt-3 text-sm font-bold text-red-600">
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
                  <h3 className="text-xl font-semibold">Cierre de Campañas</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Último día para realizar propaganda política autorizada.
                  </p>
                  <p className="mt-3 text-sm font-bold text-blue-600">
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
                  <h3 className="text-xl font-semibold">
                    Día de Elección (1ra Vuelta)
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Jornada de votación a nivel nacional para elegir
                    autoridades.
                  </p>
                  <p className="mt-3 text-sm font-bold text-green-600">
                    Quedan 48 días
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* GUÍAS PARA ELECTOR Y MIEMBRO DE MESA */}
          <section
            id="roles"
            className="reveal reveal-from-right scroll-mt-16 bg-gray-50 py-20"
          >
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center text-4xl font-extrabold">
                Tu votación,{' '}
                <span className="text-blue-600">más fácil y divertida</span>
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-center font-medium text-gray-600">
                Contamos con guías específicas según{' '}
                <span className="font-semibold">tu rol</span> en el proceso
                electoral.
              </p>

              <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="transform rounded-2xl bg-white p-8 shadow transition-shadow duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                    <MapPin className="h-7 w-7 text-blue-600" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Información para Electores
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    Consulta tu{' '}
                    <span className="font-semibold">local de votación</span>,
                    recomendaciones clave y pasos para vivir una experiencia
                    rápida y segura.
                  </p>
                  <a
                    href="#elector"
                    className="mt-2 inline-flex items-center text-sm font-bold text-blue-600"
                  >
                    Ver mi local
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>

                <div className="transform rounded-2xl bg-white p-8 shadow transition-shadow duration-300 hover:scale-[1.03] hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
                    <ClipboardCheck
                      className="h-7 w-7 text-green-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Guía para Miembros de Mesa
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    Accede al checklist de instalación, guías animadas y
                    solución de dudas frecuentes para cumplir tu{' '}
                    <span className="font-semibold">rol cívico</span> sin
                    estrés.
                  </p>
                  <a
                    href="#miembro"
                    className="mt-2 inline-flex items-center text-sm font-bold text-green-600"
                  >
                    Acceder a guías
                    <ArrowRight className="ml-1 h-4 w-4" />
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
