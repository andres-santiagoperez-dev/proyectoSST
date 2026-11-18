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
        // Señales de seguridad ISO 7010
        senal: {
          peligro: "#DC2626",
          advertencia: "#F59E0B",
          obligacion: "#2563EB",
          seguridad: "#16A34A",
        },
        // Dirección 3 - Blueprint (Público)
        blueprint: {
          dark: "#0B132B",
          surface: "#111C38",
          border: "rgba(56, 189, 248, 0.2)",
          cyan: "#38BDF8",
          accent: "#818CF8",
        },
        // Dirección 2 - Ergonomía Vital (Pausas)
        vital: {
          bg: "#FBFBF9",
          forest: "#14382A",
          forestLight: "#2E654F",
          terracotta: "#D96236",
          terracottaLight: "#F28C63",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
        // Dirección 1 - Demarcación Industrial (Admin)
        industrial: {
          concrete: "#F4F3EF",
          charcoal: "#1A1D20",
          amber: "#D97706",
          dark: "#111827",
          border: "#CBD5E1",
        },
      },
      fontFamily: {
        space: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Space Mono'", "'JetBrains Mono'", "monospace"],
        outfit: ["'Outfit'", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
