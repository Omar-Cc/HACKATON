import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DriverTour from '@/components/driver-tour'

function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1)
  const startWeekDay = firstOfMonth.getDay()

  const cells: { date: Date; inMonth: boolean }[] = []

  const startDate = new Date(firstOfMonth)
  startDate.setDate(firstOfMonth.getDate() - startWeekDay)

  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    cells.push({ date: d, inMonth: d.getMonth() === month })
  }

  return {
    cells,
    monthLabel: firstOfMonth.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    }),
  }
}

type Activity = {
  date: string
  time?: string
  label: string
  type: 'elector' | 'miembro'
  color?: string
}

const activitiesList: Activity[] = [
  {
    date: '2025-11-30',
    time: '09:00',
    label: 'Elecciones Primarias – Votación afiliados',
    type: 'elector',
    color: 'bg-sky-200',
  },
  {
    date: '2025-12-07',
    time: '09:00',
    label: 'Elecciones Primarias – Delegados',
    type: 'elector',
    color: 'bg-sky-300',
  },
  {
    date: '2026-01-15',
    time: '10:00',
    label: 'Difusión de candidatos finales',
    type: 'elector',
    color: 'bg-emerald-200',
  },
  {
    date: '2026-02-01',
    time: '20:00',
    label: 'Debate presidencial',
    type: 'elector',
    color: 'bg-emerald-300',
  },
  {
    date: '2026-04-12',
    time: '08:00',
    label: 'Elección General (primera vuelta)',
    type: 'elector',
    color: 'bg-indigo-200',
  },
  {
    date: '2026-06-07',
    time: '08:00',
    label: 'Segunda vuelta presidencial (si aplica)',
    type: 'elector',
    color: 'bg-indigo-300',
  },
  {
    date: '2026-04-20',
    time: '11:00',
    label: 'Proclamación de resultados primera vuelta',
    type: 'elector',
    color: 'bg-indigo-400',
  },

  {
    date: '2026-01-29',
    time: '09:30',
    label: 'Sorteo de miembros de mesa',
    type: 'miembro',
    color: 'bg-amber-200',
  },
  {
    date: '2026-02-01',
    time: '09:30',
    label: 'Capacitación de miembros de mesa',
    type: 'miembro',
    color: 'bg-amber-300',
  },
  {
    date: '2026-04-12',
    time: '07:00',
    label: 'Instalación de mesa / Votación',
    type: 'miembro',
    color: 'bg-amber-400',
  },
  {
    date: '2026-04-12',
    time: '17:00',
    label: 'Cierre de mesas y conteo de votos',
    type: 'miembro',
    color: 'bg-red-200',
  },
  {
    date: '2026-04-15',
    time: '18:00',
    label: 'Conteo oficial final y registro de actas',
    type: 'miembro',
    color: 'bg-red-300',
  },
  {
    date: '2026-04-22',
    time: '10:00',
    label: 'Entrega de material electoral a ONPE',
    type: 'miembro',
    color: 'bg-amber-500',
  },

  {
    date: '2026-04-25',
    time: '11:00',
    label: 'Cierre de campaña post primera vuelta',
    type: 'elector',
    color: 'bg-sky-400',
  },
  {
    date: '2026-06-10',
    time: '12:00',
    label: 'Proclamación de resultados segunda vuelta',
    type: 'elector',
    color: 'bg-indigo-500',
  },
]

function eventsForDate(dateKey: string) {
  return activitiesList.filter((a) => a.date === dateKey)
}

function formatKey(d: Date) {
  return d.toISOString().slice(0, 10)
}

