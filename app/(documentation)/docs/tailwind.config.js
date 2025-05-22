/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "*.{js,ts,jsx,tsx,mdx}",
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
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: "100%",
                        color: "var(--tw-prose-body)",
                        '[class~="lead"]': {
                            color: "var(--tw-prose-lead)",
                        },
                        a: {
                            color: "var(--tw-prose-links)",
                            textDecoration: "underline",
                            fontWeight: "500",
                        },
                        strong: {
                            color: "var(--tw-prose-bold)",
                            fontWeight: "600",
                        },
                        "a strong": {
                            color: "inherit",
                        },
                        "blockquote strong": {
                            color: "inherit",
                        },
                        "thead strong": {
                            color: "inherit",
                        },
                        h1: {
                            color: "var(--tw-prose-headings)",
                            fontWeight: "800",
                            fontSize: "2.25em",
                            marginTop: "0",
                            marginBottom: "0.8888889em",
                            lineHeight: "1.1111111",
                        },
                        h2: {
                            color: "var(--tw-prose-headings)",
                            fontWeight: "700",
                            fontSize: "1.5em",
                            marginTop: "2em",
                            marginBottom: "1em",
                            lineHeight: "1.3333333",
                        },
                        h3: {
                            color: "var(--tw-prose-headings)",
                            fontWeight: "600",
                            fontSize: "1.25em",
                            marginTop: "1.6em",
                            marginBottom: "0.6em",
                            lineHeight: "1.6",
                        },
                        h4: {
                            color: "var(--tw-prose-headings)",
                            fontWeight: "600",
                            marginTop: "1.5em",
                            marginBottom: "0.5em",
                            lineHeight: "1.5",
                        },
                        code: {
                            color: "var(--tw-prose-code)",
                            fontWeight: "600",
                            fontSize: "0.875em",
                        },
                        "a code": {
                            color: "inherit",
                        },
                        "h1 code": {
                            color: "inherit",
                        },
                        "h2 code": {
                            color: "inherit",
                        },
                        "h3 code": {
                            color: "inherit",
                        },
                        "h4 code": {
                            color: "inherit",
                        },
                        "blockquote code": {
                            color: "inherit",
                        },
                        "thead code": {
                            color: "inherit",
                        },
                        pre: {
                            color: "var(--tw-prose-pre-code)",
                            backgroundColor: "var(--tw-prose-pre-bg)",
                            overflowX: "auto",
                            fontWeight: "400",
                            fontSize: "0.875em",
                            lineHeight: "1.7142857",
                            marginTop: "1.7142857em",
                            marginBottom: "1.7142857em",
                            borderRadius: "0.375rem",
                            paddingTop: "0.8571429em",
                            paddingRight: "1.1428571em",
                            paddingBottom: "0.8571429em",
                            paddingLeft: "1.1428571em",
                        },
                        "pre code": {
                            backgroundColor: "transparent",
                            borderWidth: "0",
                            borderRadius: "0",
                            padding: "0",
                            fontWeight: "inherit",
                            color: "inherit",
                            fontSize: "inherit",
                            fontFamily: "inherit",
                            lineHeight: "inherit",
                        },
                        "pre code::before": {
                            content: "none",
                        },
                        "pre code::after": {
                            content: "none",
                        },
                    },
                },
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
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

module.exports = config
