export default function LogoPeruVoto() {
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo azul estilo AppStore */}
      <rect width="110" height="110" rx="24" fill="#1D4ED8" />

      {/* Urna minimalista */}
      <rect
        x="28"
        y="55"
        width="54"
        height="32"
        rx="6"
        fill="#ffffff"
        stroke="#dbeafe"
        strokeWidth="2"
      />

      {/* Ranura */}
      <rect
        x="42"
        y="48"
        width="26"
        height="6"
        rx="2"
        fill="#1e3a8a"
        opacity="0.8"
      />

      {/* Papeleta entrando */}
      <rect
        x="46"
        y="28"
        width="18"
        height="25"
        rx="3"
        fill="#ffffff"
        stroke="#dbeafe"
        strokeWidth="1.5"
        transform="rotate(5 46 28)"
      />
    </svg>
  )
}
