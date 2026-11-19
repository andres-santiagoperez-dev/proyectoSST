/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 14 Tokens Oficiales - Ergonomía Vital / El Pulso Humano
        fondos: {
          general: "#F8FAFC", // Azul Grisáceo Claro
          tarjeta: "#FFFFFF", // Blanco Puro
        },
        jerarquia: {
          encabezados: "#0E1B2F", // Azul Marino Oscuro
          secundario: "#64748B", // Gris Azulado
        },
        botones: {
          principal: "#1A56DB", // Azul Corporativo (Inicio de pausa)
          secundario: "#0B7A87", // Agua Marina Oscuro (Cambio de rutina)
        },
        energia: {
          turquesa: "#14B8A6", // Turquesa
          claro: "#2DD4BF", // Turquesa Claro
        },
        respiracion: {
          inhala: "#10B981", // Verde Esmeralda
          sosten: "#14B8A6", // Turquesa
          exhala: "#0B7A87", // Agua Marina Oscuro
        },
        logros: {
          menta: "#34D399", // Verde Menta
          bosque: "#047857", // Verde Bosque
        },
        // Compatibilidad semántica para tokens corporativos
        brand: {
          navy: "#0E1B2F",
          blue: "#1A56DB",
          tealDark: "#0B7A87",
        },
        accent: {
          turquoise: "#14B8A6",
          turquoiseLight: "#2DD4BF",
        },
        vital: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          forest: "#047857",
          forestDark: "#0E1B2F",
          emerald: "#10B981",
          mint: "#34D399",
          border: "#E2E8F0",
          secondary: "#64748B",
          tealDark: "#0B7A87",
        },
        status: {
          active: "#1A56DB",
          break: "#10B981",
          upcoming: "#14B8A6",
          missed: "#0E1B2F",
        },
      },
      fontFamily: {
        outfit: ["'Outfit'", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
        space: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Space Mono'", "'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
