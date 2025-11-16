// Archivo: /data/MiembrosMesa.ts

export const mesaSimulada = {
  presidente: {
    nombre: 'Juan Pérez',
    dni: '12345678',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/presidente.jpg',
  },
  secretario: {
    nombre: 'Ana López',
    dni: '87654321',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/secretario.jpg',
  },
  tercer: {
    nombre: 'Carlos Ruiz',
    dni: '11223344',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/tercer.jpg',
  },
  suplente1: {
    nombre: 'Lucía Torres',
    dni: '55667788',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/suplente1.jpg',
  },
  suplente2: {
    nombre: 'Pedro Castillo',
    dni: '99887766',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
    foto: '/avatars/suplente2.jpg',
  },
} as const

// 👇 ESTA LÍNEA ES LA QUE SOLUCIONA TU ERROR
export type RoleKey = keyof typeof mesaSimulada
// "presidente" | "secretario" | "tercer" | "suplente1" | "suplente2"
