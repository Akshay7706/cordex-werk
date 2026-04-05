/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stitch: {
          background: 'var(--stitch-background)',
          primary: 'var(--stitch-primary)',
          secondary: 'var(--stitch-secondary)',
          tertiary: 'var(--stitch-tertiary)',
          surface: 'var(--stitch-surface)',
          'surface-container-low': 'var(--stitch-surface-container-low)',
          'surface-container': 'var(--stitch-surface-container)',
          'surface-container-high': 'var(--stitch-surface-container-high)',
          'surface-container-highest': 'var(--stitch-surface-container-highest)',
          'outline-variant': 'var(--stitch-outline-variant)',
        },
        brand: {
          dark: 'var(--stitch-background)',
          primary: 'var(--stitch-surface-container-low)',
          secondary: 'var(--stitch-secondary)',
          accent: 'var(--stitch-primary)',
          glow: 'rgba(164, 165, 255, 0.4)',
        }
      },
      fontFamily: {
        sans: ['var(--stitch-font-body)', 'Inter', 'sans-serif'],
        heading: ['var(--stitch-font-headline)', 'Space Grotesk', 'sans-serif'],
        label: ['var(--stitch-font-label)', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #050B14, #0B1C2C)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'grid-pattern-glow': 'radial-gradient(circle at center, rgba(58, 134, 255, 0.15) 0%, transparent 70%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
