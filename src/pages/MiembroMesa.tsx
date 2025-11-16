//MIEMBRO MESA VERSION 3
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

import { mesaSimulada } from '@/data/MiembrosMesa'
import type { RoleKey, MemberInfo } from '@/data/MiembrosMesa'

export default function MiembroMesa() {
  const [dni, setDni] = useState('')
  const [isMember, setIsMember] = useState<null | boolean>(null)
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null)

  const [isVolunteer, setIsVolunteer] = useState(false)
  const [role, setRole] = useState<RoleKey | null>(null)
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [timeExpired, setTimeExpired] = useState(false)
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [volunteerCode, setVolunteerCode] = useState('')
  const [volunteerValidated, setVolunteerValidated] = useState(false)
  const [fromVolunteer, setFromVolunteer] = useState(false)
  const [ingresoCodigo, setIngresoCodigo] = useState('')
  const [codigoValidado, setCodigoValidado] = useState(false)
  const [dniError, setDniError] = useState('')

  const CODIGO_ONPE = 'ONPE2026'
  const CODIGO_VOLUNTARIO = 'VOL2026'

  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)

  //Para el cambio de la asistencia
  const [miembrosData, setMiembrosData] = useState(mesaSimulada)

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  // fecha global como fallback
  const fechaGeneral = new Date('2025-11-15T07:00:00')
  // calcularemos "disponible" después de identificar usuario
  const [disponible, setDisponible] = useState(false)

  const startTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: '#attendance-btn',
          popover: { title: 'Asistencia', description: 'Marca tu asistencia' },
        },
        {
          element: '#checklist-box',
          popover: { title: 'Checklist', description: 'Completa tus tareas' },
        },
        {
          element: '#open-btn',
          popover: { title: 'Apertura', description: 'Aperturar la mesa' },
        },
      ],
    })

    tour.drive()
  }

  useEffect(() => {
    // Evitar tutorial si viene por voluntario
    if (fromVolunteer) return

    // Evitar si ya se mostró antes
    if (hasSeenTutorial) return

    // Evitar si hay modal abierto
    if (showModal) return

    // Ejecutar tutorial SOLO cuando todo esté listo
    if (isMember && disponible) {
      setTimeout(() => {
        startTour()
        setHasSeenTutorial(true) // Marcar como mostrado
      }, 600)
    }
  }, [isMember, disponible, showModal, fromVolunteer, hasSeenTutorial])

  // Validar código asistencia
  const validarCodigoAsistencia = () => {
    if (ingresoCodigo.trim() === CODIGO_ONPE) {
      setCodigoValidado(true)
      setModalMessage('Código correcto. Ya puedes marcar asistencia.')
      setShowModal(true)
    } else {
      setModalMessage('Código incorrecto. Verifica con la ONPE.')
      setShowModal(true)
    }
  }

  // Validar código voluntario
  const validarCodigoVoluntario = () => {
    if (volunteerCode.trim() === CODIGO_VOLUNTARIO) {
      setVolunteerValidated(true)

      const rolesDisponibles = Object.entries(mesaSimulada)
        .filter(([, val]) => !val.presente)
        .map(([k]) => k as RoleKey)

      const rolAsignado = rolesDisponibles[0] || 'suplente2'

      setFromVolunteer(true)
      setRole(rolAsignado)
      setMemberInfo(mesaSimulada[rolAsignado])
      setIsMember(true)

      setModalMessage(
        `Acceso voluntario otorgado. Se asignó el rol: ${rolAsignado.toUpperCase()}`
      )
      setShowModal(true)
    } else {
      setModalMessage('Código ONPE incorrecto.')
      setShowModal(true)
    }
  }

  // Funciones por rol
  const rolesFunciones = {
    presidente: {
      Instalación: [
        '📦 Recibe el material electoral y verifica su contenido.',
        '🧾 Abre la cartilla de hologramas y firma la recepción.',
        '🖊️ Firma las cédulas de sufragio.',
        '🕘 Declara la apertura oficial de la mesa.',
      ],
      Sufragio: [
        '🧑‍⚖️ Verifica identidad del elector.',
        '🗳️ Entrega la cédula firmada.',
        '📋 Supervisa el proceso y resuelve incidencias.',
      ],
      Escrutinio: [
        '📥 Verifica que las cédulas tengan firma.',
        '🧮 Dirige conteo y firma actas.',
        '💻 Coordina uso del SEA.',
        '📦 Entrega material electoral.',
      ],
    },
    secretario: {
      Instalación: [
        '🗂️ Control de asistencia.',
        '📝 Llena actas de instalación.',
        '📁 Organiza documentos.',
      ],
      Sufragio: [
        '🔍 Verifica lista.',
        '🖊️ Indica dónde firmar.',
        '📋 Registra observaciones.',
      ],
      Escrutinio: ['📊 Anota votos.', '🧾 Llena acta.', '🗂️ Guarda en sobres.'],
    },
    tercer: {
      Instalación: [
        '📦 Coloca etiqueta de restos.',
        '🧾 Verifica carteles y relación.',
      ],
      Sufragio: ['🧷 Pega holograma.', '🪪 Devuelve DNI.'],
      Escrutinio: [
        '📥 Recibe cédulas.',
        '🗃️ Organiza.',
        '📦 Ayuda en entrega.',
      ],
    },
    suplente1: {},
    suplente2: {},
  } as const

  const rolesChecklist = {
    presidente: [
      'Verificar material A',
      'Firmar cartilla de hologramas',
      'Verificar cédulas',
    ],
    secretario: [
      'Control de asistencia',
      'Organizar actas',
      'Separar hoja de control',
    ],
    tercer: [
      'Colocar hologramas',
      'Preparar cabina',
      'Organizar caja de restos',
    ],
    suplente1: [],
    suplente2: [],
  } as const

  const verifyDni = () => {
    const dniIngresado = dni.trim()

    // Validaciones básicas
    if (dniIngresado.length === 0) {
      setDniError('El DNI no puede estar vacío.')
      return
    }

    if (!/^\d+$/.test(dniIngresado)) {
      setDniError('El DNI solo debe contener números.')
      return
    }

    if (dniIngresado.length !== 8) {
      setDniError('El DNI debe tener exactamente 8 dígitos.')
      return
    }

    setDniError('')

    let rolEncontrado: RoleKey | null = null

    for (const rol in mesaSimulada) {
      if (mesaSimulada[rol as RoleKey].dni === dniIngresado) {
        rolEncontrado = rol as RoleKey
        break
      }
    }

    // 👉 SI ES MIEMBRO DE MESA
    if (rolEncontrado) {
      const datosMiembro = mesaSimulada[rolEncontrado]

      // fecha habilitada individual o fecha general
      const fechaPersonal = datosMiembro.fechaHabilitada
        ? new Date(datosMiembro.fechaHabilitada)
        : fechaGeneral

      // estado habilitado
      setDisponible(new Date() >= fechaPersonal)

      setIsMember(true)
      setRole(rolEncontrado)
      setMemberInfo(datosMiembro)
      return // ← solo sale en este caso
    }

    // 👉 SI NO ES MIEMBRO (ANTES ESTO YA NO SE EJECUTABA)
    setIsMember(false)
    setModalMessage('El DNI no corresponde a un miembro de mesa.')
    setShowModal(true)
  }

  // Timer asistencia
  useEffect(() => {
    const limit = Date.now() + 1000 * 60 * 30
    const i = setInterval(() => {
      if (Date.now() > limit) setTimeExpired(true)
    }, 1000)
    return () => clearInterval(i)
  }, [])

  // Checklist completo
  const checklistCompleted = () => {
    if (!role) return false
    return rolesChecklist[role].every((t) => !!checklist[t])
  }

  const isInValidationScreen = isMember !== true && !volunteerValidated

  return (
    <div
      className={`min-h-screen p-4 ${
        isInValidationScreen
          ? 'flex items-center justify-center bg-gray-100'
          : 'space-y-8'
      }`}
    >
      <div
        className={`${isInValidationScreen ? 'w-full max-w-md' : 'mx-auto w-full max-w-3xl space-y-4 lg:space-y-8'}`}
      >
        {/* MODAL */}
        <AlertDialog open={showModal} onOpenChange={setShowModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Mensaje</AlertDialogTitle>
              <AlertDialogDescription>{modalMessage}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setShowModal(false)
                  setFromVolunteer(false)
                }}
              >
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/** VALIDACIÓN */}
        {isInValidationScreen && (
          <Card className="rounded-lg p-4 shadow-md transition-all lg:rounded-xl lg:p-6 lg:shadow-lg">
            <h2 className="mb-2 text-lg font-bold">
              Validación de Miembro de Mesa
            </h2>

            <Input
              id="dni-input"
              placeholder="Ingresa tu DNI"
              value={dni}
              onChange={(e) => {
                setDni(e.target.value)
                setDniError('') // limpiar error al escribir
              }}
            />

            {dniError && (
              <p className="mt-1 text-sm text-red-600">{dniError}</p>
            )}

            <Button onClick={verifyDni} className="mt-2 w-full">
              Validar
            </Button>

            {isMember === false && (
              <>
                <p className="mt-4 font-medium text-gray-700">
                  No eres miembro de mesa.
                </p>

                {/* BOTÓN VOLUNTARIO */}
                <Button
                  onClick={() => {
                    if (!disponible) {
                      // Mostrar mensaje informativo en modal
                      setModalMessage(
                        'Aún no puedes registrarte como voluntario. ' +
                          'El registro estará habilitado el 15/11/2026 a las 7:00 AM.'
                      )
                      setShowModal(true)
                    } else {
                      // Si ya es día de elecciones, recién permitir ingreso como voluntario
                      setIsVolunteer(true)
                    }
                  }}
                  className="mt-2 w-full"
                >
                  Ingresar como voluntario
                </Button>

                {/* SOLO MOSTRAR INPUT DE CÓDIGO SI LA FECHA ESTÁ HABILITADA */}
                {isVolunteer && disponible && (
                  <div className="mt-3 space-y-2">
                    <Input
                      placeholder="Código ONPE para voluntarios"
                      value={volunteerCode}
                      onChange={(e) => setVolunteerCode(e.target.value)}
                    />
                    <Button
                      onClick={validarCodigoVoluntario}
                      className="w-full"
                    >
                      Validar Código
                    </Button>
                  </div>
                )}

                {/* MENSAJE INFORMATIVO CUANDO NO ES FECHA */}
                {!disponible && (
                  <p className="mt-3 text-sm text-blue-600">
                    Este apartado estará disponible el 15/11/2026 desde las 7:00
                    AM.
                  </p>
                )}
              </>
            )}
          </Card>
        )}

        {/** BLOQUEO POR FECHA */}
        {isMember && !disponible && (
          <div className="flex min-h-screen items-center justify-center">
            <Card className="max-w-md rounded-lg p-6 text-center shadow-md lg:rounded-xl lg:p-8 lg:shadow-lg">
              {fromVolunteer ? (
                <>
                  <h2 className="mb-3 text-xl font-bold">
                    Aún no puedes ingresar
                  </h2>

                  <p className="mb-4 leading-relaxed text-gray-700">
                    La plataforma estará disponible el{' '}
                    <strong>15/11/2026 a las 7:00 AM</strong>.
                  </p>

                  <p className="mb-5 text-sm leading-relaxed text-blue-600">
                    Si el día de las elecciones faltan los miembros titulares o
                    suplentes, podrás apoyar como <strong>voluntario</strong>{' '}
                    siguiendo las indicaciones del Coordinador ONPE.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mb-3 text-xl font-bold">
                    Aún no puedes ingresar
                  </h2>

                  <p className="mb-3 leading-relaxed text-gray-700">
                    Has sido seleccionado como <strong>miembro de mesa</strong>.
                  </p>

                  <p className="mb-3 leading-relaxed text-gray-700">
                    La jornada electoral inicia el{' '}
                    <strong>15/11/2026 a las 7:00 AM</strong>.
                  </p>

                  <p className="mb-5 text-sm leading-relaxed font-medium text-red-600">
                    Si no te presentas puntualmente, podrías recibir una
                    <strong>
                      {' '}
                      multa establecida por el Jurado Nacional de
                      Elecciones{' '}
                    </strong>
                    .
                  </p>
                </>
              )}

              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setIsMember(null)
                  setRole(null)
                  setMemberInfo(null)
                  setFromVolunteer(false)
                }}
              >
                Volver
              </Button>
            </Card>
          </div>
        )}

        {/** CONTENIDO PRINCIPAL */}
        {isMember && disponible && (
          <>
            {/** INFORMACIÓN */}
            {memberInfo && (
              <Card className="flex flex-col gap-3 rounded-lg p-4 shadow-md transition-all lg:rounded-xl lg:p-6 lg:shadow-lg">
                <div>
                  <h3 className="mb-2 text-lg font-bold">
                    Información de tu Mesa
                  </h3>
                  <p>
                    <strong>🧑 Nombre:</strong> {memberInfo.nombre}
                  </p>
                  <p>
                    <strong>📍 Local:</strong> {memberInfo.local}
                  </p>
                  <p>
                    <strong>🪑 Mesa:</strong> {memberInfo.mesa}
                  </p>
                </div>

                {/* BOTÓN PARA REINICIAR EL TUTORIAL */}
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-500 text-blue-600 shadow-sm transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => {
                    setHasSeenTutorial(false) // habilita otra vez
                    setTimeout(() => startTour(), 300) // pequeño delay para suavidad
                  }}
                >
                  Ver tutorial otra vez
                </Button>
              </Card>
            )}

            {/** ASISTENCIA */}

            {!attendanceMarked && (
              <Card
                className="rounded-lg p-4 shadow-md transition-all lg:rounded-xl lg:p-6 lg:shadow-lg"
                id="attendance-btn"
              >
                <h3 className="font-semibold">Asistencia</h3>

                {!codigoValidado ? (
                  <>
                    <p className="mb-2 text-sm text-gray-600">
                      Ingresa el código proporcionado por la ONPE.
                    </p>
                    <Input
                      placeholder="Código ONPE"
                      value={ingresoCodigo}
                      onChange={(e) => setIngresoCodigo(e.target.value)}
                    />
                    <Button
                      className="mt-2 w-full"
                      onClick={validarCodigoAsistencia}
                    >
                      Validar código
                    </Button>
                  </>
                ) : (
                  <>
                    {timeExpired ? (
                      <p className="text-red-500">
                        No marcaste asistencia. Multa: 200 soles.
                      </p>
                    ) : (
                      <Button
                        onClick={() => {
                          const hora = new Date().toLocaleTimeString('es-PE', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })

                          setAttendanceMarked(true)

                          if (role) {
                            setMiembrosData((prev) => {
                              const actualizado = {
                                ...prev,
                                [role]: {
                                  ...prev[role],
                                  presente: true,
                                  horaIngreso: hora, // ⏰ Guardamos hora exacta
                                },
                              }

                              // Reflejar también en la info principal del usuario
                              setMemberInfo(actualizado[role])

                              return actualizado
                            })
                          }
                        }}
                        disabled={attendanceMarked}
                        className="w-full"
                      >
                        {attendanceMarked
                          ? 'Asistencia marcada'
                          : 'Marcar asistencia'}
                      </Button>
                    )}
                  </>
                )}
              </Card>
            )}

            {/** FUNCIONES */}
            {role && (
              <Card className="rounded-lg p-4 shadow-md transition-all lg:rounded-xl lg:p-6 lg:shadow-lg">
                <h3 className="mb-4 text-lg font-semibold">
                  Funciones del Rol ({role})
                </h3>

                <Accordion type="single" collapsible>
                  {Object.entries(rolesFunciones[role]).map(([sec, tareas]) => (
                    <AccordionItem key={sec} value={sec}>
                      <AccordionTrigger className="text-blue-600">
                        {sec}
                      </AccordionTrigger>
                      <AccordionContent>
                        {tareas.length ? (
                          tareas.map((t: string) => (
                            <p key={t} className="py-1 text-sm">
                              {t}
                            </p>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">
                            El suplente no tiene funciones asignadas.
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            )}

            {/* MIEMBROS DE LA MESA */}
            <Card className="rounded-lg p-4 shadow-md lg:rounded-xl lg:p-6 lg:shadow-lg">
              <Accordion type="single" collapsible>
                <AccordionItem value="mesa-general">
                  <AccordionTrigger className="text-lg font-semibold">
                    Miembros de la mesa
                  </AccordionTrigger>

                  <AccordionContent>
                    <Accordion type="multiple" className="mt-3 space-y-2">
                      {Object.entries(miembrosData).map(([rolKey, data]) => {
                        const estadoEsPresente = data.presente

                        return (
                          <AccordionItem key={rolKey} value={rolKey}>
                            {/* Header con Avatar + Rol + Nombre + Estado */}
                            <AccordionTrigger className="flex items-center justify-between capitalize">
                              <div className="flex items-center gap-3">
                                {/* FOTO DEL MIEMBRO */}
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={data.foto}
                                    alt={data.nombre}
                                  />
                                  <AvatarFallback>
                                    {data.nombre
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>

                                <span>
                                  {rolKey} — {data.nombre}
                                </span>
                              </div>

                              {/* ESTADO */}
                              <Badge
                                className={
                                  estadoEsPresente
                                    ? 'bg-green-600 text-white'
                                    : 'bg-red-600 text-white'
                                }
                              >
                                {estadoEsPresente ? 'Presente' : 'Ausente'}
                              </Badge>
                            </AccordionTrigger>

                            {/* Contenido interno */}
                            <AccordionContent>
                              <div className="ml-2 space-y-2 text-sm">
                                <p>
                                  <strong>🪪 DNI:</strong> {data.dni}
                                </p>

                                <p>
                                  <strong>📍 Local:</strong> {data.local}
                                </p>

                                <p>
                                  <strong>🪑 Mesa:</strong> {data.mesa}
                                </p>

                                <p className="flex items-center gap-2">
                                  <strong>Estado:</strong>
                                  <Badge
                                    className={
                                      estadoEsPresente
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                    }
                                  >
                                    {estadoEsPresente ? 'Presente' : 'Ausente'}
                                  </Badge>
                                </p>
                                {data.horaIngreso && (
                                  <p>
                                    <strong>⏰ Hora de ingreso:</strong>{' '}
                                    {data.horaIngreso}
                                  </p>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/** CHECKLIST */}
            {role && (
              <Card
                className="rounded-lg p-4 shadow-md transition-all lg:rounded-xl lg:p-6 lg:shadow-lg"
                id="checklist-box"
              >
                <h3 className="font-semibold">
                  Tareas por realizar como ({role})
                </h3>
                {rolesChecklist[role].map((task) => (
                  <div key={task} className="flex items-center gap-3 py-3">
                    <Checkbox
                      className="checkbox-strong"
                      checked={!!checklist[task]}
                      onCheckedChange={(v) =>
                        setChecklist((prev) => ({ ...prev, [task]: !!v }))
                      }
                    />
                    <span className="font-medium text-gray-700">{task}</span>
                  </div>
                ))}
              </Card>
            )}

            {/* PREGUNTAS FRECUENTES */}
            <Card className="rounded-lg p-4 shadow-md lg:rounded-xl lg:p-6 lg:shadow-lg">
              <Accordion type="single" collapsible>
                <AccordionItem value="faq-general">
                  <AccordionTrigger className="text-lg font-semibold">
                    Preguntas Frecuentes (FAQ)
                  </AccordionTrigger>

                  <AccordionContent>
                    {/* Acordeones internos */}
                    <Accordion
                      type="single"
                      collapsible
                      className="mt-4 space-y-2"
                    >
                      <AccordionItem value="faq1">
                        <AccordionTrigger>
                          ¿Qué hago si un miembro de mesa titular no llega a
                          tiempo?
                        </AccordionTrigger>
                        <AccordionContent>
                          Si un miembro titular no llega antes de la hora
                          límite, debe ser reemplazado por un suplente. Si no
                          hay suplentes, se debe convocar a un elector
                          voluntario con apoyo del coordinador ONPE.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq2">
                        <AccordionTrigger>
                          No puedo marcar asistencia, ¿qué hago?
                        </AccordionTrigger>
                        <AccordionContent>
                          Verifica que el código ONPE sea correcto. Si el
                          problema persiste, registra tu asistencia manualmente
                          con el secretario y comunícalo al coordinador ONPE.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq3">
                        <AccordionTrigger>
                          ¿Cómo debo firmar las cédulas?
                        </AccordionTrigger>
                        <AccordionContent>
                          Firma en el reverso de cada cédula con lapicero azul
                          antes de entregarla al elector. Una cédula sin firma
                          debe ser considerada no válida durante el escrutinio.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq4">
                        <AccordionTrigger>
                          ¿Puede votar alguien que perdió su DNI?
                        </AccordionTrigger>
                        <AccordionContent>
                          Solo pueden votar con DNI azul, DNI electrónico o DNI
                          vencido. No se aceptan copias, fotos ni documentos
                          distintos al DNI.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq5">
                        <AccordionTrigger>
                          El elector aparece como “ya votó”, pero dice que no.
                          ¿Qué hago?
                        </AccordionTrigger>
                        <AccordionContent>
                          Registra la incidencia y permite votar como “elector
                          observado”, siguiendo el procedimiento ONPE.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq6">
                        <AccordionTrigger>
                          ¿Qué hago si falta material electoral?
                        </AccordionTrigger>
                        <AccordionContent>
                          Debes comunicarte inmediatamente con el coordinador
                          ONPE. No se deben improvisar materiales no oficiales.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq7">
                        <AccordionTrigger>
                          ¿Los adultos mayores, embarazadas o personas con
                          discapacidad tienen prioridad?
                        </AccordionTrigger>
                        <AccordionContent>
                          Sí, tienen derecho a pasar directamente sin hacer
                          fila. El registro del voto es el mismo.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq8">
                        <AccordionTrigger>
                          La cámara secreta está dañada, ¿qué hago?
                        </AccordionTrigger>
                        <AccordionContent>
                          Asegura privacidad colocando un panel improvisado.
                          Nunca permitas que alguien vea el voto.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq9">
                        <AccordionTrigger>
                          ¿Qué pasa si el elector marca dos opciones?
                        </AccordionTrigger>
                        <AccordionContent>
                          Si marca dos candidatos de la misma elección, el voto
                          es nulo. Si la intención del voto es clara, puede ser
                          válido.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq10">
                        <AccordionTrigger>
                          ¿Qué hago si alguien graba o causa disturbios?
                        </AccordionTrigger>
                        <AccordionContent>
                          Pide que se retire, no confrontes y avisa al
                          coordinador o a la policía. Está prohibido grabar
                          dentro del aula.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq11">
                        <AccordionTrigger>
                          ¿Qué hago si llega un voluntario sin capacitación?
                        </AccordionTrigger>
                        <AccordionContent>
                          El presidente debe asignarle un rol vacío, explicarle
                          sus tareas y registrarlo.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="faq12">
                        <AccordionTrigger>
                          ¿Cuándo debo usar el Acta de Incidencias?
                        </AccordionTrigger>
                        <AccordionContent>
                          Debe llenarse en casos de errores de padrón,
                          incidentes de seguridad, fallas de material o eventos
                          relevantes.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/** APERTURA */}
            <Button
              id="open-btn"
              disabled={!attendanceMarked || !checklistCompleted()}
              className="w-full bg-green-600 text-white"
            >
              Aperturar Mesa
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
