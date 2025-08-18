/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f1014",
        surface: "#1a1c23",
        primary: "#ff3e6c",
        secondary: "#2bd1ff",
        text: "#f5f5f5",
        muted: "#7a7b85",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};