// src/pages/Soy_Elector/Simulador_Votacion.tsx

import React, { useState, useContext, createContext } from 'react'
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
  Play,
  Info, // Icono para el nuevo tutorial
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

// --- NUEVO TIPO PARA EL TUTORIAL ---
type TutorialContent = {
  title: string
  description: string
}

// --- INTERFACES Y CONTEXTO ---
type PresidentialVote = {
  partyId: string | null
  logo: boolean
  photo: boolean
}
type PrefVotes = Record<string, { v1: string; v2: string }>
type PrefErrors = Record<string, { v1?: string; v2?: string }>

interface SimuladorContextType {
  // Estado
  step: number
  selectedPen: PenType | null
  isErrorModalOpen: boolean
  isFinishModalOpen: boolean
  presidentialVote: PresidentialVote
  senadoNacional: string | null
  prefSenadoNacional: PrefVotes
  errSenadoNacional: PrefErrors
  senadoRegional: string | null
  prefSenadoRegional: PrefVotes
  errSenadoRegional: PrefErrors
  diputados: string | null
  prefDiputados: PrefVotes
  errDiputados: PrefErrors
  parlamento: string | null
  prefParlamento: PrefVotes
  errParlamento: PrefErrors

  // Setters y Lógica
  setStep: React.Dispatch<React.SetStateAction<number>>
  setSelectedPen: React.Dispatch<React.SetStateAction<PenType | null>>
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsFinishModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setPresidentialVote: React.Dispatch<React.SetStateAction<PresidentialVote>>
  setSenadoNacional: React.Dispatch<React.SetStateAction<string | null>>
  setPrefSenadoNacional: React.Dispatch<React.SetStateAction<PrefVotes>>
  setErrSenadoNacional: React.Dispatch<React.SetStateAction<PrefErrors>>
  setSenadoRegional: React.Dispatch<React.SetStateAction<string | null>>
  setPrefSenadoRegional: React.Dispatch<React.SetStateAction<PrefVotes>>
  setErrSenadoRegional: React.Dispatch<React.SetStateAction<PrefErrors>>
  setDiputados: React.Dispatch<React.SetStateAction<string | null>>
  setPrefDiputados: React.Dispatch<React.SetStateAction<PrefVotes>>
  setErrDiputados: React.Dispatch<React.SetStateAction<PrefErrors>>
  setParlamento: React.Dispatch<React.SetStateAction<string | null>>
  setPrefParlamento: React.Dispatch<React.SetStateAction<PrefVotes>>
  setErrParlamento: React.Dispatch<React.SetStateAction<PrefErrors>>
  handleMarkClick: (markFunction: () => void) => void
  handlePrefVoteChange: (
    partyId: string,
    voteNumber: 'v1' | 'v2',
    value: string,
    setState: React.Dispatch<React.SetStateAction<PrefVotes>>
  ) => void
  validatePrefVote: (
    partyId: string,
    voteNumber: 'v1' | 'v2',
    state: PrefVotes,
    setErrorState: React.Dispatch<React.SetStateAction<PrefErrors>>
  ) => void
  hasPrefErrors: (partyId: string | null, errorState: PrefErrors) => boolean
  handleFinish: () => void
  handleModalConfirm: () => void
  resetCongresional: (
    setParty: React.Dispatch<React.SetStateAction<string | null>>,
    setPrefs: React.Dispatch<React.SetStateAction<PrefVotes>>,
    setErrorState: React.Dispatch<React.SetStateAction<PrefErrors>>
  ) => void
  resetPresidential: () => void

  // Lógica del Tour (Actualizada)
  isTourActive: boolean
  startTour: () => void
  stopTour: () => void
  tutorialContent: TutorialContent | null
}

const SimuladorContext = createContext<SimuladorContextType | null>(null)

const useSimulador = () => {
  const context = useContext(SimuladorContext)
  if (!context) {
    throw new Error(
      'useSimulador debe ser usado dentro de un SimuladorProvider'
    )
  }
  return context
}

