// Archivo: /data/MiembrosMesa.ts

export const mesaSimulada = {
  presidente: {
    dni: '12345678',
    nombre: 'Juan Pérez',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
  },
  secretario: {
    dni: '87654321',
    nombre: 'Ana López',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
  },
  tercer: {
    dni: '11223344',
    nombre: 'Carlos Ruiz',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
  },
  suplente1: {
    dni: '55667788',
    nombre: 'Lucía Torres',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
  },
  suplente2: {
    dni: '99887766',
    nombre: 'Pedro Castillo',
    local: 'IE 3051 San Marcos',
    mesa: '045621',
    presente: false,
  },
} as const

// 👇 ESTA LÍNEA ES LA QUE SOLUCIONA TU ERROR
export type RoleKey = keyof typeof mesaSimulada
// "presidente" | "secretario" | "tercer" | "suplente1" | "suplente2"
