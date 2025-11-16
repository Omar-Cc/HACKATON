import * as React from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Repeat, Heart, Link2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Post = {
  id: string
  author: string
  text: string
  time: string
  comments: number
  shares: number
  likes: number
  liked?: boolean
  isNew?: boolean
  topics?: string[]
}

function getAuth() {
  try {
    const raw = localStorage.getItem('mock:auth')
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.warn(e)
    return null
  }
}

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    author: 'Juan Perez',
    text: 'Revisa la guía de voto informado en VotoContigo.',
    time: '2h',
    comments: 12,
    shares: 34,
    likes: 128,
    liked: false,
    topics: ['Voto informado', 'Guías'],
  },
  {
    id: '2',
    author: 'María López',
    text: '¿Alguien más asistirá al debate esta noche?',
    time: '3h',
    comments: 3,
    shares: 5,
    likes: 20,
    liked: false,
    topics: ['Debate', 'Eventos'],
  },
  {
    id: '3',
    author: 'Elector Demo',
    text: 'Recuerda: lleva DNI el día de la votación.',
    time: '1d',
    comments: 1,
    shares: 2,
    likes: 4,
    liked: false,
    topics: ['Recordatorio'],
  },
]

const TOPICS_KEY = 'mock:topics'

function readTopics() {
  try {
    const raw = localStorage.getItem(TOPICS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeTopics(list: string[]) {
  try {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

export default function FeedPage() {
  const auth = React.useMemo(() => getAuth(), [])
  const userName = auth?.user?.nombre ?? 'Usuario'

  const [posts, setPosts] = React.useState<Post[]>(SAMPLE_POSTS)
  const [newText, setNewText] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const STORAGE_KEY = 'mock:following'

  function readFollowing(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function writeFollowing(list: string[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {
      // ignore
    }
  }

  const [following, setFollowing] = React.useState<string[]>(() =>
    readFollowing()
  )
  const [topicsFollowing, setTopicsFollowing] = React.useState<string[]>(() =>
    readTopics()
  )

  function toggleFollow(username: string) {
    setFollowing((prev) => {
      const isFollowing = prev.includes(username)
      const next = isFollowing
        ? prev.filter((u) => u !== username)
        : [username, ...prev]
      writeFollowing(next)
      if (isFollowing) {
        toast('Dejado de seguir', {
          description: `Has dejado de seguir a @${username}`,
        })
      } else {
        toast('Siguiendo', { description: `Ahora sigues a @${username}` })
      }
      return next
    })
  }

  function toggleTopic(topic: string) {
    setTopicsFollowing((prev) => {
      const is = prev.includes(topic)
      const next = is ? prev.filter((t) => t !== topic) : [topic, ...prev]
      writeTopics(next)
      if (is)
        toast('Dejado de seguir tema', {
          description: `Has dejado de seguir: ${topic}`,
        })
      else toast('Siguiendo tema', { description: `Ahora sigues: ${topic}` })
      return next
    })
  }

  function toggleLike(postId: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        const liked = !p.liked
        return {
          ...p,
          liked,
          likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1),
        }
      })
    )
  }

  function handleShare(postId: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, shares: p.shares + 1 } : p))
    )
  }

  function handleCommentClick(postId: string) {
    // enfoca el composer y añade una mención rápida
    textareaRef.current?.focus()
    setNewText((t) =>
      t ? t : `@${posts.find((p) => p.id === postId)?.author.split(' ')[0]} `
    )
  }

  function logout() {
    try {
      localStorage.removeItem('mock:auth')
    } catch (e) {
      console.warn(e)
    }
    window.location.href = '/login'
  }

  function submitPost(e?: React.FormEvent) {
    e?.preventDefault()
    if (!newText.trim()) return
    const p: Post = {
      id: String(Date.now()),
      author: userName,
      text: newText.trim(),
      time: 'Ahora',
      comments: 0,
      shares: 0,
      likes: 0,
      liked: false,
      isNew: true,
    }
    setPosts((s) => {
      const next = [p, ...s]
      // limpiar la marca isNew después de un corto delay
      setTimeout(() => {
        setPosts((prev) =>
          prev.map((x) => (x.id === p.id ? { ...x, isNew: false } : x))
        )
      }, 1500)
      return next
    })
    setNewText('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-12">
        {/* Left nav */}
        <aside className="hidden md:col-span-3 md:block lg:col-span-2">
          <div className="sticky top-20 flex flex-col gap-4">
            <Card className="rounded-xl shadow-lg">
              <CardContent className="flex flex-col gap-3">
                <nav className="flex flex-col gap-2">
                  <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white active:border-l-4 active:border-blue-500">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-gray-100 ring-inset">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z"
                          stroke="#0f172a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Inicio</div>
                  </button>

                  <button className="text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-gray-100 ring-inset">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 21l-4.35-4.35"
                          stroke="#0f172a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="11"
                          cy="11"
                          r="6"
                          stroke="#0f172a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-sm">Explorar</div>
                  </button>

                  <button className="text-muted-foreground relative flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-gray-100 ring-inset">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
                          stroke="#0f172a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-sm">Notificaciones</div>
                    <span className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-[11px] text-white">
                      1
                    </span>
                  </button>
                </nav>

                <div className="mt-2">
                  <Button
                    className="w-full rounded-full py-3"
                    variant="default"
                  >
                    Postear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Center feed */}
        <section className="col-span-1 md:col-span-6 lg:col-span-7">
          <div className="mt-4 space-y-4">
            <Card className="rounded-xl">
              <CardContent>
                <form onSubmit={submitPost} className="flex gap-4">
                  <div className="shrink-0">
                    <Avatar className="h-12 w-12 md:h-14 md:w-14">
                      <AvatarFallback className="text-sm md:text-base">
                        {userName.split(' ')[0].charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder={`¿Qué está pasando, ${userName.split(' ')[0]}?`}
                      className="placeholder:text-muted-foreground min-h-24 w-full resize-none rounded-xl border px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none md:min-h-[120px] md:text-base"
                      aria-label="Composer de publicación"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        <button
                          type="button"
                          className="rounded-md px-2 py-1 hover:bg-gray-100"
                        >
                          🖼️
                        </button>
                        <button
                          type="button"
                          className="rounded-md px-2 py-1 hover:bg-gray-100"
                        >
                          😊
                        </button>
                        <button
                          type="button"
                          className="rounded-md px-2 py-1 hover:bg-gray-100"
                        >
                          📍
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-muted-foreground text-sm">
                          {newText.length}/280
                        </div>
                        <Button
                          type="submit"
                          variant="default"
                          disabled={!newText.trim()}
                        >
                          Postear
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {posts.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md md:p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar y nombre enlazados al perfil del autor */}
                  <Link
                    to={'/u/$slug'}
                    params={{
                      slug: encodeURIComponent(
                        p.author.split(' ')[0].toLowerCase()
                      ),
                    }}
                    className="inline-block shrink-0"
                  >
                    <Avatar className="h-12 w-12 md:h-14 md:w-14">
                      <AvatarFallback className="text-sm md:text-base">
                        {p.author.split(' ')[0].charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            to={'/u/$slug'}
                            params={{
                              slug: encodeURIComponent(
                                p.author.split(' ')[0].toLowerCase()
                              ),
                            }}
                            className="font-semibold hover:underline"
                          >
                            {p.author}
                          </Link>
                          <div className="text-muted-foreground text-xs">
                            @{p.author.split(' ')[0].toLowerCase()}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            • {p.time}
                          </div>
                        </div>
                        {/* post topics */}
                        {p.topics && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {p.topics.map((t) => (
                              <button
                                key={t}
                                onClick={() => toggleTopic(t)}
                                className={`rounded-full border px-2 py-1 text-xs ${topicsFollowing.includes(t) ? 'border-blue-600 bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-muted-foreground">•••</div>
                    </div>
                    <div
                      className={`mt-3 text-base leading-relaxed whitespace-pre-wrap ${p.isNew ? 'rounded-md p-2 ring-2 ring-blue-100' : ''}`}
                      style={{
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                      }}
                    >
                      {p.text}
                    </div>

                    <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-3 text-sm">
                      <button
                        onClick={() => handleCommentClick(p.id)}
                        className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-gray-100"
                        aria-label="Comentar"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{p.comments}</span>
                      </button>

                      <button
                        onClick={() => handleShare(p.id)}
                        className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-gray-100"
                        aria-label="Compartir"
                      >
                        <Repeat className="h-4 w-4" />
                        <span>{p.shares}</span>
                      </button>

                      <button
                        onClick={() => toggleLike(p.id)}
                        className={`flex items-center gap-2 rounded-md px-2 py-1 transition ${p.liked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
                        aria-label="Me gusta"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{p.likes}</span>
                      </button>

                      <button className="hover:text-muted-foreground flex items-center gap-2 rounded-md px-2 py-1 transition">
                        <Link2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right column */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="space-y-4">
            <div>
              <Card className="rounded-xl shadow-sm">
                <CardContent className="flex items-center gap-3 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm">
                      {userName.split(' ')[0].charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{userName}</div>
                    <div className="text-muted-foreground text-xs">
                      @{userName.split(' ')[0].toLowerCase()}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Salir
                  </Button>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent>
                <div className="font-semibold">Qué está pasando</div>
                <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
                  <li>#Elecciones2026 • 1.3k publicaciones</li>
                  <li>#VotoInformado • 2.1k publicaciones</li>
                  <li>#DebatePresidencial • 900 publicaciones</li>
                  <li>#Participa2026 • 800 publicaciones</li>
                  <li>#VotaSeguro • 500 publicaciones</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="font-semibold">A quién seguir</div>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">Alex Mendoza</div>
                        <div className="text-muted-foreground text-sm">
                          @m_alex
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={
                        following.includes('m_alex') ? 'outline' : 'default'
                      }
                      onClick={() => toggleFollow('m_alex')}
                    >
                      {following.includes('m_alex') ? 'Siguiendo' : 'Seguir'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>SG</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">Sofía García</div>
                        <div className="text-muted-foreground text-sm">
                          @sofiagarcia
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={
                        following.includes('sofiagarcia')
                          ? 'outline'
                          : 'default'
                      }
                      onClick={() => toggleFollow('sofiagarcia')}
                    >
                      {following.includes('sofiagarcia')
                        ? 'Siguiendo'
                        : 'Seguir'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>UC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">Unidad Ciudadana</div>
                        <div className="text-muted-foreground text-sm">
                          @unidad_ciu
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={
                        following.includes('unidad_ciu') ? 'outline' : 'default'
                      }
                      onClick={() => toggleFollow('unidad_ciu')}
                    >
                      {following.includes('unidad_ciu')
                        ? 'Siguiendo'
                        : 'Seguir'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </main>
    </div>
  )
}