// --- COMPONENTE DEL TOUR (Botón de inicio) ---
const SimuladorTourButton: React.FC = () => {
  const { startTour } = useSimulador()

  return (
    <button
      onClick={startTour}
      className="text-primary flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/90"
    >
      <Play className="h-4 w-4" />
      Iniciar Tour
    </button>
  )
}

// --- NUEVO COMPONENTE: BARRA DE TUTORIAL ---
const TutorialBar: React.FC = () => {
  const { isTourActive, tutorialContent, stopTour } = useSimulador()

  if (!isTourActive || !tutorialContent) return null

  return (
    <div
      className="border-primary-foreground/20 bg-primary text-primary-foreground fixed right-4 bottom-4 left-4 z-50 rounded-lg border-2 p-4 shadow-2xl md:top-28 md:right-6 md:bottom-auto md:left-auto md:w-96"
      role="alert"
    >
      <button
        onClick={stopTour}
        className="bg-primary-foreground text-primary absolute -top-2 -right-2 rounded-full p-1 shadow-md transition-transform hover:scale-110"
        aria-label="Cerrar tutorial"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3">
        <Info className="h-6 w-6 shrink-0" />
        <div>
          <h4 className="text-lg font-bold">{tutorialContent.title}</h4>
          <p
            className="mt-1 text-sm opacity-90"
            dangerouslySetInnerHTML={{ __html: tutorialContent.description }}
          />
        </div>
      </div>
    </div>
  )
}

// --- COMPONENTES INTERNOS ---

// Paginación
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

// Selector de Bolígrafo
const PenSelector: React.FC<{
  selectedPen: PenType | null
  onSelect: (pen: PenType) => void
}> = ({ selectedPen, onSelect }) => {
  // --- Destacado para el tour ---
  const { isTourActive, step } = useSimulador()
  const isHighlighted =
    isTourActive &&
    (step === 1 || step === 2 || step === 3 || step === 4 || step === 5)

  return (
    <div
      data-tour="selector-marcador"
      className={clsx(
        'bg-card border-border mt-6 rounded-lg border p-4 shadow-md transition-all',
        isHighlighted && 'ring-primary ring-4 ring-offset-2' // Efecto de destacado
      )}
    >
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
}

// Marca (X o +) que cubre todo el div
const Mark: React.FC<{ pen: PenType }> = ({ pen }) => {
  const MarkIcon = pen === 'x' ? X : pen === 'plus' ? Plus : null
  if (!MarkIcon) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20">
      <MarkIcon className="h-14 w-14 text-black" strokeWidth={3} />
    </div>
  )
}

