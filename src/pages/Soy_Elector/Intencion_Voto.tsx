// src/pages/Soy_Elector/Intencion_Voto.tsx

import React, { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import * as Dialog from '@radix-ui/react-dialog'
import { useLocalStorage } from 'usehooks-ts'
import { toast } from 'sonner'
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react'

const CANDIDATE_LIST = [
  {
    id: 'c1',
    nombre: 'María González',
    partido: 'Partido Progreso Nacional',
    color: 'bg-primary',
  },
  {
    id: 'c2',
    nombre: 'Carlos Mendoza',
    partido: 'Frente Democrático',
    color: 'bg-green-500',
  },
  {
    id: 'c3',
    nombre: 'Ana Flores',
    partido: 'Unión por el Cambio',
    color: 'bg-purple-500',
  },
  { id: 'c4', nombre: 'Aún no decido', partido: '', color: 'bg-gray-400' },
]
const DEFAULT_VOTES = { c1: 450, c2: 380, c3: 320, c4: 150 }

const ContenidoPagina: React.FC<{
  votes: Record<string, number>
  userVoteId: string | null
  isModalOpen: boolean
  selectedVote: string | null
  totalVotes: number
  getPercentage: (count: number) => string
  setIsModalOpen: (isOpen: boolean) => void
  setSelectedVote: (vote: string | null) => void
  handleSubmitVote: () => void
  view: 'elector' | 'admin'
}> = ({
  votes,
  userVoteId,
  isModalOpen,
  selectedVote,
  totalVotes,
  getPercentage,
  setIsModalOpen,
  setSelectedVote,
  handleSubmitVote,
  view,
}) => (
  <div className="mx-auto max-w-2xl space-y-6">
    {/* --- VISTA ADMIN: mostrar total + resultados */}
    {view === 'admin' && (
      <>
        <div className="bg-card border-border rounded-lg border p-6 text-center shadow-md">
          <p className="text-muted-foreground text-lg">
            Total de votos emitidos
          </p>
          <p className="text-primary text-4xl font-bold">
            {totalVotes.toLocaleString('es')}
          </p>
        </div>

        <div className="bg-card border-border rounded-lg border p-6 shadow-md">
          <h3 className="text-foreground mb-6 text-2xl font-bold">
            Resultados
          </h3>
          <div className="space-y-6">
            {CANDIDATE_LIST.map((c) => {
              const voteCount = votes[c.id as keyof typeof votes]
              const percentage = parseFloat(getPercentage(voteCount))
              return (
                <div key={c.id}>
                  <div className="mb-1 flex justify-between">
                    <p className="text-foreground text-lg font-semibold">
                      {c.nombre}
                    </p>
                    <p className="text-primary text-lg font-bold">
                      {getPercentage(voteCount)}
                    </p>
                  </div>
                  <p className="text-muted-foreground -mt-1 text-sm">
                    {c.partido}
                  </p>
                  <div className="bg-accent mt-2 h-6 w-full overflow-hidden rounded-full">
                    <div
                      className={`${c.color} flex h-6 items-center justify-end rounded-full px-2`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-xs font-bold text-white">
                        {voteCount}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )}

    {/* --- VISTA ELECTOR: mostrar solo botón/modal, confirmación y privacidad --- */}
    {view === 'elector' && (
      <>
        <Dialog.Root
          open={isModalOpen}
          onOpenChange={(isOpen) => {
            setIsModalOpen(isOpen)
            if (isOpen) {
              setSelectedVote(userVoteId)
            }
          }}
        >
          <Dialog.Trigger asChild>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-4 text-lg font-semibold transition-colors">
              {userVoteId ? 'Cambiar mi voto' : 'Emitir mi voto'}
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
            <Dialog.Content className="bg-card fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-8 shadow-xl">
              <Dialog.Title className="text-foreground text-2xl font-bold">
                {userVoteId ? 'Cambia tu voto' : 'Emite tu voto'}
              </Dialog.Title>
              <Dialog.Description className="text-muted-foreground my-2 text-lg">
                Selecciona tu candidato preferido. Puedes cambiar tu voto cuando
                quieras.
              </Dialog.Description>

              <div className="my-6 space-y-3">
                {CANDIDATE_LIST.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedVote(c.id)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                      selectedVote === c.id
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-foreground text-lg font-bold">
                      {c.nombre}
                    </p>
                    {c.partido && (
                      <p className="text-md text-muted-foreground">
                        {c.partido}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <Dialog.Close asChild>
                  <button className="w-full rounded-lg bg-gray-200 p-3 font-semibold text-gray-700 transition-colors hover:bg-gray-300">
                    Cancelar
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleSubmitVote}
                  disabled={!selectedVote}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg p-3 font-semibold transition-colors disabled:opacity-50"
                >
                  Confirmar voto
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {userVoteId && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center">
              <CheckCircle className="mr-3 text-xl text-green-600" />
              <div>
                <p className="font-semibold text-green-800">
                  {(() => {
                    const candidate = CANDIDATE_LIST.find(
                      (c) => c.id === userVoteId
                    )
                    return candidate
                      ? `Has votado por ${candidate.nombre}`
                      : 'Tu voto ha sido registrado'
                  })()}
                </p>
                <p className="text-sm text-green-700">
                  {userVoteId === 'c4'
                    ? 'Aún no has decidido — tu elección se registrará como indesicion.'
                    : 'Tu voto ha sido registrado de forma anónima y segura.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-accent flex items-start gap-3 rounded-lg p-5">
          <Lock className="text-primary shrink-0 text-2xl" />
          <p className="text-muted-foreground font-medium">
            Privacidad: Tu voto es completamente anónimo. No se almacena ninguna
            información que permita identificar tu elección.
          </p>
        </div>
      </>
    )}
  </div>
)

const PaginaIntencionVoto: React.FC = () => {
  const [votes, setVotes] = useLocalStorage('voteCounts', DEFAULT_VOTES)
  const [userVoteId, setUserVoteId] = useLocalStorage<string | null>(
    'userVoteId',
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVote, setSelectedVote] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const totalVotes = useMemo(
    () => Object.values(votes).reduce((a, b) => a + b, 0),
    [votes]
  )

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return '0.0%'
    return ((count / totalVotes) * 100).toFixed(1) + '%'
  }

  const handleSubmitVote = () => {
    if (!selectedVote) return
    const isFirstVote = userVoteId === null
    const isChangingVote = userVoteId !== null && userVoteId !== selectedVote
    const newVotes = { ...votes }

    if (userVoteId && userVoteId !== selectedVote) {
      newVotes[userVoteId as keyof typeof newVotes] -= 1
    }

    if (userVoteId !== selectedVote) {
      newVotes[selectedVote as keyof typeof newVotes] += 1
    }

    setVotes(newVotes)
    setUserVoteId(selectedVote)
    setIsModalOpen(false)

    // Mensajes de éxito mejorados
    if (isFirstVote) {
      toast.success('¡Voto realizado con éxito!', {
        description: 'Tu voto ha sido registrado de forma anónima.',
        duration: 4000,
        icon: <CheckCircle className="text-green-500" />,
      })
    } else if (isChangingVote) {
      toast.success('¡Voto actualizado con éxito!', {
        description: 'Tu selección anterior ha sido modificada.',
        duration: 4000,
        icon: <CheckCircle className="text-green-500" />,
      })
    } else {
      toast.info('Voto confirmado', {
        description: 'Mantienes tu selección anterior.',
        duration: 3000,
      })
    }
  }

  return (
    <>
      {/* UI DE PC */}
      <div className="hidden md:block">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
              Intención de Voto
            </h1>
            <p className="text-muted-foreground text-lg">Simulación</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsAdmin(false)}
              className={`rounded-md px-3 py-2 ${!isAdmin ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
            >
              Vista Elector
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`rounded-md px-3 py-2 ${isAdmin ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
            >
              Vista Admin
            </button>
          </div>
        </div>

        <ContenidoPagina
          votes={votes}
          userVoteId={userVoteId}
          isModalOpen={isModalOpen}
          selectedVote={selectedVote}
          totalVotes={totalVotes}
          getPercentage={getPercentage}
          setIsModalOpen={setIsModalOpen}
          setSelectedVote={setSelectedVote}
          handleSubmitVote={handleSubmitVote}
          view={isAdmin ? 'admin' : 'elector'}
        />
      </div>

      {/* UI DE MÓVIL */}
      <div className="bg-background min-h-screen md:hidden">
        <header className="bg-primary text-primary-foreground flex items-center gap-4 rounded-b-[20px] p-4 shadow-lg">
          <Link
            to="/elector"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Intención de Voto</h1>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setIsAdmin(false)}
              className={`rounded-md px-2 py-1 text-sm ${!isAdmin ? 'bg-primary text-primary-foreground' : 'bg-card text-primary'}`}
            >
              Elector
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`rounded-md px-2 py-1 text-sm ${isAdmin ? 'bg-primary text-primary-foreground' : 'bg-card text-primary'}`}
            >
              Admin
            </button>
          </div>
        </header>
        <main className="p-6">
          <ContenidoPagina
            votes={votes}
            userVoteId={userVoteId}
            isModalOpen={isModalOpen}
            selectedVote={selectedVote}
            totalVotes={totalVotes}
            getPercentage={getPercentage}
            setIsModalOpen={setIsModalOpen}
            setSelectedVote={setSelectedVote}
            handleSubmitVote={handleSubmitVote}
            view={isAdmin ? 'admin' : 'elector'}
          />
        </main>
      </div>
    </>
  )
}

export default PaginaIntencionVoto
