/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgb(42, 42, 42)",
        input: "rgb(42, 42, 42)",
        ring: "rgb(0, 255, 170)",
        background: "rgb(13, 13, 13)",
        foreground: "rgb(250, 250, 250)",
        primary: {
          DEFAULT: "rgb(0, 255, 170)",
          foreground: "rgb(13, 13, 13)",
        },
        secondary: {
          DEFAULT: "rgb(255, 184, 0)",
          foreground: "rgb(13, 13, 13)",
        },
        destructive: {
          DEFAULT: "rgb(255, 59, 92)",
          foreground: "rgb(250, 250, 250)",
        },
        muted: {
          DEFAULT: "rgb(22, 22, 22)",
          foreground: "rgb(110, 110, 110)",
        },
        accent: {
          DEFAULT: "rgb(255, 184, 0)",
          foreground: "rgb(13, 13, 13)",
        },
        card: {
          DEFAULT: "rgb(22, 22, 22)",
          foreground: "rgb(250, 250, 250)",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        display: ["Clash Display", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-in-from-top-2": {
          from: { transform: "translateY(-8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in-from-top-2": "slide-in-from-top-2 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
