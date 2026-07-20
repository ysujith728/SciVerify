/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--color-paper-rgb))',   // Premium background
        console: 'rgb(var(--color-console-rgb))', // Console background
        ink: 'rgb(var(--color-ink-rgb))',     // Core text color
        cobalt: 'rgb(var(--color-cobalt-rgb))',  // Accent blue
        verdict: {
          support: {
            bg: 'var(--color-verdict-support-bg)',
            border: 'var(--color-verdict-support-border)',
            text: 'var(--color-verdict-support-text)',
            highlight: 'var(--color-verdict-support-highlight)',
          },
          contradict: {
            bg: 'var(--color-verdict-contradict-bg)',
            border: 'var(--color-verdict-contradict-border)',
            text: 'var(--color-verdict-contradict-text)',
            highlight: 'var(--color-verdict-contradict-highlight)',
          },
          neutral: {
            bg: 'var(--color-verdict-neutral-bg)',
            border: 'var(--color-verdict-neutral-border)',
            text: 'var(--color-verdict-neutral-text)',
            highlight: 'var(--color-verdict-neutral-highlight)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
