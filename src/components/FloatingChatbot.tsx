import React, {
  useState,
  useContext,
  createContext,
  useRef,
  useEffect,
} from 'react'
import {
  MessageCircle,
  X,
  Bot,
  ArrowLeft,
  User, // <--- Icono Elector
  Users, // <--- Icono Miembro de Mesa
  Briefcase, // <--- Icono Presidenciales
  Library, // <--- Icono Bicameral
} from 'lucide-react'
import clsx from 'clsx'

// --- 1. NUEVA ESTRUCTURA DE DATOS (CON ICONOS) ---

interface PrefabQuestion {
  id: string
  question: string
  answer: string
}

// Menú principal
const MAIN_MENU_CATEGORIES = [
  {
    id: 'cat1',
    label: 'Consultas como elector',
    targetView: 'elector_faqs',
    icon: User, // <--- Icono
  },
  {
    id: 'cat2',
    label: 'Consultas como miembro de mesa',
    targetView: 'miembro_faqs',
    icon: Users, // <--- Icono
  },
  {
    id: 'cat3',
    label: 'Candidatos presidenciales',
    targetView: 'presidenciales_faqs',
    icon: Briefcase, // <--- Icono
  },
  {
    id: 'cat4',
    label: 'Cámara bicameral',
    targetView: 'bicameral_faqs',
    icon: Library, // <--- Icono
  },
]

// Todas las preguntas frecuentes, separadas por categoría
const ALL_FAQS: Record<string, PrefabQuestion[]> = {
  elector_faqs: [
    {
      id: 'e1',
      question: '¿Qué es este simulador?',
      answer:
        'Es una herramienta interactiva para que aprendas a votar correctamente paso a paso, desde cómo marcar hasta cómo depositar tu voto.',
    },
    {
      id: 'e2',
      question: '¿Qué marcas son válidas?',
      answer:
        "Según el reglamento, solo la 'X' y el aspa '+' son símbolos válidos para marcar. Cualquier otra marca anulará tu voto.",
    },
    {
      id: 'e3',
      question: '¿Cómo funciona el voto preferencial?',
      answer:
        'Además de marcar el partido, puedes escribir el número de 1 o 2 candidatos de ese mismo partido. ¡Recuerda no repetir números!',
    },
    {
      id: 'e4',
      question: '¿Dónde me toca votar?',
      answer:
        "Puedes consultar tu local de votación en la web oficial del JNE o en nuestra app en la sección 'Local de Votación'.",
    },
  ],
  miembro_faqs: [
    {
      id: 'm1',
      question: '¿Qué hago si soy miembro de mesa?',
      answer:
        'Debes presentarte en tu local de votación a las 7:00 a.m. con tu DNI. Recibirás capacitación y materiales para la jornada electoral.',
    },
    {
      id: 'm2',
      question: '¿A qué hora debo llegar?',
      answer:
        'La instalación de la mesa es a las 7:00 a.m. Es crucial tu puntualidad para que la votación inicie a tiempo.',
    },
    {
      id: 'm3',
      question: '¿Recibiré un pago?',
      answer:
        'Sí, los miembros de mesa reciben una compensación económica por su labor. El monto es fijado por la ONPE antes de la elección.',
    },
  ],
  presidenciales_faqs: [
    {
      id: 'p1',
      question: '¿Quiénes son los candidatos?',
      answer:
        "Puedes ver la lista completa de candidatos presidenciales en la sección 'Candidatos' de esta aplicación.",
    },
    {
      id: 'p2',
      question: '¿Dónde veo sus planes de gobierno?',
      answer:
        'Todos los planes de gobierno están disponibles en la plataforma oficial del JNE y también hemos incluido un resumen en el perfil de cada candidato.',
    },
  ],
  bicameral_faqs: [
    {
      id: 'b1',
      question: '¿Qué es la bicameralidad?',
      answer:
        'Significa que el Congreso estará dividido en dos cámaras: la Cámara de Senadores y la Cámara de Diputados, en lugar de una sola.',
    },
    {
      id: 'b2',
      question: '¿Cómo se vota para senadores?',
      answer:
        'Votarás por un partido para el Senado. Es una lista cerrada a nivel nacional. También podrás usar el voto preferencial si está habilitado.',
    },
    {
      id: 'b3',
      question: '¿Y para diputados?',
      answer:
        'La elección de diputados es por distrito electoral (región). Marcarás por un partido y podrás usar tu voto preferencial para los candidatos de tu región.',
    },
  ],
}

// --- TIPOS Y ESTADO DEL CHAT ---
interface ChatMessage {
  id: number
  sender: 'user' | 'bot'
  text: string
}

interface ChatbotContextType {
  isChatOpen: boolean
  toggleChat: () => void
}

// Estado para la vista del menú (main_menu o una categoría de FAQ)
type ChatView =
  | 'main_menu'
  | 'elector_faqs'
  | 'miembro_faqs'
  | 'presidenciales_faqs'
  | 'bicameral_faqs'

const ChatbotContext = createContext<ChatbotContextType | null>(null)

const useChatbot = () => {
  const context = useContext(ChatbotContext)
  if (!context) {
    throw new Error('useChatbot debe ser usado dentro de un ChatbotProvider')
  }
  return context
}