// Cédula Congresal Reutilizable (AHORA RESPONSIVE)
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
}) => {
  const { isTourActive, tutorialContent } = useSimulador()

  return (
    <div
      data-tour="cedula-congresal"
      className="bg-card border-border rounded-lg border p-6 shadow-md"
    >
      <h3 className="text-foreground mb-4 text-lg font-semibold">{titulo}</h3>
      <div className="space-y-6">
        {partidos.map((p, index) => {
          const currentPrefVotes = prefVotes[p.id] || { v1: '', v2: '' }
          const v1Error = prefErrors[p.id]?.v1
          const v2Error = prefErrors[p.id]?.v2
          const isVotado = partidoVotado === p.id

          // --- Lógica de destacado para el tour ---
          const isLogoHighlighted =
            isTourActive &&
            index === 0 &&
            tutorialContent?.title.includes('Marca un Partido')
          const arePrefsHighlighted =
            isTourActive &&
            index === 0 &&
            tutorialContent?.title.includes('Voto Preferencial')

          return (
            <div
              key={p.id}
              className={clsx(
                'rounded-lg border-2 p-4 transition-all',
                isVotado ? 'border-primary bg-accent' : 'border-border bg-card'
              )}
            >
              {/* Fila 1: Partido y Logo (Responsive) */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 md:pr-4">
                  <p className="text-foreground text-lg font-bold">
                    {p.nombre}
                  </p>
                </div>
                <button
                  data-tour={index === 0 ? 'congresal-logo' : undefined}
                  onClick={() => onMarkParty(p.id)}
                  className={clsx(
                    'hover:bg-accent/50 relative flex h-16 w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border-4 border-blue-600 md:w-16',
                    isLogoHighlighted && 'ring-primary ring-4 ring-offset-2' // Destacado
                  )}
                >
                  <span className="text-4xl">{p.logo}</span>
                  {isVotado && selectedPen && <Mark pen={selectedPen} />}
                </button>
              </div>

              {/* Fila 2: Votos Preferenciales (Responsive) */}
              <div
                className={clsx(
                  'mt-4 flex flex-col gap-2 md:flex-row md:items-center',
                  arePrefsHighlighted && 'ring-primary rounded-lg ring-4' // Destacado
                )}
              >
                <label className="text-muted-foreground shrink-0 font-medium md:mr-2">
                  Voto Preferencial:
                </label>
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    maxLength={2}
                    value={currentPrefVotes.v1}
                    onChange={(e) =>
                      onPrefVoteChange(p.id, 'v1', e.target.value)
                    }
                    onBlur={() => onPrefVoteBlur(p.id, 'v1')}
                    disabled={!isVotado}
                    className={clsx(
                      'h-16 w-full flex-1 rounded-md border-4 text-center text-3xl font-bold md:w-16 md:flex-none',
                      v1Error
                        ? 'border-destructive bg-red-50'
                        : 'border-blue-600',
                      'disabled:border-gray-400 disabled:bg-gray-200'
                    )}
                  />
                  <input
                    type="text"
                    maxLength={2}
                    value={currentPrefVotes.v2}
                    onChange={(e) =>
                      onPrefVoteChange(p.id, 'v2', e.target.value)
                    }
                    onBlur={() => onPrefVoteBlur(p.id, 'v2')}
                    disabled={!isVotado}
                    className={clsx(
                      'h-16 w-full flex-1 rounded-md border-4 text-center text-3xl font-bold md:w-16 md:flex-none',
                      v2Error
                        ? 'border-destructive bg-red-50'
                        : 'border-blue-600',
                      'disabled:border-gray-400 disabled:bg-gray-200'
                    )}
                  />
                </div>
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
}

// --- COMPONENTE DE CONTENIDO (Ahora usa Context) ---
const ContenidoPagina: React.FC = () => {
  // --- ESTADO (Obtenido del Context) ---
  const {
    step,
    setStep,
    selectedPen,
    setSelectedPen,
    isErrorModalOpen,
    setIsErrorModalOpen,
    isFinishModalOpen,
    setIsFinishModalOpen,
    presidentialVote,
    setPresidentialVote,
    senadoNacional,
    setSenadoNacional,
    prefSenadoNacional,
    setPrefSenadoNacional,
    errSenadoNacional,
    setErrSenadoNacional,
    senadoRegional,
    setSenadoRegional,
    prefSenadoRegional,
    setPrefSenadoRegional,
    errSenadoRegional,
    setErrSenadoRegional,
    diputados,
    setDiputados,
    prefDiputados,
    setPrefDiputados,
    errDiputados,
    setErrDiputados,
    parlamento,
    setParlamento,
    prefParlamento,
    setPrefParlamento,
    errParlamento,
    setErrParlamento,
    handleMarkClick,
    handlePrefVoteChange,
    validatePrefVote,
    hasPrefErrors,
    handleFinish,
    handleModalConfirm,
    isTourActive,
    tutorialContent,
  } = useSimulador()

  // --- Lógica de destacado para el tour ---
  const isContinuarHighlighted =
    isTourActive &&
    (tutorialContent?.title.includes('Voto Completo') ||
      tutorialContent?.title.includes('Voto Preferencial'))

  const isComenzarHighlighted =
    isTourActive && tutorialContent?.title.includes('Bienvenido')
  const isDepositarHighlighted =
    isTourActive && tutorialContent?.title.includes('Último Paso')

  // Lógica para avanzar de paso
  const handleAdvanceStep = (currentStep: number) => {
    setStep(currentStep + 1)
    setSelectedPen(null)
  }

  // Número total de pasos (5 votos + 1 final)
  const TOTAL_STEPS = 6

  return (
    <div className="mx-auto max-w-2xl">
      {step > 0 && <PaginationDots current={step} total={TOTAL_STEPS} />}

      {/* --- PASO 0: Bienvenida --- */}
      {step === 0 && (
        <div
          data-tour="bienvenida"
          className="bg-card border-border rounded-lg border p-8 text-center shadow-md"
        >
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
            data-tour="comenzar-btn"
            onClick={() => setStep(1)}
            className={clsx(
              'bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors',
              isComenzarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
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
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
          <div
            data-tour="cedula-presidencial"
            className="bg-card border-border mt-6 rounded-lg border p-6 shadow-md"
          >
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Cédula de Votación - Presidencial 2026
            </h3>
            <div className="space-y-4">
              {presidentialCandidatos.map((c, index) => {
                const isLogoHighlighted =
                  isTourActive &&
                  index === 0 &&
                  tutorialContent?.title.includes('Marca el Logo')
                const isFotoHighlighted =
                  isTourActive &&
                  index === 0 &&
                  tutorialContent?.title.includes('Marca la Foto')

                return (
                  <div
                    key={c.id}
                    className={clsx(
                      'rounded-lg border-2 p-4 transition-all',
                      presidentialVote.partyId === c.id
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card'
                    )}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <p className="text-foreground text-lg font-bold">
                          {c.partido}
                        </p>
                        <p className="text-md text-muted-foreground">
                          {c.nombre}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <div
                          data-tour={
                            index === 0 ? 'presidencial-logo' : undefined
                          }
                          onClick={() =>
                            handleMarkClick(() =>
                              setPresidentialVote((prev) => ({
                                partyId: c.id,
                                logo: !prev.logo,
                                photo: prev.photo,
                              }))
                            )
                          }
                          className={clsx(
                            'hover:bg-accent/50 relative flex h-16 w-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md border-4 border-blue-600 md:w-16 md:flex-none',
                            isLogoHighlighted &&
                              'ring-primary ring-4 ring-offset-2'
                          )}
                        >
                          <span className="text-4xl">{c.logo}</span>
                          {presidentialVote.partyId === c.id &&
                            presidentialVote.logo &&
                            selectedPen && <Mark pen={selectedPen} />}
                        </div>
                        <div
                          data-tour={
                            index === 0 ? 'presidencial-foto' : undefined
                          }
                          onClick={() =>
                            handleMarkClick(() =>
                              setPresidentialVote((prev) => ({
                                ...prev,
                                partyId: c.id,
                                photo: !prev.photo,
                              }))
                            )
                          }
                          className={clsx(
                            'hover:bg-accent/50 relative ml-2 flex h-16 w-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md border-4 border-blue-600 md:w-16 md:flex-none',
                            isFotoHighlighted &&
                              'ring-primary ring-4 ring-offset-2'
                          )}
                        >
                          <User className="text-4xl text-gray-400" />
                          {presidentialVote.partyId === c.id &&
                            presidentialVote.photo &&
                            selectedPen && <Mark pen={selectedPen} />}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <button
            data-tour="continuar-btn"
            onClick={() => handleAdvanceStep(1)}
            disabled={!presidentialVote.logo || !presidentialVote.photo}
            className={clsx(
              'bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50',
              isContinuarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
          >
            Continuar (Paso 1 de 5 completado)
          </button>
        </>
      )}

      {/* --- PASO 2: Senado Nacional --- */}
      {step === 2 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 2: Senado Nacional
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
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
          <button
            data-tour="continuar-btn"
            onClick={() => handleAdvanceStep(2)}
            disabled={
              !senadoNacional ||
              hasPrefErrors(senadoNacional, errSenadoNacional)
            }
            className={clsx(
              'bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50',
              isContinuarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
          >
            Continuar (Paso 2 de 5 completado)
          </button>
        </>
      )}

      {/* --- PASO 3: Senado Regional --- */}
      {step === 3 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 3: Senado Regional
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
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
          <button
            data-tour="continuar-btn"
            onClick={() => handleAdvanceStep(3)}
            disabled={
              !senadoRegional ||
              hasPrefErrors(senadoRegional, errSenadoRegional)
            }
            className={clsx(
              'bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50',
              isContinuarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
          >
            Continuar (Paso 3 de 5 completado)
          </button>
        </>
      )}

      {/* --- PASO 4: Diputados --- */}
      {step === 4 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 4: Diputados
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
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
          <button
            data-tour="continuar-btn"
            onClick={() => handleAdvanceStep(4)}
            disabled={!diputados || hasPrefErrors(diputados, errDiputados)}
            className={clsx(
              'bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50',
              isContinuarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
          >
            Continuar (Paso 4 de 5 completado)
          </button>
        </>
      )}

      {/* --- PASO 5: Parlamento Andino --- */}
      {step === 5 && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 5: Parlamento Andino
            </h3>
            <p className="text-muted-foreground text-lg">
              Marca el logo del partido y/o ingresa 1 o 2 números.
            </p>
          </div>
          <PenSelector selectedPen={selectedPen} onSelect={setSelectedPen} />
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
          <button
            data-tour="continuar-btn"
            onClick={() => handleAdvanceStep(5)}
            disabled={!parlamento || hasPrefErrors(parlamento, errParlamento)}
            className={clsx(
              'bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors disabled:opacity-50',
              isContinuarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
          >
            Continuar (Paso 5 de 5 completado)
          </button>
        </>
      )}

      {/* --- PASO 6: Depositar Voto (Final) --- */}
      {step === TOTAL_STEPS && (
        <>
          <div className="bg-card border-border mb-6 rounded-lg border p-6 shadow-md">
            <h3 className="text-foreground text-xl font-bold">
              Paso 6: Deposita tus votos
            </h3>
            <p className="text-muted-foreground text-lg">
              ¡Misión cumplida! Dobla tus 5 cédulas y colócalas en el ánfora.
            </p>
          </div>
          <div
            data-tour="finalizacion"
            className={clsx(
              'bg-card border-border rounded-lg border p-12 text-center shadow-md',
              isDepositarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
          >
            <Box className="mx-auto text-9xl text-gray-400" />
            <h3 className="text-foreground mt-4 text-2xl font-bold">
              Ánfora Electoral
            </h3>
            <p className="text-muted-foreground text-lg">
              Coloca tus cédulas dobladas dentro del ánfora.
            </p>
          </div>
          <button
            data-tour="depositar-btn"
            onClick={handleFinish}
            className={clsx(
              'bg-primary text-primary-foreground hover:bg-primary/90 mt-6 w-full rounded-lg p-4 text-lg font-semibold transition-colors',
              isDepositarHighlighted && 'ring-primary ring-4 ring-offset-2'
            )}
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

// --- PROVIDER (Aquí vive toda la lógica y el estado) ---
const SimuladorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- ESTADOS ---
  const [step, setStep] = useState(0)
  const [selectedPen, setSelectedPen] = useState<PenType | null>(null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const navigate = useNavigate()

  // Voto Presidencial
  const [presidentialVote, setPresidentialVote] = useState<PresidentialVote>({
    partyId: null,
    logo: false,
    photo: false,
  })

  // Votos Congresales (4 tipos + 4 estados de error)
  const [senadoNacional, setSenadoNacional] = useState<string | null>(null)
  const [prefSenadoNacional, setPrefSenadoNacional] = useState<PrefVotes>({})
  const [errSenadoNacional, setErrSenadoNacional] = useState<PrefErrors>({})

  const [senadoRegional, setSenadoRegional] = useState<string | null>(null)
  const [prefSenadoRegional, setPrefSenadoRegional] = useState<PrefVotes>({})
  const [errSenadoRegional, setErrSenadoRegional] = useState<PrefErrors>({})

  const [diputados, setDiputados] = useState<string | null>(null)
  const [prefDiputados, setPrefDiputados] = useState<PrefVotes>({})
  const [errDiputados, setErrDiputados] = useState<PrefErrors>({})

  const [parlamento, setParlamento] = useState<string | null>(null)
  const [prefParlamento, setPrefParlamento] = useState<PrefVotes>({})
  const [errParlamento, setErrParlamento] = useState<PrefErrors>({})

  // --- LÓGICA DEL NUEVO TUTORIAL ---
  const [isTourActive, setIsTourActive] = useState(false)

  let tutorialContent: TutorialContent | null = null
  const TOTAL_STEPS = 6

  const startTour = () => {
    setIsTourActive(true)
    setStep(0)
    resetPresidential()
    resetCongresional(
      setSenadoNacional,
      setPrefSenadoNacional,
      setErrSenadoNacional
    )
    resetCongresional(
      setSenadoRegional,
      setPrefSenadoRegional,
      setErrSenadoRegional
    )
    resetCongresional(setDiputados, setPrefDiputados, setErrDiputados)
    resetCongresional(setParlamento, setPrefParlamento, setErrParlamento)
  }

  const stopTour = () => {
    setIsTourActive(false)
  }

  if (isTourActive) {
    let content: TutorialContent | null = null
    const isValidPen = selectedPen === 'x' || selectedPen === 'plus'

    switch (step) {
      case 0:
        content = {
          title: '¡Bienvenido al Simulador!',
          description:
            'Este tour te guiará interactivamente. Sigue las instrucciones para practicar.',
        }
        break

      case 1: // Voto Presidencial
        if (!isValidPen) {
          content = {
            title: '1. Selecciona tu Marcador',
            description:
              "Haz clic en 'X' o '+'. <strong>Solo estos son válidos.</strong>",
          }
        } else if (!presidentialVote.logo) {
          content = {
            title: '2. Marca el Logo',
            description: 'Haz clic en el logo del partido que elegiste.',
          }
        } else if (!presidentialVote.photo) {
          content = {
            title: '3. Marca la Foto',
            description:
              '¡Genial! Ahora marca la foto del candidato. <strong>Ambas marcas son necesarias.</strong>',
          }
        } else {
          content = {
            title: '4. Voto Completo',
            description:
              'Perfecto. Haz clic en "Continuar" para ir al siguiente voto.',
          }
        }
        break

      case 2: // Senado Nacional
      case 3: // Senado Regional
      case 4: // Diputados
      case 5: {
        // Parlamento Andino
        const partidoVotado = [
          null, // Paso 1 es presidencial
          senadoNacional,
          senadoRegional,
          diputados,
          parlamento,
        ][step - 1]

        const pasoNumero = step

        if (!isValidPen) {
          content = {
            title: `${pasoNumero}. Selecciona tu Marcador`,
            description: "Nuevamente, elige 'X' o '+'.",
          }
        } else if (!partidoVotado) {
          content = {
            title: `${pasoNumero}. Marca un Partido`,
            description: 'Haz clic en el logo del partido que prefieras.',
          }
        } else {
          content = {
            title: `${pasoNumero}. (Opcional) Voto Preferencial`,
            description:
              'Si deseas, puedes añadir 1 o 2 números en las casillas. <strong>Esto es opcional.</strong> Cuando estés listo, presiona "Continuar".',
          }
        }
        break
      }

      case TOTAL_STEPS: // Final
        content = {
          title: '¡Último Paso!',
          description:
            'Has completado todas las cédulas. Deposita tus votos en el ánfora para finalizar.',
        }
        break
    }
    tutorialContent = content
  }

  // --- LÓGICA DE VOTACIÓN ---
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
    setState: React.Dispatch<React.SetStateAction<PrefVotes>>
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

  // Lógica de Validación (al salir del input) - CORREGIDA
  const validatePrefVote = (
    partyId: string,
    voteNumber: 'v1' | 'v2',
    state: PrefVotes,
    setErrorState: React.Dispatch<React.SetStateAction<PrefErrors>>
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

    // Validación 1: No puede ser cero
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

    // Validación 2: No puede repetir el mismo número en ambas casillas
    if (parsedValue && parsedOtherValue && parsedValue === parsedOtherValue) {
      const error = 'No puedes repetir el mismo número en ambas casillas.'
      setErrorState((prev) => ({
        ...prev,
        [partyId]: { ...prev[partyId], [voteNumber]: error },
      }))
      toast.error(error)
      return
    }

    // Si pasa todas las validaciones, limpia el error
    clearError(voteNumber)
    if (parsedValue && parsedOtherValue && parsedValue !== parsedOtherValue) {
      clearError(otherVoteNumber)
    }
  }

  // Función para chequear si hay errores antes de continuar
  const hasPrefErrors = (partyId: string | null, errorState: PrefErrors) => {
    if (!partyId) return false
    const errors = errorState[partyId] || {}
    return Object.values(errors).some(Boolean)
  }

  const handleFinish = () => {
    setIsFinishModalOpen(true)
    if (isTourActive) {
      stopTour()
    }
  }

  const handleModalConfirm = () => {
    navigate({ to: '/elector' })
  }

  const resetCongresional = (
    setParty: React.Dispatch<React.SetStateAction<string | null>>,
    setPrefs: React.Dispatch<React.SetStateAction<PrefVotes>>,
    setErrorState: React.Dispatch<React.SetStateAction<PrefErrors>>
  ) => {
    setParty(null)
    setPrefs({})
    setErrorState({})
  }

  const resetPresidential = () => {
    setPresidentialVote({ partyId: null, logo: false, photo: false })
  }

  // --- VALOR DEL CONTEXTO ---
  const value = {
    step,
    setStep,
    selectedPen,
    setSelectedPen,
    isErrorModalOpen,
    setIsErrorModalOpen,
    isFinishModalOpen,
    setIsFinishModalOpen,
    presidentialVote,
    setPresidentialVote,
    senadoNacional,
    setSenadoNacional,
    prefSenadoNacional,
    setPrefSenadoNacional,
    errSenadoNacional,
    setErrSenadoNacional,
    senadoRegional,
    setSenadoRegional,
    prefSenadoRegional,
    setPrefSenadoRegional,
    errSenadoRegional,
    setErrSenadoRegional,
    diputados,
    setDiputados,
    prefDiputados,
    setPrefDiputados,
    errDiputados,
    setErrDiputados,
    parlamento,
    setParlamento,
    prefParlamento,
    setPrefParlamento,
    errParlamento,
    setErrParlamento,
    handleMarkClick,
    handlePrefVoteChange,
    validatePrefVote,
    hasPrefErrors,
    handleFinish,
    handleModalConfirm,
    resetCongresional,
    resetPresidential,
    isTourActive,
    startTour,
    stopTour,
    tutorialContent,
  }

  return (
    <SimuladorContext.Provider value={value}>
      {children}
    </SimuladorContext.Provider>
  )
}

// --- COMPONENTE DE UI (Layout móvil/desktop) ---
const SimuladorUI: React.FC = () => {
  return (
    <>
      {/* ========================================================== */}
      {/* 1. UI DE PC (Renderiza dentro del layout padre) */}
      {/* ========================================================== */}
      <div className="hidden md:block">
        <div className="bg-primary mb-6 flex items-center justify-between rounded-lg px-6 py-4 text-white">
          <div>
            <h1 className="text-3xl font-extrabold text-white md:text-4xl">
              Simulador de Votación
            </h1>
            <p className="text-lg opacity-90">
              Practica cómo votar paso a paso
            </p>
          </div>
          <SimuladorTourButton />
        </div>
        <ContenidoPagina />
      </div>

      {/* ========================================================== */}
      {/* 2. UI DE MÓVIL (Layout propio) */}
      {/* ========================================================== */}
      <div className="bg-background min-h-screen md:hidden">
        <header className="bg-primary text-primary-foreground flex items-center justify-between rounded-b-[20px] p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <Link
              to="/elector"
              className="rounded-full p-2 hover:bg-white/10"
              aria-label="Volver"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold">Simulador</h1>
          </div>
          <SimuladorTourButton />
        </header>
        <main className="p-6 pb-32">
          <ContenidoPagina />
        </main>
      </div>

      {/* ========================================================== */}
      {/* 3. NUEVO TUTORIAL (Se renderiza en ambas vistas) */}
      {/* ========================================================== */}
      <TutorialBar />
    </>
  )
}

// --- COMPONENTE FINAL (Exportado) ---
const PaginaSimuladorVotacion: React.FC = () => {
  return (
    <SimuladorProvider>
      <SimuladorUI />
    </SimuladorProvider>
  )
}

export default PaginaSimuladorVotacion
