import { useState, useEffect } from 'react'
import { Menu, Users, Volume2, Sun, Moon, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link, useLocation } from '@tanstack/react-router'
import LogoPrincipal from '@/assets/LOGO - Principal.png'

export function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [padronModalOpen, setPadronModalOpen] = useState(false)
  const [vozActive, setVozActive] = useState(false)

  // Inicializar el tema desde localStorage o usar 'light' por defecto
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as
        | 'light'
        | 'dark'
        | null
      return savedTheme || 'light'
    }
    return 'light'
  })

  // Efecto solo para aplicar la clase dark al documento
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleVoz = () => {
    setVozActive(!vozActive)
    // Aquí se implementará la lógica de "La Voz del Voto"
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="dark:bg-card/80 dark:border-border/70 dark:hover:bg-card/95 sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/95 hover:backdrop-blur-lg">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* 1. Izquierda - Logo/Nombre */}
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1 transition-opacity hover:opacity-80"
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <img
                  src={LogoPrincipal}
                  alt="Logo Principal"
                  className="object-contain"
                />
              </div>
              <span className="hidden text-xl font-bold text-blue-600 sm:block">
                TúEliges{' '}
                <span className="text-gray-900 dark:text-white">2026</span>
              </span>
            </Link>

            {/* 2. Centro - NavigationMenu (Desktop only) */}
            <div className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Link 1: Presidente */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/planchas-presidenciales"
                        className={`group dark:hover:bg-secondary/80 dark:hover:text-card-foreground dark:focus:bg-secondary/80 dark:focus:text-card-foreground inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 transition-all duration-300 hover:bg-slate-100/80 hover:text-slate-900 focus:bg-slate-100/80 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          location.pathname === '/planchas'
                            ? 'dark:bg-secondary/70 dark:text-card-foreground bg-slate-100/70 text-slate-900'
                            : 'dark:text-muted-foreground text-slate-600'
                        }`}
                      >
                        Presidente
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Link 2: Congreso y Parlamento */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/congreso"
                        className={`group dark:hover:bg-secondary/80 dark:hover:text-card-foreground dark:focus:bg-secondary/80 dark:focus:text-card-foreground inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 transition-all duration-300 hover:bg-slate-100/80 hover:text-slate-900 focus:bg-slate-100/80 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          location.pathname === '/congreso'
                            ? 'dark:bg-secondary/70 dark:text-card-foreground bg-slate-100/70 text-slate-900'
                            : 'dark:text-muted-foreground text-slate-600'
                        }`}
                      >
                        Congreso y Parlamento
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Link 3: Guía del Elector */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/elector"
                        className={`group dark:hover:bg-secondary/80 dark:hover:text-card-foreground dark:focus:bg-secondary/80 dark:focus:text-card-foreground inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 transition-all duration-300 hover:bg-slate-100/80 hover:text-slate-900 focus:bg-slate-100/80 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          location.pathname === '/elector'
                            ? 'dark:bg-secondary/70 dark:text-card-foreground bg-slate-100/70 text-slate-900'
                            : 'dark:text-muted-foreground text-slate-600'
                        }`}
                      >
                        Guía del Elector
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Link 4: Guía Miembro de Mesa */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/miembro-mesa"
                        className={`group dark:hover:bg-secondary/80 dark:hover:text-card-foreground dark:focus:bg-secondary/80 dark:focus:text-card-foreground inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 transition-all duration-300 hover:bg-slate-100/80 hover:text-slate-900 focus:bg-slate-100/80 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          location.pathname === '/miembro-mesa'
                            ? 'dark:bg-secondary/70 dark:text-card-foreground bg-slate-100/70 text-slate-900'
                            : 'dark:text-muted-foreground text-slate-600'
                        }`}
                      >
                        Guía Miembro de Mesa
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* 3. Derecha - Acciones Rápidas */}
            <div className="flex items-center gap-2">
              {/* Padrón Familiar */}
              <button
                onClick={() => setPadronModalOpen(true)}
                className="dark:text-muted-foreground dark:hover:bg-secondary/80 dark:hover:text-card-foreground flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-all duration-300 hover:scale-110 hover:bg-slate-100/80 hover:text-slate-900"
                aria-label="Padrón Familiar"
              >
                <Users className="h-5 w-5" />
              </button>

              {/* La Voz del Voto */}
              <button
                onClick={toggleVoz}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 ${
                  vozActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                    : 'dark:text-muted-foreground dark:hover:bg-secondary/80 dark:hover:text-card-foreground text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
                aria-label="La Voz del Voto"
              >
                <Volume2 className="h-5 w-5" />
              </button>

              {/* Toggle Tema */}
              <button
                onClick={toggleTheme}
                className="dark:text-muted-foreground dark:hover:bg-secondary/80 dark:hover:text-card-foreground flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-all duration-300 hover:scale-110 hover:bg-slate-100/80 hover:text-slate-900"
                aria-label="Cambiar Tema"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              {/* Menu Mobile Toggle */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="dark:text-muted-foreground dark:hover:bg-secondary/80 dark:hover:text-card-foreground flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-all duration-300 hover:scale-110 hover:bg-slate-100/80 hover:text-slate-900 lg:hidden"
                    aria-label="Menú"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="dark:bg-card/95 dark:border-border/70 w-[300px] border-r border-slate-200/70 bg-white/95 backdrop-blur-lg sm:w-[400px]"
                >
                  <SheetHeader className="mb-6">
                    <SheetTitle className="dark:text-card-foreground flex items-center gap-2 text-slate-900">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-purple-600 shadow-lg">
                        <span className="text-lg text-white">🗳️</span>
                      </div>
                      Menú de Navegación
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col space-y-4">
                    {/* Link Presidente */}
                    <Link
                      to="/planchas-presidenciales"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                        location.pathname === '/planchas'
                          ? 'dark:bg-secondary/80 dark:text-primary bg-blue-50/80 text-blue-700'
                          : 'dark:text-muted-foreground dark:hover:bg-secondary/80 text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <span className="text-xl">🏛️</span>
                      <span>Elección Presidencial</span>
                    </Link>

                    {/* Link Congreso */}
                    <Link
                      to="/congreso"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                        location.pathname === '/congreso'
                          ? 'dark:bg-secondary/80 dark:text-primary bg-blue-50/80 text-blue-700'
                          : 'dark:text-muted-foreground dark:hover:bg-secondary/80 text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <span className="text-xl">👥</span>
                      <span>Congreso y Parlamento</span>
                    </Link>

                    {/* Accordion: Guías y Herramientas */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="herramientas" className="border-0">
                        <AccordionTrigger className="dark:hover:bg-secondary/80 dark:text-muted-foreground rounded-lg px-4 py-3 text-slate-700 transition-all duration-300 hover:bg-slate-100/80 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🛠️</span>
                            <span>Guías y Herramientas</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-0">
                          <div className="flex flex-col space-y-2 pl-4">
                            <Link
                              to="/elector"
                              onClick={() => setMobileMenuOpen(false)}
                              className="dark:text-muted-foreground dark:hover:bg-secondary/80 flex items-center gap-3 rounded-lg px-4 py-2 text-slate-700 transition-all duration-300 hover:bg-slate-100/80"
                            >
                              <span>📖</span>
                              <span className="text-sm">Guía del Elector</span>
                            </Link>
                            <Link
                              to="/miembro-mesa"
                              onClick={() => setMobileMenuOpen(false)}
                              className="dark:text-muted-foreground dark:hover:bg-secondary/80 flex items-center gap-3 rounded-lg px-4 py-2 text-slate-700 transition-all duration-300 hover:bg-slate-100/80"
                            >
                              <span>👨‍⚖️</span>
                              <span className="text-sm">
                                Guía Miembro de Mesa
                              </span>
                            </Link>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal: Padrón Familiar */}
      <Dialog open={padronModalOpen} onOpenChange={setPadronModalOpen}>
        <DialogContent className="dark:bg-card/95 dark:border-border/70 border border-slate-200/70 bg-white/95 backdrop-blur-lg sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="dark:text-card-foreground flex items-center gap-2 text-slate-900">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              Padrón Familiar
            </DialogTitle>
            <DialogDescription className="dark:text-muted-foreground text-slate-600">
              Consulta la información electoral de tu familia en un solo lugar
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="dark:bg-muted/80 rounded-lg bg-slate-50/80 p-8 text-center backdrop-blur-sm">
              <Users className="dark:text-muted-foreground mx-auto mb-4 h-16 w-16 text-slate-400" />
              <h3 className="dark:text-card-foreground mb-2 text-slate-900">
                Próximamente Disponible
              </h3>
              <p className="dark:text-muted-foreground text-sm text-slate-600">
                Esta funcionalidad te permitirá ver la información electoral de
                todos los miembros de tu familia registrados en el padrón.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setPadronModalOpen(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast de La Voz del Voto */}
      {vozActive && (
        <div className="animate-in slide-in-from-bottom-5 fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-600/95 px-6 py-3 text-white shadow-lg backdrop-blur-md dark:border-blue-400/30 dark:bg-blue-600/95">
          <Volume2 className="h-5 w-5" />
          <span className="text-sm">La Voz del Voto está activa</span>
          <button
            onClick={toggleVoz}
            className="ml-2 rounded p-1 transition-all duration-300 hover:scale-110 hover:bg-blue-700/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  )
}