// --- 1. EL BOTÓN FLOTANTE (Sin cambios) ---
const ChatbotButton: React.FC = () => {
  const { isChatOpen, toggleChat } = useChatbot()

  return (
    <button
      onClick={toggleChat}
      className={clsx(
        'bg-primary text-primary-foreground fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110',
        isChatOpen && 'scale-0 opacity-0' // Se oculta cuando la ventana está abierta
      )}
      aria-label="Abrir chat de ayuda"
    >
      <MessageCircle className="h-8 w-8" />
    </button>
  )
}

// --- 2. LA VENTANA DEL CHAT (Con lógica de menú) ---
const ChatWindow: React.FC = () => {
  const { isChatOpen, toggleChat } = useChatbot()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: 'bot',
      text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?',
    },
  ])
  const [isBotTyping, setIsBotTyping] = useState(false)

  // --- NUEVO ESTADO PARA EL MENÚ ---
  const [currentView, setCurrentView] = useState<ChatView>('main_menu')

  const messageEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll al final
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Oculta el menú y resetea al cerrar
  useEffect(() => {
    if (!isChatOpen) {
      // Pequeño delay para que no se vea el reseteo durante la animación de cierre
      setTimeout(() => {
        setCurrentView('main_menu')
        // Resetea los mensajes al saludo inicial
        setMessages([
          {
            id: 0,
            sender: 'bot',
            text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?',
          },
        ])
      }, 300)
    }
  }, [isChatOpen])

  const handleQuestionClick = (qa: PrefabQuestion) => {
    if (isBotTyping) return

    setIsBotTyping(true)
    // Añadir pregunta del usuario
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: qa.question },
    ])

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: qa.answer },
      ])
      setIsBotTyping(false)
    }, 1000)
  }

  // --- NUEVOS MANEJADORES DE MENÚ ---
  const handleCategoryClick = (targetView: ChatView) => {
    setCurrentView(targetView)
  }

  const handleBackToMenu = () => {
    setCurrentView('main_menu')
  }

  // --- Renderizado condicional del Footer ---
  const renderFooterContent = () => {
    if (isBotTyping) {
      return (
        <div className="flex justify-start">
          <div className="border-border bg-background text-foreground rounded-2xl rounded-bl-none border px-4 py-3 shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full delay-0"></span>
              <span className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full delay-150"></span>
              <span className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full delay-300"></span>
            </div>
          </div>
        </div>
      )
    }

    if (currentView === 'main_menu') {
      return (
        <p className="text-muted-foreground text-center text-sm">
          Selecciona una categoría para empezar.
        </p>
      )
    }

    // Si no es 'main_menu', es una vista de FAQ
    const currentFaqs = ALL_FAQS[currentView] || []
    return (
      <div>
        <button
          onClick={handleBackToMenu}
          className="text-primary hover:bg-primary/10 mb-2 flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al menú
        </button>
        <div className="flex flex-wrap gap-2">
          {currentFaqs.map((qa) => (
            <button
              key={qa.id}
              onClick={() => handleQuestionClick(qa)}
              className="border-primary text-primary hover:bg-primary/10 rounded-full border bg-transparent px-3 py-1.5 text-sm font-medium transition-colors"
            >
              {qa.question}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'bg-card fixed right-6 bottom-6 z-50 flex h-[70vh] w-[90vw] max-w-md flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ease-in-out md:h-[600px]',
        isChatOpen
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 scale-95 opacity-0',
        !isChatOpen && 'pointer-events-none' // Evita clics cuando está oculto
      )}
    >
      {/* Header */}
      <header className="border-border bg-card flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <Bot className="h-6 w-6" />
          </div>
          <h3 className="text-foreground text-lg font-semibold">
            Asistente Virtual
          </h3>
        </div>
        <button
          onClick={toggleChat}
          className="text-muted-foreground hover:bg-accent rounded-full p-2"
          aria-label="Cerrar chat"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      {/* Cuerpo de Mensajes (Ahora con categorías) */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                'flex w-full',
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={clsx(
                  'max-w-xs rounded-2xl px-4 py-3 shadow-md md:max-w-sm',
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'border-border bg-background text-foreground rounded-bl-none border'
                )}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- AQUÍ ESTÁN LOS CUADRADOS AZULES --- */}
        {currentView === 'main_menu' && !isBotTyping && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {MAIN_MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.targetView as ChatView)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-28 flex-col items-center justify-center gap-2 rounded-lg p-3 text-center shadow-md transition-all"
              >
                <cat.icon className="h-8 w-8" />
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      {/* Footer de Preguntas (Ahora dinámico) */}
      <footer className="border-border bg-background/50 h-auto max-h-[40%] overflow-y-auto border-t p-4">
        {renderFooterContent()}
      </footer>
    </div>
  )
}

// --- 3. EL COMPONENTE PÚBLICO (Sin cambios) ---
/**
 * Añade este componente a tu layout raíz (ej. __root.tsx)
 * para que el botón y la ventana del chat floten sobre toda la app.
 */
export const FloatingChatbot: React.FC = () => {
  return (
    <>
      <ChatWindow />
      <ChatbotButton />
    </>
  )
}

// --- 4. EL PROVIDER (Sin cambios) ---
/**
 * Envuelve tu aplicación (usualmente en main.tsx o __root.tsx)
 * con este provider para que el estado del chat sea global.
 */
const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const toggleChat = () => setIsChatOpen((prev) => !prev)

  return (
    <ChatbotContext.Provider value={{ isChatOpen, toggleChat }}>
      {children}
    </ChatbotContext.Provider>
  )
}

export default ChatbotProvider
