// src/store/accessibilityStore.ts

import { create } from 'zustand'
// Importamos 'persist' para guardar en localStorage
import { persist, createJSONStorage } from 'zustand/middleware'

// Definimos los tipos de estado
type TextSize = 'normal' | 'grande' | 'muy-grande'

interface AccessibilityState {
  textSize: TextSize
  highContrast: boolean
  setTextSize: (size: TextSize) => void
  setHighContrast: (enabled: boolean) => void
}

// Creamos el store
export const useAccessibilityStore = create<AccessibilityState>()(
  // 'persist' envuelve nuestro store
  persist(
    (set) => ({
      // --- ESTADO INICIAL ---
      textSize: 'normal',
      highContrast: false,

      // --- ACCIONES (Setters) ---
      setTextSize: (size) => set({ textSize: size }),
      setHighContrast: (enabled) => set({ highContrast: enabled }),
    }),
    {
      // Nombre con el que se guardará en localStorage
      name: 'accessibility-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
