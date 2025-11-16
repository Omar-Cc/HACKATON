// src/pages/Soy_Elector/Simulador_Votacion.tsx

import React, { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import {
  CheckCircle,
  X,
  Box,
  Check,
  ArrowLeft,
  Circle,
  Plus,
  AlertTriangle,
  User,
} from 'lucide-react'
import clsx from 'clsx'
import { toast } from 'sonner'

// --- DATOS FALSOS (MOCK DATA) ---
const presidentialCandidatos = [
  {
    id: 'p1',
    nombre: 'Carlos Mendoza',
    partido: 'PARTIDO POLITICO LA FAMILIA PRIMERO',
    logo: '👟',
  },
  {
    id: 'p2',
    nombre: 'María González',
    partido: 'Partido Progreso Nacional',
    logo: '🔵',
  },
  {
    id: 'p3',
    nombre: 'Ana Flores',
    partido: 'Unión por el Cambio',
    logo: '🟣',
  },
]

const congressionalParties = [
  { id: 'c1', nombre: 'PARTIDO POLITICO FELICES POR SIEMPRE', logo: '🦜' },
  { id: 'c2', nombre: 'PARTIDO POLITICO LA FAMILIA PRIMERO', logo: '👟' },
]

type PenType = 'x' | 'plus' | 'check' | 'circle'

// --- COMPONENTES INTERNOS ---

// Paginación (actualizada a 11 pasos)
const PaginationDots: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => (
  <div className="my-6 flex items-center justify-center gap-3">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={clsx(
          'h-2 w-2 rounded-full',
          current === i + 1 ? 'bg-primary' : 'bg-gray-300'
        )}
      />
    ))}
  </div>
)

// Selector de Bolígrafo (Símbolos en negro/foreground)
const PenSelector: React.FC<{
  selectedPen: PenType | null
  onSelect: (pen: PenType) => void
}> = ({ selectedPen, onSelect }) => (
  <div className="bg-card border-border mt-6 rounded-lg border p-4 shadow-md">
    <h3 className="text-foreground mb-3 text-center text-lg font-semibold">
      Selecciona tu marcador
    </h3>
    <div className="flex justify-around">
      <button
        onClick={() => onSelect('x')}
        className={clsx(
          'rounded-lg p-4',
          selectedPen === 'x' ? 'bg-accent' : 'hover:bg-accent/50'
        )}
        aria-label="Marcar con X"
      >
        <X className="text-foreground text-4xl" />
      </button>
      <button
        onClick={() => onSelect('plus')}
        className={clsx(
          'rounded-lg p-4',
          selectedPen === 'plus' ? 'bg-accent' : 'hover:bg-accent/50'
        )}
        aria-label="Marcar con Aspa"
      >
        <Plus className="text-foreground text-4xl" />
      </button>
      <button
        onClick={() => onSelect('check')}
        className={clsx(
          'rounded-lg p-4',
          selectedPen === 'check' ? 'bg-accent' : 'hover:bg-accent/50'
        )}
        aria-label="Marcar con check"
      >
        <CheckCircle className="text-foreground text-4xl" />
      </button>
      <button
        onClick={() => onSelect('circle')}
        className={clsx(
          'rounded-lg p-4',
          selectedPen === 'circle' ? 'bg-accent' : 'hover:bg-accent/50'
        )}
        aria-label="Marcar con círculo"
      >
        <Circle className="text-foreground text-4xl" />
      </button>
    </div>
  </div>
)

// Marca (X o +) que cubre todo el div
const Mark: React.FC<{ pen: PenType }> = ({ pen }) => {
  const MarkIcon = pen === 'x' ? X : pen === 'plus' ? Plus : null
  if (!MarkIcon) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20">
      <MarkIcon className="text-5xl text-black" />
    </div>
  )
}

