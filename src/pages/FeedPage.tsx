import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Post = {
  id: string
  author: string
  text: string
  time: string
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
  },
  {
    id: '2',
    author: 'María López',
    text: '¿Alguien más asistirá al debate esta noche?',
    time: '3h',
  },
  {
    id: '3',
    author: 'Elector Demo',
    text: 'Recuerda: lleva DNI el día de la votación.',
    time: '1d',
  },
]

export default function FeedPage() {
  const auth = React.useMemo(() => getAuth(), [])
  const userName = auth?.user?.nombre ?? 'Usuario'

  const [posts, setPosts] = React.useState<Post[]>(SAMPLE_POSTS)
  const [newText, setNewText] = React.useState('')

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
    }
    setPosts((s) => [p, ...s])
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
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-sm">
                        {userName.split(' ')[0].charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder={`¿Qué está pasando, ${userName.split(' ')[0]}?`}
                      className="placeholder:text-muted-foreground min-h-24 w-full rounded-xl border px-4 py-3 shadow-sm"
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
                      <div>
                        <Button type="submit" variant="default">
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
                className="rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-sm">
                      {p.author.split(' ')[0].charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{p.author}</div>
                          <div className="text-muted-foreground text-xs">
                            @{p.author.split(' ')[0].toLowerCase()}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            • {p.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-muted-foreground">•••</div>
                    </div>
                    <div className="mt-3 text-base leading-relaxed">
                      {p.text}
                    </div>
                    <div className="text-muted-foreground mt-3 flex items-center gap-6 text-sm">
                      <button className="flex items-center gap-2 hover:text-blue-600">
                        💬 <span>12</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-600">
                        🔁 <span>34</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-600">
                        ❤️ <span>128</span>
                      </button>
                      <button className="hover:text-muted-foreground flex items-center gap-2">
                        🔗
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
                    <Button size="sm">Seguir</Button>
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
                    <Button size="sm">Seguir</Button>
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
                    <Button size="sm">Seguir</Button>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <a
                    href="/seguir"
                    className="text-sm font-medium text-blue-600"
                  >
                    Ver más
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </main>
    </div>
  )
}
