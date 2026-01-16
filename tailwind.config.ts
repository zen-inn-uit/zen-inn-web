import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Segoe UI", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        outfit: ["Segoe UI", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      colors: {
        brand: "var(--color-brand)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
};

export default config;