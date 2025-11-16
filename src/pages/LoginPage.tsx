import * as React from 'react'
import { Button } from '@/components/ui/button'

function sleep(ms = 600) {
  return new Promise((r) => setTimeout(r, ms))
}

type User = {
  dni: string
  nombre: string
  apellido: string
  fechaEmision?: string
  email?: string
  password: string
}

function getUsers(): User[] {
  try {
    const raw = localStorage.getItem('mock:users')
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.warn(e)
    return []
  }
}

function setAuth(user: { nombre: string; dni: string }) {
  localStorage.setItem(
    'mock:auth',
    JSON.stringify({ token: 'demo-token', user })
  )
}

export default function LoginPage() {
  const [dni, setDni] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // seed demo user if none
  React.useEffect(() => {
    try {
      const users = getUsers()
      if (users.length === 0) {
        const demo: User = {
          dni: '12345678',
          nombre: 'Demo',
          apellido: 'Usuario',
          email: 'demo@demo.com',
          password: '123456',
        }
        localStorage.setItem('mock:users', JSON.stringify([demo]))
      }
    } catch (err) {
      console.warn(err)
    }
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!/^[0-9]{8}$/.test(dni)) {
      setError('DNI debe tener 8 dígitos')
      return
    }
    if (!password) {
      setError('Ingresa la contraseña')
      return
    }
    setLoading(true)
    await sleep()
    const users = getUsers()
    const found = users.find((u) => u.dni === dni && u.password === password)
    if (!found) {
      setError('Credenciales inválidas')
      setLoading(false)
      return
    }
    setAuth({ nombre: `${found.nombre} ${found.apellido}`, dni: found.dni })
    // redirect to feed
    window.location.href = '/feed'
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold">Iniciar sesión</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              DNI (8 dígitos)
            </label>
            <input
              value={dni}
              onChange={(e) =>
                setDni(e.target.value.replace(/\D/g, '').slice(0, 8))
              }
              className="w-full rounded-md border px-3 py-2"
              type="text"
              placeholder="12345678"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              type="password"
              placeholder="•••••••"
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar'}
            </Button>
            <a className="text-primary text-sm" href="/register">
              Crear cuenta
            </a>
          </div>
        </form>
        <hr className="my-4" />
        <div className="text-muted-foreground text-sm">
          Usuario de prueba: <strong>DNI 12345678</strong> /{' '}
          <strong>123456</strong>
        </div>
      </div>
    </div>
  )
}