export default function CalendarioPage() {
  const today = new Date()
  const [refDate, setRefDate] = React.useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [activityFilter, setActivityFilter] = React.useState<
    'todos' | 'elector' | 'miembro'
  >('todos')
  const [viewMode, setViewMode] = React.useState<'mes' | 'semana' | 'dia'>(
    'dia'
  )
  const [selectedDate, setSelectedDate] = React.useState<string>(
    formatKey(today)
  )
  const [pendingScrollHour, setPendingScrollHour] = React.useState<
    number | null
  >(null)
  const { cells, monthLabel } = buildMonthGrid(
    refDate.getFullYear(),
    refDate.getMonth()
  )

  const dayLabel = new Date(selectedDate).toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  function weekRangeLabelFromDate(d: Date) {
    const start = new Date(d)
    start.setDate(d.getDate() - d.getDay())
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    const optsMonth = { month: 'long' } as const
    const startDay = start.getDate()
    const endDay = end.getDate()
    const startMonth = start.toLocaleString(undefined, optsMonth)
    const endMonth = end.toLocaleString(undefined, optsMonth)
    const year = end.getFullYear()
    if (start.getMonth() === end.getMonth()) {
      return `Del ${startDay} al ${endDay} de ${endMonth} ${year}`
    }
    return `Del ${startDay} ${startMonth} al ${endDay} ${endMonth} ${year}`
  }
  const weekLabel = weekRangeLabelFromDate(new Date(selectedDate))

  function buildWeekCells(baseDate: Date) {
    const weekStart = new Date(baseDate)
    // set to sunday of that week
    const d = weekStart.getDay()
    weekStart.setDate(baseDate.getDate() - d)
    const arr: { date: Date; inMonth: boolean }[] = []
    for (let i = 0; i < 7; i++) {
      const dd = new Date(weekStart)
      dd.setDate(weekStart.getDate() + i)
      arr.push({ date: dd, inMonth: dd.getMonth() === baseDate.getMonth() })
    }
    return arr
  }
  const weekCells = buildWeekCells(new Date(selectedDate))
  const [mobileMonth, setMobileMonth] = React.useState<Date>(
    () => new Date(selectedDate)
  )
  const [tempSelectedDay, setTempSelectedDay] = React.useState<string | null>(
    null
  )

  React.useEffect(() => {
    const sd = new Date(selectedDate)
    if (
      sd.getFullYear() !== mobileMonth.getFullYear() ||
      sd.getMonth() !== mobileMonth.getMonth()
    ) {
      setMobileMonth(new Date(sd.getFullYear(), sd.getMonth(), 1))
    }
  }, [selectedDate, mobileMonth])

  const { cells: mobileCells } = buildMonthGrid(
    mobileMonth.getFullYear(),
    mobileMonth.getMonth()
  )
  const showSidebar = viewMode === 'dia'
  const calendarSpan = viewMode === 'dia' ? 'lg:col-span-2' : 'lg:col-span-3'

  // Activities available according to current activityFilter
  const visibleActivities = React.useMemo(
    () =>
      activitiesList.filter((a) =>
        activityFilter === 'todos' ? true : a.type === activityFilter
      ),
    [activityFilter]
  )

  // combobox state & refs
  const activitiesRef = React.useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [selectedActivity, setSelectedActivity] =
    React.useState<Activity | null>(null)

  const makeActivityKey = (a: Activity) =>
    `${a.date}::${a.time ?? ''}::${a.label}`

  // load persisted selection
  React.useEffect(() => {
    try {
      const k = localStorage.getItem('calendario:selectedActivity')
      if (k) {
        const found =
          activitiesList.find((a) => makeActivityKey(a) === k) || null
        setSelectedActivity(found)
      }
    } catch (e) {
      console.warn(e)
    }
  }, [])

  // click outside to close
  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!activitiesRef.current) return
      if (!activitiesRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  function ensureSelectVisible() {
    const el = activitiesRef.current
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function handleSelectActivity(a: Activity) {
    try {
      const k = makeActivityKey(a)
      localStorage.setItem('calendario:selectedActivity', k)
      setSelectedActivity(a)
    } catch (err) {
      console.warn(err)
    }
    setOpen(false)
    openDayAndScroll(a.date, a.time)
  }

  function navigate(offset: number) {
    if (viewMode === 'mes') {
      setRefDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
      )
    } else if (viewMode === 'semana') {
      const d = new Date(selectedDate)
      d.setDate(d.getDate() + offset * 7)
      setSelectedDate(formatKey(d))
      setViewMode('semana')
    } else {
      // día
      const d = new Date(selectedDate)
      d.setDate(d.getDate() + offset)
      setSelectedDate(formatKey(d))
      setViewMode('dia')
    }
  }

  function openDayAndScroll(date: string, time?: string) {
    setSelectedDate(date)
    setViewMode('dia')
    if (time) {
      const h = Number(time.split(':')[0])
      if (!Number.isNaN(h)) setPendingScrollHour(h)
    }
  }

  React.useEffect(() => {
    if (viewMode !== 'dia' || pendingScrollHour == null) return
    const id = setTimeout(() => {
      const el = document.getElementById(`hour-${pendingScrollHour}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setPendingScrollHour(null)
    }, 120)
    return () => clearTimeout(id)
  }, [viewMode, selectedDate, pendingScrollHour])

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-[1200px]">
        <div
          data-tour="header"
          className="bg-primary mb-6 flex items-center justify-between rounded-lg px-6 py-6 text-white"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              Calendario ElecInfo
            </h1>
          </div>
          <div>
            <DriverTour />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main calendar area */}
          <Card
            data-tour="calendar-grid"
            className={`order-2 hidden lg:order-1 lg:block ${calendarSpan} overflow-hidden p-0`}
          >
            <CardHeader className="hidden items-center justify-between px-6 py-4 lg:flex">
              <div>
                <div className="text-muted-foreground text-xs"></div>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(-1)}
                  >
                    ‹
                  </Button>
                  <CardTitle className="mt-1 text-lg">
                    {viewMode === 'mes'
                      ? monthLabel
                      : viewMode === 'semana'
                        ? weekLabel
                        : dayLabel}
                  </CardTitle>
                  <Button size="sm" variant="ghost" onClick={() => navigate(1)}>
                    ›
                  </Button>
                </div>
              </div>
              <div data-tour="view-mode" className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'mes' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setViewMode('mes')
                    const sd = new Date(selectedDate)
                    setRefDate(new Date(sd.getFullYear(), sd.getMonth(), 1))
                  }}
                >
                  Mes
                </Button>
                <Button
                  variant={viewMode === 'semana' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('semana')}
                >
                  Semana
                </Button>
                <Button
                  variant={viewMode === 'dia' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('dia')}
                >
                  Día
                </Button>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              {/* Content varies by view mode */}
              {viewMode === 'mes' && (
                <div className="mt-2 grid grid-cols-7 gap-2">
                  {cells.map((cell, idx) => {
                    const key = formatKey(cell.date)
                    const events = eventsForDate(key)
                    const isToday = formatKey(cell.date) === formatKey(today)
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedDate(key)
                          setViewMode('dia')
                        }}
                        className={`min-h-24 cursor-pointer rounded-lg border p-2 ${cell.inMonth ? 'bg-white' : 'text-muted-foreground bg-gray-50'} flex flex-col justify-start gap-2`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}
                          >
                            {cell.date.getDate()}
                          </div>
                          {isToday && (
                            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px]">
                              Hoy
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          {events.slice(0, 3).map((ev: Activity, i: number) => (
                            <div
                              key={i}
                              role="button"
                              tabIndex={0}
                              onClick={() => openDayAndScroll(ev.date, ev.time)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter')
                                  openDayAndScroll(ev.date, ev.time)
                              }}
                              className="group focus:ring-primary/30 flex cursor-pointer items-center gap-3 truncate rounded-md border border-gray-100 bg-white px-3 py-1 transition-all duration-150 hover:shadow-md focus:ring-2 focus:outline-none"
                            >
                              <span
                                className={`inline-block h-6 w-2 rounded-full ${ev.color ?? 'bg-primary/40'}`}
                              />
                              <div className="truncate text-[12px] text-ellipsis">
                                {ev.time ? `${ev.time} • ` : ''}
                                {ev.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {viewMode === 'semana' && (
                <div className="mt-2 grid grid-cols-7 gap-3">
                  {weekCells.map((cell, idx) => {
                    const key = formatKey(cell.date)
                    const events = eventsForDate(key).filter((a) =>
                      activityFilter === 'todos'
                        ? true
                        : a.type === activityFilter
                    )
                    const isToday = formatKey(cell.date) === formatKey(today)
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedDate(key)
                          setViewMode('dia')
                        }}
                        className={`min-h-36 cursor-pointer rounded-lg border p-3 ${cell.inMonth ? 'bg-white' : 'text-muted-foreground bg-gray-50'} flex flex-col justify-start`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div
                            className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-muted-foreground'}`}
                          >
                            {cell.date.toLocaleString(undefined, {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                          {events.length > 0 && (
                            <Badge className="px-2 py-0.5">
                              {events.length}
                            </Badge>
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          {events.slice(0, 4).map((ev: Activity, i: number) => (
                            <div
                              key={i}
                              role="button"
                              tabIndex={0}
                              onClick={() => openDayAndScroll(ev.date, ev.time)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter')
                                  openDayAndScroll(ev.date, ev.time)
                              }}
                              className="focus:ring-primary/30 flex transform cursor-pointer items-center gap-3 overflow-hidden rounded-md border border-gray-100 bg-white text-[13px] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg focus:ring-2 focus:outline-none"
                            >
                              <div
                                className={`h-10 w-1.5 ${ev.color ?? 'bg-primary/40'}`}
                              />
                              <div className="min-w-0 flex-1 px-3 py-2">
                                <div className="truncate font-medium">
                                  {ev.label}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  {ev.time ?? ''}
                                </div>
                              </div>
                              <div className="px-3">
                                <span className="text-muted-foreground text-xs">
                                  {ev.type === 'elector'
                                    ? 'Votante'
                                    : 'Miembro'}
                                </span>
                              </div>
                            </div>
                          ))}
                          {events.length === 0 && (
                            <div className="text-muted-foreground text-xs">
                              Sin actividades
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {viewMode === 'dia' && (
                <div className="mt-2">
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const hour = 7 + i // from 7:00 to 20:00
                      const hourLabel = `${String(hour).padStart(2, '0')}:00`
                      const events = eventsForDate(selectedDate).filter((a) =>
                        activityFilter === 'todos'
                          ? true
                          : a.type === activityFilter
                      )
                      const eventsThisHour = events.filter(
                        (e) => e.time && Number(e.time.split(':')[0]) === hour
                      )
                      const now = new Date()
                      const isToday = formatKey(now) === selectedDate
                      const isCurrentHour = isToday && now.getHours() === hour
                      return (
                        <div
                          id={`hour-${hour}`}
                          key={hour}
                          className={`flex items-start gap-4 ${isCurrentHour ? 'bg-primary/5 rounded-lg p-2' : ''}`}
                        >
                          <div className="text-muted-foreground w-24 text-right text-xs">
                            {hourLabel}
                          </div>
                          <div className="flex-1">
                            {eventsThisHour.length > 0 ? (
                              eventsThisHour.map((ev, idx) => (
                                <div key={idx} className="mb-2">
                                  <div className="flex overflow-hidden rounded-lg border bg-white shadow-sm">
                                    <div
                                      className={`w-1.5 ${ev.color ?? 'bg-primary/40'}`}
                                    />
                                    <div className="flex-1 p-3">
                                      <div className="flex items-center justify-between gap-3">
                                        <div className="text-sm font-medium">
                                          {ev.label}
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                          {ev.time}
                                        </div>
                                      </div>
                                      <div className="text-muted-foreground mt-1 text-xs">
                                        {ev.type}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-muted-foreground text-xs">
                                No hay actividades programadas
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right sidebar - activities */}
          <div
            className={`order-1 space-y-4 lg:order-2 ${showSidebar ? 'lg:block' : 'lg:hidden'}`}
          >
            <Card>
              {/* Mobile header (visible on small screens) - white bg with blue accent */}
              <div className="flex items-center gap-3 rounded-t-lg border-b bg-white px-4 py-3 shadow-sm lg:hidden">
                <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-md text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-primary text-sm font-semibold">
                    Calendario Electoral
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Próximas actividades
                  </div>
                </div>
              </div>

              {/* Desktop header */}
              <CardHeader className="hidden flex-col items-start gap-3 px-6 py-4 lg:flex">
                <CardTitle>Actividades</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    className="rounded-full"
                    variant={activityFilter === 'todos' ? 'default' : 'ghost'}
                    onClick={() => setActivityFilter('todos')}
                  >
                    Todos
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    variant={activityFilter === 'elector' ? 'default' : 'ghost'}
                    onClick={() => setActivityFilter('elector')}
                  >
                    Votante
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    variant={activityFilter === 'miembro' ? 'default' : 'ghost'}
                    onClick={() => setActivityFilter('miembro')}
                  >
                    Miembro de Mesa
                  </Button>
                </div>
              </CardHeader>

              <CardContent
                data-tour="activities-list"
                className="space-y-3 px-4 pt-0 pb-4 lg:pt-4"
              >
                {/* Combobox (select) — muestra actividades según el filtro seleccionado */}
                <div className="mb-3 px-2">
                  <label className="mb-2 block text-sm font-medium">
                    Buscar actividad
                  </label>
                  <div className="relative" ref={activitiesRef}>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !open
                        if (next) ensureSelectVisible()
                        setOpen(next)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault()
                          if (!open) {
                            setOpen(true)
                            ensureSelectVisible()
                            setTimeout(() => {
                              const first =
                                activitiesRef.current?.querySelector(
                                  '[role="option"]'
                                ) as HTMLElement | null
                              first?.focus()
                            }, 50)
                          }
                        }
                        if (e.key === 'Escape') setOpen(false)
                      }}
                      className="focus:ring-primary flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left text-sm shadow-sm hover:shadow-md focus:ring-2"
                      aria-haspopup="listbox"
                      aria-expanded={open}
                    >
                      <span className="text-muted-foreground truncate text-sm">
                        {selectedActivity
                          ? selectedActivity.label
                          : 'Selecciona una actividad...'}
                      </span>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-muted-foreground h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {open && (
                      <ul
                        role="listbox"
                        tabIndex={-1}
                        className="absolute right-0 left-0 z-40 mt-2 max-h-56 overflow-auto rounded-lg border bg-white py-1 text-sm shadow-lg"
                      >
                        {visibleActivities.map((a, i) => (
                          <li key={`${a.date}-${a.time}-${i}`}>
                            <button
                              role="option"
                              tabIndex={0}
                              onClick={() => handleSelectActivity(a)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  handleSelectActivity(a)
                                }
                                if (e.key === 'ArrowDown') {
                                  ;(
                                    e.currentTarget.parentElement?.nextElementSibling?.querySelector(
                                      'button'
                                    ) as HTMLElement | null
                                  )?.focus()
                                }
                                if (e.key === 'ArrowUp') {
                                  ;(
                                    e.currentTarget.parentElement?.previousElementSibling?.querySelector(
                                      'button'
                                    ) as HTMLElement | null
                                  )?.focus()
                                }
                                if (e.key === 'Escape') setOpen(false)
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50"
                            >
                              {a.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Mobile pill filters */}
                <div className="mb-2 flex gap-3 lg:hidden">
                  <button
                    onClick={() => setActivityFilter('todos')}
                    className={`rounded-full px-4 py-2 ${activityFilter === 'todos' ? 'bg-primary text-white' : 'border bg-white'}`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setActivityFilter('elector')}
                    className={`rounded-full px-4 py-2 ${activityFilter === 'elector' ? 'bg-primary text-white' : 'border bg-white'}`}
                  >
                    Elector
                  </button>
                  <button
                    onClick={() => setActivityFilter('miembro')}
                    className={`rounded-full px-4 py-2 ${activityFilter === 'miembro' ? 'bg-primary text-white' : 'border bg-white'}`}
                  >
                    Miembro de Mesa
                  </button>
                </div>

                {/* Selected date header (mobile) */}
                <div className="mt-2 mb-2 px-2 lg:hidden">
                  <div className="text-muted-foreground text-sm">
                    Día seleccionado
                  </div>
                  <div className="text-base font-semibold">
                    {new Date(selectedDate).toLocaleDateString(undefined, {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </div>
                </div>

                {/* Mini calendar (mobile) */}
                <div className="mt-2 px-2 lg:hidden">
                  <div className="mb-2 flex items-center justify-between">
                    <button
                      aria-label="Mes anterior"
                      onClick={() =>
                        setMobileMonth(
                          new Date(
                            mobileMonth.getFullYear(),
                            mobileMonth.getMonth() - 1,
                            1
                          )
                        )
                      }
                      className="rounded-md p-1 hover:bg-gray-100"
                    >
                      ‹
                    </button>
                    <div className="text-sm font-medium">
                      {mobileMonth.toLocaleString(undefined, {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <button
                      aria-label="Mes siguiente"
                      onClick={() =>
                        setMobileMonth(
                          new Date(
                            mobileMonth.getFullYear(),
                            mobileMonth.getMonth() + 1,
                            1
                          )
                        )
                      }
                      className="rounded-md p-1 hover:bg-gray-100"
                    >
                      ›
                    </button>
                  </div>
                  <div className="mt-0 mb-3 grid grid-cols-7 gap-1">
                    {mobileCells.map((cell, idx) => {
                      const key = formatKey(cell.date)
                      const isSelected = key === selectedDate
                      const hasEvents = eventsForDate(key).length > 0
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedDate(key)
                            setTempSelectedDay(key)
                            // scroll activities list into view on mobile for visibility
                            setTimeout(() => {
                              const el = document.querySelector(
                                '[data-tour="activities-list"]'
                              ) as HTMLElement | null
                              if (el)
                                el.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                })
                            }, 120)
                            // clear temporary highlight
                            setTimeout(() => setTempSelectedDay(null), 900)
                          }}
                          className={`flex h-12 w-full items-center justify-center rounded-md text-sm ${cell.inMonth ? 'bg-transparent' : 'text-muted-foreground bg-transparent'} ${isSelected ? 'ring-2 ring-red-300' : ''} ${tempSelectedDay === key ? 'ring-4 ring-red-200' : ''}`}
                        >
                          <div className="relative">
                            {isSelected ? (
                              <span className="inline-block rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                                {cell.date.getDate()}
                              </span>
                            ) : hasEvents ? (
                              <span className="bg-primary inline-block rounded px-2 py-0.5 text-sm text-white">
                                {cell.date.getDate()}
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                {cell.date.getDate()}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {activitiesList
                  .filter(
                    (a) =>
                      a.date === selectedDate &&
                      (activityFilter === 'todos'
                        ? true
                        : a.type === activityFilter)
                  )
                  .sort((a, b) =>
                    a.date === b.date
                      ? (a.time || '').localeCompare(b.time || '')
                      : a.date.localeCompare(b.date)
                  )
                  .map((act) => {
                    return (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => openDayAndScroll(act.date, act.time)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter')
                            openDayAndScroll(act.date, act.time)
                        }}
                        key={`${act.date}-${act.time ?? ''}-${act.type}`}
                        className="flex cursor-pointer items-center gap-4 rounded-lg border bg-white p-5 text-lg shadow-md hover:shadow-lg lg:p-3 lg:text-sm"
                      >
                        {/* Colored accent bar (more llamativo) */}
                        <div
                          className={`h-12 w-3 rounded-l ${act.color ?? 'bg-primary/40'}`}
                        />

                        <div className="flex-1 px-3">
                          <div className="text-sm font-semibold">
                            {act.label}
                          </div>
                          <div className="text-muted-foreground mt-1 text-xs">
                            {act.time} •{' '}
                            {act.type === 'elector' ? 'Votante' : 'Miembro'}
                          </div>
                        </div>

                        <div className="text-muted-foreground hidden text-xs lg:block">
                          {act.time}
                        </div>
                      </div>
                    )
                  })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
