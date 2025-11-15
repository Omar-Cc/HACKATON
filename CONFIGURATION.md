# 🚀 Guía de Configuración del Proyecto

¡Bienvenido al equipo! Esta guía te ayudará a configurar el entorno de desarrollo localmente para que puedas empezar a colaborar.

Nuestro proyecto utiliza **Vite**, **React**, **TypeScript** y **pnpm** como nuestro gestor de paquetes.

---

## 1. Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

- **Git:** Para clonar el repositorio.
- **Node.js:** Se recomienda **v22.16.0** o superior. Puedes descargarlo [desde aquí](https://nodejs.org/).

> **Nota:** Este proyecto fue iniciado y probado con `Node.js v22.16.0` y `pnpm v10.14.0`. Usar estas versiones (o superiores) es la mejor forma de evitar conflictos.

---

## 2. Clonar el Repositorio

Primero, clona el repositorio en tu máquina local y navega hasta la carpeta del proyecto.

```bash
git clone https://github.com/Omar-Cc/HACKATON.git
cd HACKATON
```

## 3. Configuración de pnpm

Este proyecto usa pnpm. Es rápido y eficiente en espacio.

### ✅ Paso 3a: Verificar si tienes pnpm

Ejecuta:

```bash
pnpm --version
```

Si ves un número de versión (ej: `10.14.0`), ¡perfecto! Puedes saltar al Paso 4.

Si recibes un error de "comando no encontrado", sigue al Paso 3b.

### 📦 Paso 3b: Instalar pnpm

Corepack viene con Node.js (v16+) y facilita gestionar gestores de paquetes.

Si usas bash/zsh (Unix/macOS) o PowerShell (Windows), ejecuta:

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version
```

Si prefieres instalar pnpm globalmente sin Corepack:

```bash
# Usando npm
npm install -g pnpm
pnpm --version
```

## 4. Siguientes pasos (rápidos)

1. Instala dependencias del proyecto:

```bash
pnpm install
```

1. Ejecuta el servidor de desarrollo:

```bash
pnpm dev
```
