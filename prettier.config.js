// prettier.config.js
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  // --- Pega tus reglas de .prettierrc aquí ---
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  // --- ---

  plugins: ['prettier-plugin-tailwindcss'], // Esta línea ya la tenías
}
