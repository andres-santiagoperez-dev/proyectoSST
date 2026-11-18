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
        industrial: {
          concrete: "#F4F3EF",
          charcoal: "#1A1D20",
          amber: "#D97706",
          dark: "#111827",
          border: "#CBD5E1",
        },
        senal: {
          peligro: "#DC2626",
          advertencia: "#F59E0B",
          obligacion: "#2563EB",
          seguridad: "#16A34A",
        },
      },
      fontFamily: {
        space: ["'Space Grotesk'", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
