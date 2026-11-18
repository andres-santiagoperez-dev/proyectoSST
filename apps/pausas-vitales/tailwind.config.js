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
        vital: {
          bg: "#FBFBF9",
          forest: "#14382A",
          forestLight: "#2E654F",
          terracotta: "#D96236",
          terracottaLight: "#F28C63",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
        senal: {
          peligro: "#DC2626",
          advertencia: "#F59E0B",
          obligacion: "#2563EB",
          seguridad: "#16A34A",
        },
      },
      fontFamily: {
        outfit: ["'Outfit'", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
