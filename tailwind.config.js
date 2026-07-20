/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#030712',   // Premium dark background (Apple/Vercel standard)
        console: '#0B0F19', // Console element background (slighter lighter navy)
        ink: '#F9FAFB',     // Crisp, readable off-white text
        cobalt: '#3B82F6',  // Core instrument accent blue
        verdict: {
          support: {
            bg: 'rgba(16, 185, 129, 0.05)',
            border: 'rgba(16, 185, 129, 0.25)',
            text: '#34D399',
            highlight: 'rgba(52, 211, 153, 0.15)',
          },
          contradict: {
            bg: 'rgba(239, 68, 68, 0.05)',
            border: 'rgba(239, 68, 68, 0.25)',
            text: '#F87171',
            highlight: 'rgba(248, 113, 113, 0.15)',
          },
          neutral: {
            bg: 'rgba(245, 158, 11, 0.05)',
            border: 'rgba(245, 158, 11, 0.25)',
            text: '#FBBF24',
            highlight: 'rgba(251, 191, 36, 0.15)',
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
