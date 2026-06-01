import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FCF9F1",
          100: "#F5EFDF",
          200: "#EBE2C6",
        },
        champagne: {
          400: "#E6CF96",
          500: "#D7B978",
        },
        gold: {
          50: "#FBF6E8",
          100: "#F0E1B8",
          200: "#DEC588",
          300: "#C9A65A",
          400: "#B58E3F",
          500: "#9B782A",
          600: "#7D611D",
          700: "#5F4912",
          800: "#3F300A",
          900: "#241A04",
        },
        ink: {
          50: "#F7F5F0",
          400: "#7A7367",
          700: "#3A352B",
          900: "#16120B",
          950: "#0A0805",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-tc)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-italiana)", "Georgia", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 1.6s ease both",
        "flash": "flash 1.4s ease-out",
        "flash-up": "flashUp 1.8s ease-out",
        "flash-down": "flashDown 1.8s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        flash: {
          "0%":  { color: "#DEC588", textShadow: "0 0 12px rgba(214, 197, 136, 0.6)" },
          "30%": { color: "#DEC588", textShadow: "0 0 12px rgba(214, 197, 136, 0.6)" },
          "100%": { color: "inherit", textShadow: "0 0 0 rgba(214, 197, 136, 0)" },
        },
        // 漲 = 紅 (台灣股市慣例)
        flashUp: {
          "0%":  { color: "#dc2626", textShadow: "0 0 18px rgba(220, 38, 38, 0.7)" },
          "30%": { color: "#dc2626", textShadow: "0 0 18px rgba(220, 38, 38, 0.7)" },
          "100%": { color: "inherit", textShadow: "0 0 0 transparent" },
        },
        // 跌 = 綠 (台灣股市慣例)
        flashDown: {
          "0%":  { color: "#059669", textShadow: "0 0 18px rgba(5, 150, 105, 0.7)" },
          "30%": { color: "#059669", textShadow: "0 0 18px rgba(5, 150, 105, 0.7)" },
          "100%": { color: "inherit", textShadow: "0 0 0 transparent" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