// Cédula Congresal Reutilizable
const CedulaCongresal: React.FC<{
  titulo: string
  partidos: typeof congressionalParties
  partidoVotado: string | null
  prefVotes: Record<string, { v1: string; v2: string }>
  prefErrors: Record<string, { v1?: string; v2?: string }>
  onMarkParty: (partyId: string) => void
  onPrefVoteChange: (
    partyId: string,
    voteNumber: 'v1' | 'v2',
    value: string
  ) => void
  onPrefVoteBlur: (partyId: string, voteNumber: 'v1' | 'v2') => void
  selectedPen: PenType | null
}> = ({
  titulo,
  partidos,
  partidoVotado,
  prefVotes,
  prefErrors,
  onMarkParty,
  onPrefVoteChange,
  onPrefVoteBlur,
  selectedPen,
}) => (
  <div className="bg-card border-border rounded-lg border p-6 shadow-md">
    <h3 className="text-foreground mb-4 text-lg font-semibold">{titulo}</h3>
    <div className="space-y-6">
      {partidos.map((p) => {
        const currentPrefVotes = prefVotes[p.id] || { v1: '', v2: '' }
        const v1Error = prefErrors[p.id]?.v1
        const v2Error = prefErrors[p.id]?.v2
        return (
          <div key={p.id}>
            <div
              className={clsx(
                'flex items-center rounded-lg border-2 p-4 transition-all',
                partidoVotado === p.id
                  ? 'border-primary bg-accent'
                  : 'border-border bg-card'
              )}
            >
              <div className="flex-1">
                <p className="text-foreground text-lg font-bold">{p.nombre}</p>
              </div>
              <button
                onClick={() => onMarkParty(p.id)}
                className="hover:bg-accent/50 relative ml-4 flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border-4 border-blue-600"
              >
                <span className="text-4xl">{p.logo}</span>
                {partidoVotado === p.id && selectedPen && (
                  <Mark pen={selectedPen} />
                )}
              </button>
              <input
                type="text"
                maxLength={2}
                value={currentPrefVotes.v1}
                onChange={(e) => onPrefVoteChange(p.id, 'v1', e.target.value)}
                onBlur={() => onPrefVoteBlur(p.id, 'v1')}
                disabled={partidoVotado !== p.id}
                className={clsx(
                  'ml-2 h-16 w-16 rounded-md border-4 text-center text-3xl font-bold',
                  v1Error ? 'border-destructive bg-red-50' : 'border-blue-600',
                  'disabled:border-gray-400 disabled:bg-gray-200'
                )}
              />
              <input
                type="text"
                maxLength={2}
                value={currentPrefVotes.v2}
                onChange={(e) => onPrefVoteChange(p.id, 'v2', e.target.value)}
                onBlur={() => onPrefVoteBlur(p.id, 'v2')}
                disabled={partidoVotado !== p.id}
                className={clsx(
                  'ml-2 h-16 w-16 rounded-md border-4 text-center text-3xl font-bold',
                  v2Error ? 'border-destructive bg-red-50' : 'border-blue-600',
                  'disabled:border-gray-400 disabled:bg-gray-200'
                )}
              />
            </div>
            {(v1Error || v2Error) && (
              <div className="text-destructive mt-2 pr-2 text-right text-sm font-semibold">
                {v1Error && <div>{v1Error}</div>}
                {v2Error && !v1Error && <div>{v2Error}</div>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  </div>
)

// Tarjeta de Verificación Reutilizable
const TarjetaVerificacion: React.FC<{
  titulo: string
  prefVotes?: { v1: string; v2: string }
}> = ({ titulo, prefVotes }) => {
  const v1 = prefVotes?.v1 ? parseInt(prefVotes.v1, 10).toString() : ''
  const v2 = prefVotes?.v2 ? parseInt(prefVotes.v2, 10).toString() : ''

  return (
    <div className="rounded-lg border border-green-300 bg-green-50 p-6 shadow-md">
      <div className="flex items-center">
        <CheckCircle className="text-3xl text-green-600" />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-green-800">{titulo}</h3>
          <p className="text-lg text-green-700">
            Has marcado correctamente. Tu voto será contabilizado.
          </p>
        </div>
      </div>
      {(v1 || v2) && (
        <>
          <hr className="my-4 border-green-200" />
          <p className="text-muted-foreground text-lg">
            Votos preferenciales:
            <span className="text-foreground ml-2 font-bold">
              {[v1, v2].filter(Boolean).join(', ')}
            </span>
          </p>
        </>
      )}
    </div>
  )
}

// --- COMPONENTE DE CONTENIDO (TODA LA LÓGICA) ---
const ContenidoPagina: React.FC = () => {
  // --- ESTADOS ---
  const [step, setStep] = useState(0)
  const [selectedPen, setSelectedPen] = useState<PenType | null>(null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const navigate = useNavigate()

  // Voto Presidencial
  const [presidentialVote, setPresidentialVote] = useState({
    partyId: null as string | null,
    logo: false,
    photo: false,
  })

  // Votos Congresales (4 tipos + 4 estados de error)
  const [senadoNacional, setSenadoNacional] = useState<string | null>(null)
  const [prefSenadoNacional, setPrefSenadoNacional] = useState<
    Record<string, { v1: string; v2: string }>
  >({})
  const [errSenadoNacional, setErrSenadoNacional] = useState<
    Record<string, { v1?: string; v2?: string }>
  >({})

  const [senadoRegional, setSenadoRegional] = useState<string | null>(null)
  const [prefSenadoRegional, setPrefSenadoRegional] = useState<
    Record<string, { v1: string; v2: string }>
  >({})
  const [errSenadoRegional, setErrSenadoRegional] = useState<
    Record<string, { v1?: string; v2?: string }>
  >({})

  const [diputados, setDiputados] = useState<string | null>(null)
  const [prefDiputados, setPrefDiputados] = useState<
    Record<string, { v1: string; v2: string }>
  >({})
  const [errDiputados, setErrDiputados] = useState<
    Record<string, { v1?: string; v2?: string }>
  >({})

  const [parlamento, setParlamento] = useState<string | null>(null)
  const [prefParlamento, setPrefParlamento] = useState<
    Record<string, { v1: string; v2: string }>
  >({})
  const [errParlamento, setErrParlamento] = useState<
    Record<string, { v1?: string; v2?: string }>
  >({})

  // --- LÓGICA ---
  // ✅ CORRECCIÓN: Cambiado 'Function' por '() => void'
  const handleMarkClick = (markFunction: () => void) => {
    if (!selectedPen) {
      toast.error('Por favor, selecciona un marcador primero.')
      return
    }
    if (selectedPen === 'x' || selectedPen === 'plus') {
      markFunction()
    } else {
      setIsErrorModalOpen(true)
    }
  }

  // Lógica de Voto Preferencial (solo guarda el valor)
  const handlePrefVoteChange = (
    partyId: string,
    voteNumber: 'v1' | 'v2',
    value: string,
    setState: React.Dispatch<
      React.SetStateAction<Record<string, { v1: string; v2: string }>>
    >
  ) => {
    const numericValue = value.replace(/\D/g, '')
    setState((prevVotes) => ({
      ...prevVotes,
      [partyId]: {
        ...(prevVotes[partyId] || { v1: '', v2: '' }),
        [voteNumber]: numericValue,
      },
    }))
  }

  // Lógica de Validación (al salir del input)
  const validatePrefVote = (
    partyId: string,
    voteNumber: 'v1' | 'v2',
    state: Record<string, { v1: string; v2: string }>,
    setErrorState: React.Dispatch<
      React.SetStateAction<Record<string, { v1?: string; v2?: string }>>
    >
  ) => {
    const currentVotes = state[partyId] || { v1: '', v2: '' }
    const currentValue = currentVotes[voteNumber]

    const clearError = (field: 'v1' | 'v2') => {
      setErrorState((prevErrors) => {
        const partyErrors = { ...prevErrors[partyId] }
        delete partyErrors[field]
        return { ...prevErrors, [partyId]: partyErrors }
      })
    }

    if (currentValue === '') {
      clearError(voteNumber)
      return
    }

    if (parseInt(currentValue, 10) === 0) {
      const error = 'El número no puede ser cero.'
      setErrorState((prev) => ({
        ...prev,
        [partyId]: { ...prev[partyId], [voteNumber]: error },
      }))
      toast.error(error)
      return
    }

    const otherVoteNumber = voteNumber === 'v1' ? 'v2' : 'v1'
    const otherVoteValue = currentVotes[otherVoteNumber]

    const parsedValue = parseInt(currentValue, 10).toString()
    const parsedOtherValue = otherVoteValue
      ? parseInt(otherVoteValue, 10).toString()
      : ''

    if (parsedValue && parsedOtherValue && parsedValue === parsedOtherValue) {
      const error = 'No puedes repetir el número.'
      setErrorState((prev) => ({
        ...prev,
        [partyId]: { ...prev[partyId], [voteNumber]: error },
      }))
      toast.error(error)
      return
    }

    clearError(voteNumber)
    if (parsedValue && parsedOtherValue && parsedValue !== parsedOtherValue) {
      clearError(otherVoteNumber)
    }
  }

  // Función para chequear si hay errores antes de continuar
  const hasPrefErrors = (
    partyId: string | null,
    errorState: Record<string, { v1?: string; v2?: string }>
  ) => {
    if (!partyId) return false
    const errors = errorState[partyId] || {}
    return Object.values(errors).some(Boolean)
  }

  const handleFinish = () => {
    setIsFinishModalOpen(true)
  }
  const handleModalConfirm = () => {
    navigate({ to: '/elector' }) // Ruta corregida
  }

  const resetCongresional = (
    setParty: React.Dispatch<React.SetStateAction<string | null>>,
    setPrefs: React.Dispatch<
      React.SetStateAction<Record<string, { v1: string; v2: string }>>
    >,
    setErrorState: React.Dispatch<
      React.SetStateAction<Record<string, { v1?: string; v2?: string }>>
    >,
    prevStep: number
  ) => {
    setParty(null)
    setPrefs({})
    setSelectedPen(null)
    setErrorState({})
    setStep(prevStep)
  }

  const resetPresidential = () => {
    setPresidentialVote({ partyId: null, logo: false, photo: false })
    setSelectedPen(null)
    setStep(1)
  }

  return (
    <div className="mx-auto max-w-2xl">
      {step > 0 && <PaginationDots current={step} total={11} />}

      {/* --- PASO 0: Bienvenida --- */}
      {step === 0 && (
        <div className="bg-card border-border rounded-lg border p-8 text-center shadow-md">
          <h2 className="text-foreground mb-4 text-2xl font-bold">
            Bienvenido al Simulador
          </h2>
          <ul className="mb-8 inline-block space-y-2 text-left text-lg">
            <li className="flex items-center">
              <Check className="mr-3 text-green-500" /> Práctica sin límites
            </li>
            <li className="flex items-center">
              <Check className="mr-3 text-green-500" /> Aprende a marcar
              correctamente
            </li>
            <li className="flex items-center">
              <Check className="mr-3 text-green-500" /> Identifica votos válidos
              e inválidos
            </li>
          </ul>
          <button
            onClick={() => setStep(1)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors"
          >
            Comenzar Tutorial
          </button>
        </div>
      )}

      {/* --- PASO 1: Voto Presidencial --- */}
      {step === 1 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 1: Voto Presidencial
            </h3>
            <p className="text-muted-foreground text-lg">
              Debes marcar el logo del partido Y la foto del candidato.
            </p>
          </div>
          <div className="bg-card border-border rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Cédula de Votación - Presidencial 2026
            </h3>
            <div className="space-y-4">
              {presidentialCandidatos.map((c) => (
                <div
                  key={c.id}
                  className={clsx(
                    'flex items-center rounded-lg border-2 p-4',
                    presidentialVote.partyId === c.id
                      ? 'border-primary bg-accent'
                      : 'border-border bg-card'
                  )}
                >
                  <div className="flex-1">
                    <p className="text-foreground text-lg font-bold">
                      {c.partido}
                    </p>
                    <p className="text-md text-muted-foreground">{c.nombre}</p>
                  </div>
                  <div
                    onClick={() =>
                      handleMarkClick(() =>
                        setPresidentialVote((prev) => ({
                          partyId: c.id,
                          logo: !prev.logo,
                          photo: prev.photo,
                        }))
                      )
                    }
                    className="hover:bg-accent/50 relative flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-md border-4 border-blue-600"
                  >
                    <span className="text-4xl">{c.logo}</span>
                    {presidentialVote.partyId === c.id &&
                      presidentialVote.logo &&
                      selectedPen && <Mark pen={selectedPen} />}
                  </div>
                  <div
                    onClick={() =>
                      handleMarkClick(() =>
                        setPresidentialVote((prev) => ({
                          ...prev,
                          partyId: c.id,
                          photo: !prev.photo,
                        }))
                      )
                    }
                    className="hover:bg-accent/50 relative ml-2 flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-md border-4 border-blue-600"
                  >
                    <User className="text-4xl text-gray-400" />
                    {presidentialVote.partyId === c.id &&
                      presidentialVote.photo &&
                      selectedPen && <Mark pen={selectedPen} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
          <button
            onClick={() => setStep(2)}
            disabled={!presidentialVote.logo || !presidentialVote.photo}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50"
          >
            Continuar
          </button>
        </>
      )}

      {/* --- PASO 2: Verificar Voto Presidencial --- */}
      {step === 2 && (
        <>
          <TarjetaVerificacion titulo="Voto Presidencial Válido" />
          <div className="mt-6 flex gap-4">
            <button
              onClick={resetPresidential}
              className="bg-card border-primary text-primary hover:bg-accent w-full rounded-lg border-2 p-4 text-lg font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              onClick={() => {
                setStep(3)
                setSelectedPen(null)
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors"
            >
              Continuar
            </button>
          </div>
        </>
      )}

      {/* --- PASO 3: Senado Nacional --- */}
      {step === 3 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 3: Senado Nacional
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <CedulaCongresal
            titulo="Cédula de Votación - Senado Nacional"
            partidos={congressionalParties}
            partidoVotado={senadoNacional}
            prefVotes={prefSenadoNacional}
            prefErrors={errSenadoNacional}
            onMarkParty={(id) => handleMarkClick(() => setSenadoNacional(id))}
            onPrefVoteChange={(id, num, val) =>
              handlePrefVoteChange(id, num, val, setPrefSenadoNacional)
            }
            onPrefVoteBlur={(id, num) =>
              validatePrefVote(
                id,
                num,
                prefSenadoNacional,
                setErrSenadoNacional
              )
            }
            selectedPen={selectedPen}
          />
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
          <button
            onClick={() => setStep(4)}
            disabled={
              !senadoNacional ||
              hasPrefErrors(senadoNacional, errSenadoNacional)
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50"
          >
            Continuar
          </button>
        </>
      )}

      {/* --- PASO 4: Verificar Senado Nacional --- */}
      {step === 4 && (
        <>
          <TarjetaVerificacion
            titulo="Voto Senado Nacional Válido"
            prefVotes={
              senadoNacional ? prefSenadoNacional[senadoNacional] : undefined
            }
          />
          <div className="mt-6 flex gap-4">
            <button
              onClick={() =>
                resetCongresional(
                  setSenadoNacional,
                  setPrefSenadoNacional,
                  setErrSenadoNacional,
                  3
                )
              }
              className="bg-card border-primary text-primary hover:bg-accent w-full rounded-lg border-2 p-4 text-lg font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              onClick={() => {
                setStep(5)
                setSelectedPen(null)
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors"
            >
              Continuar
            </button>
          </div>
        </>
      )}

      {/* --- PASO 5: Senado Regional --- */}
      {step === 5 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 5: Senado Regional
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <CedulaCongresal
            titulo="Cédula de Votación - Senado Regional"
            partidos={congressionalParties.slice().reverse()}
            partidoVotado={senadoRegional}
            prefVotes={prefSenadoRegional}
            prefErrors={errSenadoRegional}
            onMarkParty={(id) => handleMarkClick(() => setSenadoRegional(id))}
            onPrefVoteChange={(id, num, val) =>
              handlePrefVoteChange(id, num, val, setPrefSenadoRegional)
            }
            onPrefVoteBlur={(id, num) =>
              validatePrefVote(
                id,
                num,
                prefSenadoRegional,
                setErrSenadoRegional
              )
            }
            selectedPen={selectedPen}
          />
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
          <button
            onClick={() => setStep(6)}
            disabled={
              !senadoRegional ||
              hasPrefErrors(senadoRegional, errSenadoRegional)
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50"
          >
            Continuar
          </button>
        </>
      )}

      {/* --- PASO 6: Verificar Senado Regional --- */}
      {step === 6 && (
        <>
          <TarjetaVerificacion
            titulo="Voto Senado Regional Válido"
            prefVotes={
              senadoRegional ? prefSenadoRegional[senadoRegional] : undefined
            }
          />
          <div className="mt-6 flex gap-4">
            <button
              onClick={() =>
                resetCongresional(
                  setSenadoRegional,
                  setPrefSenadoRegional,
                  setErrSenadoRegional,
                  5
                )
              }
              className="bg-card border-primary text-primary hover:bg-accent w-full rounded-lg border-2 p-4 text-lg font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              onClick={() => {
                setStep(7)
                setSelectedPen(null)
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors"
            >
              Continuar
            </button>
          </div>
        </>
      )}

      {/* --- PASO 7: Diputados --- */}
      {step === 7 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 7: Diputados
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <CedulaCongresal
            titulo="Cédula de Votación - Diputados"
            partidos={congressionalParties}
            partidoVotado={diputados}
            prefVotes={prefDiputados}
            prefErrors={errDiputados}
            onMarkParty={(id) => handleMarkClick(() => setDiputados(id))}
            onPrefVoteChange={(id, num, val) =>
              handlePrefVoteChange(id, num, val, setPrefDiputados)
            }
            onPrefVoteBlur={(id, num) =>
              validatePrefVote(id, num, prefDiputados, setErrDiputados)
            }
            selectedPen={selectedPen}
          />
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
          <button
            onClick={() => setStep(8)}
            disabled={!diputados || hasPrefErrors(diputados, errDiputados)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50"
          >
            Continuar
          </button>
        </>
      )}

      {/* --- PASO 8: Verificar Diputados --- */}
      {step === 8 && (
        <>
          <TarjetaVerificacion
            titulo="Voto Diputados Válido"
            prefVotes={diputados ? prefDiputados[diputados] : undefined}
          />
          <div className="mt-6 flex gap-4">
            <button
              onClick={() =>
                resetCongresional(
                  setDiputados,
                  setPrefDiputados,
                  setErrDiputados,
                  7
                )
              }
              className="bg-card border-primary text-primary hover:bg-accent w-full rounded-lg border-2 p-4 text-lg font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              onClick={() => {
                setStep(9)
                setSelectedPen(null)
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors"
            >
              Continuar
            </button>
          </div>
        </>
      )}

      {/* --- PASO 9: Parlamento Andino --- */}
      {step === 9 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 9: Parlamento Andino
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <CedulaCongresal
            titulo="Cédula de Votación - Parlamento Andino"
            partidos={congressionalParties.slice().reverse()}
            partidoVotado={parlamento}
            prefVotes={prefParlamento}
            prefErrors={errParlamento}
            onMarkParty={(id) => handleMarkClick(() => setParlamento(id))}
            onPrefVoteChange={(id, num, val) =>
              handlePrefVoteChange(id, num, val, setPrefParlamento)
            }
            onPrefVoteBlur={(id, num) =>
              validatePrefVote(id, num, prefParlamento, setErrParlamento)
            }
            selectedPen={selectedPen}
          />
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
          <button
            onClick={() => setStep(10)}
            disabled={!parlamento || hasPrefErrors(parlamento, errParlamento)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50"
          >
            Continuar
          </button>
        </>
      )}

      {/* --- PASO 10: Verificar Parlamento Andino --- */}
      {step === 10 && (
        <>
          <TarjetaVerificacion
            titulo="Voto Parlamento Andino Válido"
            prefVotes={parlamento ? prefParlamento[parlamento] : undefined}
          />
          <div className="mt-6 flex gap-4">
            <button
              onClick={() =>
                resetCongresional(
                  setParlamento,
                  setPrefParlamento,
                  setErrParlamento,
                  9
                )
              }
              className="bg-card border-primary text-primary hover:bg-accent w-full rounded-lg border-2 p-4 text-lg font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              onClick={() => {
                setStep(11)
                setSelectedPen(null)
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors"
            >
              Continuar
            </button>
          </div>
        </>
      )}

      {/* --- PASO 11: Depositar Voto (Final) --- */}
      {step === 11 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 11: Deposita tus votos
            </h3>
            <p className="text-muted-foreground text-lg">
              Dobla tus 5 cédulas y colócalas en el ánfora.
            </p>
          </div>
          <div className="bg-card border-border rounded-lg border p-12 text-center shadow-md">
            <Box className="mx-auto text-9xl text-gray-400" />
            <h3 className="text-foreground mt-4 text-2xl font-bold">
              Ánfora Electoral
            </h3>
            <p className="text-muted-foreground text-lg">
              Coloca tus cédulas dobladas dentro del ánfora.
            </p>
          </div>
          <button
            onClick={handleFinish} // Llama al modal de felicitaciones
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors"
          >
            Depositar Votos y Finalizar
          </button>
        </>
      )}

      {/* --- MODAL DE ERROR (REGLAMENTO) --- */}
      <AlertDialog.Root
        open={isErrorModalOpen}
        onOpenChange={setIsErrorModalOpen}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
          <AlertDialog.Content className="bg-card fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-8 text-center shadow-xl">
            <AlertTriangle className="text-destructive mx-auto mb-4 text-6xl" />
            <AlertDialog.Title className="text-foreground text-2xl font-bold">
              ¡Marca Incorrecta!
            </AlertDialog.Title>
            <AlertDialog.Description className="text-muted-foreground my-4 text-lg">
              Según el reglamento, solo puedes marcar con una{' '}
              <span className="text-foreground font-bold">X</span> o un aspa (
              <span className="text-foreground font-bold">+</span>).
            </AlertDialog.Description>
            <AlertDialog.Action asChild>
              <button
                onClick={() => setIsErrorModalOpen(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full rounded-lg p-3 font-semibold transition-colors"
              >
                Entendido
              </button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      {/* --- MODAL DE FELICITACIÓN (FINAL) --- */}
      <AlertDialog.Root
        open={isFinishModalOpen}
        onOpenChange={setIsFinishModalOpen}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
          <AlertDialog.Content className="bg-card fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-8 text-center shadow-xl">
            <CheckCircle className="mx-auto mb-4 text-6xl text-green-500" />
            <AlertDialog.Title className="text-foreground text-2xl font-bold">
              ¡Felicitaciones!
            </AlertDialog.Title>
            <AlertDialog.Description className="text-muted-foreground my-4 text-lg">
              Has completado el simulador. ¡Ya aprendiste a votar correctamente!
            </AlertDialog.Description>
            <AlertDialog.Action asChild>
              <button
                onClick={handleModalConfirm}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full rounded-lg p-3 font-semibold transition-colors"
              >
                Finalizar y volver al panel
              </button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}

// --- COMPONENTE FINAL (Renderizado Responsivo) ---
const PaginaSimuladorVotacion: React.FC = () => {
  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE PC (Renderiza dentro del layout padre) */}
      {/* ========================================================== */}
      <div className="hidden md:block">
        <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
          Simulador de Votación
        </h1>
        <p className="text-muted-foreground mb-6 text-lg">
          Practica cómo votar paso a paso
        </p>
        <ContenidoPagina />
      </div>

      {/* ========================================================== */}
      {/* 2. UI DE MÓVIL (Layout propio) */}
      {/* ========================================================== */}
      <div className="bg-background min-h-screen md:hidden">
        <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg">
          <Link
            to="/elector"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Simulador</h1>
        </header>
        <main className="p-6">
          <ContenidoPagina />
        </main>
      </div>
    </>
  )
}

export default PaginaSimuladorVotacion
