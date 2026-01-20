/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: '#0f1419',
                    secondary: '#1a1f26',
                    tertiary: '#252d38',
                },
                text: {
                    primary: '#e6edf3',
                    secondary: '#8b949e',
                    tertiary: '#6e7681',
                },
                accent: {
                    blue: '#58a6ff',
                    purple: '#bc8cff',
                    green: '#3fb950',
                    red: '#f85149',
                    yellow: '#d29922',
                },
            },
            fontFamily: {
                serif: ['Crimson Pro', 'Georgia', 'serif'],
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            spacing: {
                '1': '0.25rem',
                '2': '0.5rem',
                '3': '0.75rem',
                '4': '1rem',
                '6': '1.5rem',
                '8': '2rem',
                '12': '3rem',
                '16': '4rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'flip': 'flip 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                flip: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(180deg)' },
                },
            },
        },
    },
    plugins: [],
}
