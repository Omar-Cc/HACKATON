import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ChevronDown } from 'lucide-react'

type Suggestion = {
  id: string
  name: string
  username: string
  bio?: string
  posts?: number
  followers?: number
  following?: number
  topics?: string[]
}

const SAMPLE_SUGGESTIONS: Suggestion[] = [
  {
    id: 's1',
    name: 'Alex Mendoza',
    username: 'm_alex',
    bio: 'Activista cívico y defensor del voto informado.',
    posts: 433,
    followers: 377000,
    following: 370,
    topics: ['Voto informado', 'Transparencia'],
  },
  {
    id: 's2',
    name: 'Sofía García',
    username: 'sofiagarcia',
    bio: 'Periodista especializada en política local.',
    posts: 120,
    followers: 21500,
    following: 340,
    topics: ['Periodismo', 'Educación cívica'],
  },
  {
    id: 's3',
    name: 'Unidad Ciudadana',
    username: 'unidad_ciu',
    bio: 'Organización ciudadana por la transparencia.',
    posts: 88,
    followers: 5200,
    following: 150,
    topics: ['Transparencia', 'Organización'],
  },
  {
    id: 's4',
    name: 'Marco Ruiz',
    username: 'marcor',
    bio: 'Analista de datos electorales.',
    posts: 45,
    followers: 8200,
    following: 220,
  },
  {
    id: 's5',
    name: 'Paola Vega',
    username: 'pvega',
    bio: 'Educadora cívica y voluntaria.',
    posts: 76,
    followers: 4300,
    following: 98,
  },
  {
    id: 's6',
    name: 'Diego Ramos',
    username: 'diego_r',
    bio: 'Estudiante de derecho y activista.',
    posts: 34,
    followers: 1600,
    following: 200,
  },
  {
    id: 's7',
    name: 'Lucía Torres',
    username: 'luciatorres',
    bio: 'Investigadora en políticas públicas.',
    posts: 64,
    followers: 3400,
    following: 120,
  },
  {
    id: 's8',
    name: 'Andrés Paredes',
    username: 'andresp',
    bio: 'Especialista en transparencia electoral.',
    posts: 52,
    followers: 2900,
    following: 90,
  },
  {
    id: 's9',
    name: 'Marta Silva',
    username: 'marta_s',
    bio: 'Educadora y organizadora comunitaria.',
    posts: 22,
    followers: 800,
    following: 45,
  },
  {
    id: 's10',
    name: 'Roberto Díaz',
    username: 'robertodiaz',
    bio: 'Columnista y analista político.',
    posts: 210,
    followers: 12000,
    following: 560,
  },
  {
    id: 's11',
    name: 'Carla Mendez',
    username: 'carlam',
    bio: 'Activista por el voto joven.',
    posts: 18,
    followers: 1500,
    following: 78,
  },
  {
    id: 's12',
    name: 'Jorge Peña',
    username: 'jorgepen',
    bio: 'Periodista de investigación.',
    posts: 98,
    followers: 6400,
    following: 310,
  },
  {
    id: 's13',
    name: 'Natalia Ríos',
    username: 'natarios',
    bio: 'Voluntaria en educación cívica.',
    posts: 12,
    followers: 600,
    following: 32,
  },
  {
    id: 's14',
    name: 'Equipo Voto',
    username: 'equipo_voto',
    bio: 'Equipo informativo sobre elecciones.',
    posts: 310,
    followers: 82000,
    following: 120,
  },
  {
    id: 's15',
    name: 'Bruno Castillo',
    username: 'brunoc',
    bio: 'Analista de datos ciudadanos.',
    posts: 27,
    followers: 900,
    following: 40,
  },
  {
    id: 's16',
    name: 'Fernanda Cruz',
    username: 'fercruz',
    bio: 'Comunicadora y defensora de la transparencia.',
    posts: 41,
    followers: 2400,
    following: 88,
  },
]

// localStorage key for topics the user follows
const TOPICS_KEY = 'mock:topics'

function readTopics(): string[] {
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

export default function FollowSuggestions() {
  const [following, setFollowing] = React.useState<string[]>(() =>
    readFollowing()
  )
  const [visibleCount, setVisibleCount] = React.useState<number>(8)
  const [topicsFollowing, setTopicsFollowing] = React.useState<string[]>(() =>
    readTopics()
  )

  function formatNumber(n?: number) {
    if (n == null) return ''
    if (n >= 1_000_000)
      return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
    return String(n)
  }

  function toggleFollow(username: string) {
    setFollowing((prev) => {
      const isFollowing = prev.includes(username)
      const next = isFollowing
        ? prev.filter((u) => u !== username)
        : [username, ...prev]
      writeFollowing(next)
      // show toast feedback
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

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-2xl bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Personas que podrías seguir
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {SAMPLE_SUGGESTIONS.slice(0, visibleCount).map((s) => {
              const isFollowing = following.includes(s.username)
              const initials = s.name
                .split(' ')
                .slice(0, 2)
                .map((n) => n.charAt(0))
                .join('')
                .toUpperCase()

              return (
                <Card key={s.id} className="rounded-xl p-6 shadow-md">
                  <CardContent className="flex flex-col items-center gap-4 text-center">
                    <Link
                      to={'/u/$slug'}
                      params={{ slug: s.username }}
                      className="inline-block"
                    >
                      <Avatar className="h-28 w-28 shadow-sm ring-1 ring-slate-100">
                        <AvatarFallback className="text-3xl">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </Link>

                    <div>
                      <a
                        href={`/u/${encodeURIComponent(s.username)}`}
                        className="inline-flex items-center gap-2 text-lg font-semibold hover:underline"
                      >
                        {s.name}
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                          ✓
                        </span>
                      </a>
                      <div className="text-muted-foreground text-sm">
                        @{s.username}
                      </div>

                      {/* topics */}
                      {s.topics && s.topics.length > 0 && (
                        <div className="mt-2 flex flex-wrap justify-center gap-2">
                          {s.topics.map((t) => (
                            <button
                              key={t}
                              onClick={() => toggleTopic(t)}
                              className={`rounded-full border px-2 py-1 text-xs ${topicsFollowing.includes(t) ? 'border-blue-600 bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
                              title={`Seguir tema: ${t}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="h-12 overflow-hidden text-sm text-gray-600">
                      {s.bio}
                    </p>

                    <div className="grid w-full grid-cols-3 gap-3 text-center text-sm text-slate-600">
                      <div>
                        <div className="text-base font-semibold">
                          {formatNumber(s.posts)}
                        </div>
                        <div className="text-muted-foreground">Posts</div>
                      </div>
                      <div>
                        <div className="text-base font-semibold">
                          {formatNumber(s.followers)}
                        </div>
                        <div className="text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-base font-semibold">
                          {formatNumber(s.following)}
                        </div>
                        <div className="text-muted-foreground">Following</div>
                      </div>
                    </div>

                    <div className="w-full">
                      <Button
                        className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 ${isFollowing ? 'border bg-white text-slate-700' : 'bg-blue-600 text-white'}`}
                        onClick={() => toggleFollow(s.username)}
                      >
                        <span className="font-medium">
                          {isFollowing ? 'Siguiendo' : 'Seguir'}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {visibleCount < SAMPLE_SUGGESTIONS.length && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() =>
                  setVisibleCount((v) =>
                    Math.min(SAMPLE_SUGGESTIONS.length, v + 8)
                  )
                }
              >
                Cargar más
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
