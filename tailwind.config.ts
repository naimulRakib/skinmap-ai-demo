import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── SkinMap AI design tokens ──────────────────────────────────────
      colors: {
        navy: {
          DEFAULT: "#101828",
          50: "#f0f4ff",
          100: "#dce6ff",
          200: "#b9cefd",
          300: "#84abfa",
          400: "#4d81f5",
          500: "#2563eb",
          600: "#1748ce",
          700: "#1538a5",
          800: "#173087",
          900: "#182d6e",
          950: "#101828",
        },
        teal: {
          DEFAULT: "#13B8A6",
          50: "#f0fdfa",
          100: "#ccfbf3",
          200: "#99f5e8",
          300: "#5dead9",
          400: "#2dd4c4",
          500: "#13B8A6",
          600: "#0d9488",
          700: "#0f756c",
          800: "#115d57",
          900: "#134d48",
          950: "#042f2c",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
        },
        amber: {
          DEFAULT: "#FFB547",
          light: "#FFF3CD",
          dark: "#CC8800",
        },
        coral: {
          DEFAULT: "#FF7A66",
          light: "#FFE8E5",
          dark: "#CC3D2A",
        },
        emerald: {
          DEFAULT: "#4ADE80",
          light: "#DCFCE7",
          dark: "#166534",
        },
        "soft-blue": {
          DEFAULT: "#7DB7F0",
          light: "#EFF6FF",
          dark: "#1E40AF",
        },
      },

      // ── Typography ────────────────────────────────────────────────────
      fontFamily: {
        // Bengali body — set via next/font in layout.tsx
        sans: ["var(--font-noto-bengali)", "system-ui", "sans-serif"],
        // Bengali display headings
        display: ["var(--font-hind-siliguri)", "var(--font-noto-bengali)", "sans-serif"],
      },
      fontSize: {
        // Minimum 16px for Bengali body text
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.7" }],       // Bengali body line-height 1.7
        lg: ["1.125rem", { lineHeight: "1.7" }],
        xl: ["1.25rem", { lineHeight: "1.35" }],      // Bengali heading line-height 1.35
        "2xl": ["1.5rem", { lineHeight: "1.35" }],
        "3xl": ["1.875rem", { lineHeight: "1.35" }],
        "4xl": ["2.25rem", { lineHeight: "1.35" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
      },

      // ── Border radius ─────────────────────────────────────────────────
      borderRadius: {
        card: "24px",
        chip: "999px",
        DEFAULT: "12px",
      },

      // ── Box shadows ───────────────────────────────────────────────────
      boxShadow: {
        // Soft low-contrast shadows
        card: "0 4px 24px 0 rgba(16, 24, 40, 0.06)",
        "card-hover": "0 8px 32px 0 rgba(16, 24, 40, 0.10)",
        // Teal-tinted glow for primary actions only
        teal: "0 0 0 4px rgba(19, 184, 166, 0.20), 0 4px 16px 0 rgba(19, 184, 166, 0.15)",
        "teal-sm": "0 0 0 2px rgba(19, 184, 166, 0.15)",
        // Status glows
        amber: "0 0 0 4px rgba(255, 181, 71, 0.20)",
        coral: "0 0 0 4px rgba(255, 122, 102, 0.20)",
        green: "0 0 0 4px rgba(74, 222, 128, 0.20)",
      },

      // ── Spacing ───────────────────────────────────────────────────────
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
        "tab-height": "72px",
        "phone-width": "390px",
      },

      // ── Animations ────────────────────────────────────────────────────
      keyframes: {
        "scan-sweep": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "path-draw": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "status-in": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "ring-fill": {
          from: { strokeDashoffset: "var(--ring-max)" },
          to: { strokeDashoffset: "var(--ring-offset)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "scan-sweep": "scan-sweep 2s ease-in-out infinite",
        "count-up": "count-up 0.4s ease-out",
        "path-draw": "path-draw 0.8s ease-out forwards",
        "status-in": "status-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fade-up": "fade-up 0.25s ease-out",
        "ring-fill": "ring-fill 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
      },

      // ── Min tap target ────────────────────────────────────────────────
      minHeight: {
        tap: "48px",
      },
      minWidth: {
        tap: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
