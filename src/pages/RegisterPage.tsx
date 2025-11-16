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

function saveUser(u: User) {
  const users = getUsers()
  users.push(u)
  localStorage.setItem('mock:users', JSON.stringify(users))
}

function setAuth(user: { nombre: string; dni: string }) {
  localStorage.setItem(
    'mock:auth',
    JSON.stringify({ token: 'demo-token', user })
  )
}

export default function RegisterPage() {
  const [dni, setDni] = React.useState('')
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [fechaEmision, setFechaEmision] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!/^[0-9]{8}$/.test(dni)) {
      setError('DNI debe tener 8 dígitos numéricos')
      return
    }
    if (!nombre || !apellido) {
      setError('Ingresa nombre y apellido')
      return
    }
    if (!password || password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    await sleep()
    const users = getUsers()
    if (users.some((u) => u.dni === dni)) {
      setError('Ya existe una cuenta con ese DNI')
      setLoading(false)
      return
    }
    const user: User = {
      dni,
      nombre,
      apellido,
      fechaEmision: fechaEmision || undefined,
      email: email || undefined,
      password,
    }
    saveUser(user)
    setSuccess('Registro exitoso. Se inició sesión automáticamente.')
    setAuth({ nombre: `${nombre} ${apellido}`, dni })
    setLoading(false)
    setTimeout(() => {
      window.location.href = '/feed'
    }, 800)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold">Crear cuenta</h2>
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Apellido</label>
              <input
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Fecha de emisión
            </label>
            <input
              value={fechaEmision}
              onChange={(e) => setFechaEmision(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              type="date"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Correo (opcional)
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              type="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              type="password"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Verificar contraseña
            </label>
            <input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              type="password"
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-green-600">{success}</div>}
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear cuenta'}
            </Button>
            <a className="text-primary text-sm" href="/login">
              Ir a login
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
