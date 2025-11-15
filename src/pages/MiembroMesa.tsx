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
import type { RoleKey } from '@/data/MiembrosMesa'
interface MemberInfo {
  nombre: string
  dni: string
  local: string
  mesa: string
  presente: boolean
}

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

  const CODIGO_ONPE = 'ONPE2026'
  const CODIGO_VOLUNTARIO = 'VOL2026'

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  // Fecha habilitada
  const fechaHabilitada = new Date('2025-11-15T07:00:00')
  const ahora = new Date()
  const disponible = ahora >= fechaHabilitada

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
    // No iniciar tutorial si viene por voluntario
    if (fromVolunteer) return

    if (isMember && disponible && !showModal) {
      setTimeout(() => startTour(), 600)
    }
  }, [isMember, disponible, showModal, fromVolunteer])

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
    let rolEncontrado: RoleKey | null = null

    for (const rol in mesaSimulada) {
      if (mesaSimulada[rol as RoleKey].dni === dniIngresado) {
        rolEncontrado = rol as RoleKey
        break
      }
    }

    if (rolEncontrado) {
      setIsMember(true)
      setRole(rolEncontrado)
      setMemberInfo(mesaSimulada[rolEncontrado])
    } else {
      setIsMember(false)
      setModalMessage('El DNI no corresponde a un miembro de mesa.')
      setShowModal(true)
    }
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
        className={`${isInValidationScreen ? 'w-full max-w-md' : 'space-y-4'}`}
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
          <Card className="p-4">
            <h2 className="mb-2 text-lg font-bold">
              Validación de Miembro de Mesa
            </h2>

            <Input
              id="dni-input"
              placeholder="Ingresa tu DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />

            <Button onClick={verifyDni} className="mt-2 w-full">
              Validar
            </Button>

            {isMember === false && (
              <>
                <p className="mt-4">No eres miembro de mesa.</p>
                <Button onClick={() => setIsVolunteer(true)}>
                  Ingresar como voluntario
                </Button>

                {isVolunteer && (
                  <div className="mt-3 space-y-2">
                    <Input
                      placeholder="Código ONPE para voluntarios"
                      value={volunteerCode}
                      onChange={(e) => setVolunteerCode(e.target.value)}
                    />
                    <Button onClick={validarCodigoVoluntario}>
                      Validar Código
                    </Button>
                  </div>
                )}

                {!disponible && (
                  <p className="mt-2 text-blue-600">
                    Este apartado estará disponible el 12/04/2026 desde las 7:00
                    AM.
                  </p>
                )}
              </>
            )}
          </Card>
        )}

        {/** BLOQUEO POR FECHA */}
        {isMember && !disponible && <></>}

        {/** CONTENIDO PRINCIPAL */}
        {isMember && disponible && (
          <>
            {/** INFORMACIÓN */}
            {memberInfo && (
              <Card className="p-4">
                <h3 className="mb-2 text-lg font-bold">
                  Información de tu Mesa
                </h3>
                <p>
                  <strong>🧑 Miembro:</strong> {memberInfo.nombre}
                </p>
                <p>
                  <strong>📍 Local:</strong> {memberInfo.local}
                </p>
                <p>
                  <strong>🪑 Mesa:</strong> {memberInfo.mesa}
                </p>
              </Card>
            )}

            {/** ASISTENCIA */}

            {!attendanceMarked && (
              <Card className="p-4" id="attendance-btn">
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
                        onClick={() => setAttendanceMarked(true)}
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
              <Card className="p-4">
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

            {/** MIEMBROS */}
            {/* MIEMBROS DE LA MESA */}
            <Card className="p-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="mesa">
                  <AccordionTrigger className="text-lg font-semibold">
                    Miembros de la mesa
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="mt-3 space-y-3">
                      {Object.entries(mesaSimulada).map(([rolKey, data]) => (
                        <div key={rolKey} className="border-b pb-2">
                          <p className="font-medium capitalize">
                            {rolKey} — {data.nombre}
                          </p>

                          <div className="mt-1 ml-2 space-y-1 text-sm">
                            <p>
                              <strong>🪪 DNI:</strong> {data.dni}
                            </p>
                            <p>
                              <strong>📍 Local:</strong> {data.local}
                            </p>
                            <p>
                              <strong>🪑 Mesa:</strong> {data.mesa}
                            </p>
                            <p>
                              <strong>Estado:</strong>{' '}
                              <Badge>
                                {data.presente ? 'Presente' : 'Ausente'}
                              </Badge>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/** CHECKLIST */}
            {role && (
              <Card className="p-4" id="checklist-box">
                <h3 className="font-semibold">
                  Tareas por realizar como ({role})
                </h3>
                {rolesChecklist[role].map((task) => (
                  <div key={task} className="flex items-center gap-2 py-2">
                    <Checkbox
                      checked={!!checklist[task]}
                      onCheckedChange={(v) =>
                        setChecklist((prev) => ({ ...prev, [task]: !!v }))
                      }
                    />
                    <span>{task}</span>
                  </div>
                ))}
              </Card>
            )}

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
