/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        surface: "#161616",
        primary: "#E31C25",
        "primary-dark": "#BB000E",
        secondary: "#1C1C1C",
        text: "#FFFFFF",
        muted: "#CCCCCC",
        "muted-foreground": "#888888",
        border: "#222222",
        danger: "#E31C25",
        "danger-dark": "#BB000E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
