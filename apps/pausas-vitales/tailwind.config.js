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
          forest: "#047857",
          forestDark: "#0E1B2F",
          emerald: "#10B981",
          mint: "#34D399",
          terracotta: "#0B7A87", // Ahora alineado con agua marina oscuro / tono corporativo
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
        status: {
          active: "#2563EB",
          break: "#10B981",
          upcoming: "#06B6D4",
          missed: "#1E293B",
        },
        surface: {
          white: "#FFFFFF",
          bg: "#F8FAFC",
          border: "#64748B",
        },
        senal: {
          peligro: "#DC2626",
          advertencia: "#F59E0B",
          obligacion: "#1A56DB",
          seguridad: "#10B981",
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
