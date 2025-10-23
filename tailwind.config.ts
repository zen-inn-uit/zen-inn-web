import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      /* Colors read from CSS vars (so you can theme later) */
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        icon: "var(--color-icon)",
        form: "var(--color-form)",
        lightbg: "var(--color-bg-light)",
      },

      /* Font families from next/font via CSS vars */
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "serif"],
      },

      /* Typography scale mapped to your tokens */
      fontSize: {
        h1: ["var(--fs-h1)", { lineHeight: "var(--lh-h1)", letterSpacing: "var(--ls-0)", fontWeight: "700" }],
        h2: ["var(--fs-h2)", { lineHeight: "var(--lh-h2)", letterSpacing: "var(--ls-0)", fontWeight: "700" }],
        h3: ["var(--fs-h3)", { lineHeight: "var(--lh-h3)", letterSpacing: "var(--ls-0)", fontWeight: "700" }],
        h4: ["var(--fs-h4)", { lineHeight: "var(--lh-h4)", letterSpacing: "var(--ls-0)", fontWeight: "700" }],
        h5: ["var(--fs-h5)", { lineHeight: "var(--lh-h5)", letterSpacing: "var(--ls-0)", fontWeight: "700" }],
        body: ["var(--fs-body)", { lineHeight: "var(--lh-body)", letterSpacing: "var(--ls-0)", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
export default config;
