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
        blueprint: {
          dark: "#0B132B",
          surface: "#111C38",
          border: "rgba(56, 189, 248, 0.2)",
          cyan: "#38BDF8",
          accent: "#818CF8",
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
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
