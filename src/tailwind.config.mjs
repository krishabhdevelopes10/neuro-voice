/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.25", letterSpacing: "0.03em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.04em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "500" }],
                xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "500" }],
                "2xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
                "3xl": ["1.875rem", { lineHeight: "1.3", letterSpacing: "0.06em", fontWeight: "600" }],
                "4xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "0.07em", fontWeight: "700" }],
                "5xl": ["3rem", { lineHeight: "1.15", letterSpacing: "0.08em", fontWeight: "700" }],
                "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "0.09em", fontWeight: "700" }],
                "7xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "0.1em", fontWeight: "700" }],
                "8xl": ["6rem", { lineHeight: "1.0", letterSpacing: "0.12em", fontWeight: "700" }],
                "9xl": ["8rem", { lineHeight: "1.0", letterSpacing: "0.15em", fontWeight: "700" }],
            },
            fontFamily: {
                heading: ["cormorantgaramond"],
                paragraph: ["sora"]
            },
            colors: {
                destructive: "#E74C3C",
                "destructive-foreground": "#FFFFFF",
                "accent-blue": "#0066CC",
                "medical-blue": "#0052A3",
                "health-teal": "#00A3E0",
                "light-grey": "#E8EAED",
                background: "#F5F7FA",
                secondary: "#0052A3",
                foreground: "#1A1F36",
                "secondary-foreground": "#FFFFFF",
                "primary-foreground": "#FFFFFF",
                primary: "#0066CC",
                "accent-gold": "#D4AF37",
                "muted-purple": "#6B7280",
                "slate-50": "#F8FAFC",
                "slate-100": "#F1F5F9",
                "slate-200": "#E2E8F0",
                "slate-300": "#CBD5E1",
                "slate-400": "#94A3B8",
                "slate-500": "#64748B",
                "slate-600": "#475569",
                "slate-700": "#334155",
                "slate-800": "#1E293B",
                "slate-900": "#0F172A"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
