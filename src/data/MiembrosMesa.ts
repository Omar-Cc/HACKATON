export type MemberInfo = {
  nombre: string
  dni: string
  local: string
  mesa: string
  presente: boolean
  foto?: string
  fechaHabilitada?: string
  horaIngreso?: string
  fechaNacimiento?: string
}

export type RoleKey =
  | 'presidente'
  | 'secretario'
  | 'tercer'
  | 'suplente1'
  | 'suplente2'

export const mesaSimulada: Record<RoleKey, MemberInfo> = {
  presidente: {
    nombre: 'Juan Pérez',
    dni: '12345678',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/presidente.jpg',
    fechaHabilitada: '2024-01-01T07:00:00', // habilitado
    fechaNacimiento: '1990-05-12',
  },

  secretario: {
    nombre: 'Ana López',
    dni: '87654321',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/secretario.jpg',
    fechaHabilitada: '2026-11-15T07:00:00', // NO habilitado
  },

  tercer: {
    nombre: 'Carlos Ruiz',
    dni: '11223344',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/tercero.jpg',
    fechaHabilitada: '2024-01-01T07:00:00',
  },

  suplente1: {
    nombre: 'Lucía Torres',
    dni: '55667788',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/suplente1.jpg',
    fechaNacimiento: '2010-05-12',
  },

  suplente2: {
    nombre: 'Pedro Castillo',
    dni: '99887766',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/suplente2.jpg',
  },
}

export const voluntarioBase: MemberInfo = {
  nombre: 'Voluntario Invitado',
  dni: '00000000',
  local: 'IE 3051 San Marcos',
  mesa: '045621',
  presente: false,
  foto: '/avatars/voluntario.jpg',
}
