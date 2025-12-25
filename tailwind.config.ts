/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: 'hsl(var(--foreground))',

                        // Links
                        a: {
                            color: 'hsl(var(--primary))',
                            fontWeight: '600',
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'hsl(var(--primary))',
                                textDecoration: 'underline',
                            },
                        },

                        // Headings - BOLD and prominent
                        'h1, h2, h3, h4, h5, h6': {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '800',
                            letterSpacing: '-0.025em',
                        },
                        h1: {
                            fontSize: '3rem',
                            marginTop: '0',
                            marginBottom: '1.5rem',
                            lineHeight: '1.1',
                        },
                        h2: {
                            fontSize: '2.25rem',
                            marginTop: '3rem',
                            marginBottom: '1.25rem',
                            paddingBottom: '0.5rem',
                            borderBottom: '2px solid hsl(var(--border))',
                        },
                        h3: {
                            fontSize: '1.75rem',
                            marginTop: '2rem',
                            marginBottom: '1rem',
                        },
                        h4: {
                            fontSize: '1.35rem',
                            marginTop: '1.5rem',
                            marginBottom: '0.75rem',
                        },

                        // Blockquotes
                        blockquote: {
                            fontWeight: '500',
                            fontStyle: 'normal',
                            color: 'hsl(var(--foreground))',
                            borderLeftWidth: '4px',
                            borderLeftColor: 'hsl(var(--primary))',
                            backgroundColor: 'hsl(var(--muted))',
                            padding: '1rem 1.5rem',
                            borderRadius: '0.5rem',
                            quotes: 'none',
                        },

                        // Lists - Custom bullet points
                        'ul > li': {
                            position: 'relative',
                            paddingLeft: '1.75rem',
                        },
                        'ul > li::before': {
                            content: '""',
                            position: 'absolute',
                            backgroundColor: 'hsl(var(--primary))',
                            borderRadius: '50%',
                            width: '0.5rem',
                            height: '0.5rem',
                            left: '0.25rem',
                            top: '0.625rem',
                        },

                        'ol > li': {
                            paddingLeft: '1.75rem',
                        },
                        'ol > li::marker': {
                            color: 'hsl(var(--primary))',
                            fontWeight: '700',
                        },

                        // Inline code
                        code: {
                            color: 'hsl(var(--foreground))',
                            backgroundColor: 'hsl(var(--muted))',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.375rem',
                            fontWeight: '600',
                            fontSize: '0.9em',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },

                        // Code blocks
                        pre: {
                            backgroundColor: 'hsl(var(--muted))',
                            color: 'hsl(var(--foreground))',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            border: '1px solid hsl(var(--border))',
                            overflowX: 'auto',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            padding: '0',
                            fontWeight: '400',
                            color: 'inherit',
                        },

                        // Tables
                        table: {
                            width: '100%',
                            borderCollapse: 'separate',
                            borderSpacing: '0',
                            fontSize: '0.95rem',
                        },
                        thead: {
                            borderBottom: '2px solid hsl(var(--border))',
                        },
                        'thead th': {
                            fontWeight: '700',
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            backgroundColor: 'hsl(var(--muted))',
                            color: 'hsl(var(--foreground))',
                        },
                        'tbody tr': {
                            borderBottom: '1px solid hsl(var(--border))',
                        },
                        'tbody td': {
                            padding: '0.75rem 1rem',
                        },

                        // Strong/Bold text
                        strong: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '700',
                        },

                        // Horizontal rule
                        hr: {
                            borderColor: 'hsl(var(--border))',
                            marginTop: '3rem',
                            marginBottom: '3rem',
                        },
                    },
                },
            },
        }
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
