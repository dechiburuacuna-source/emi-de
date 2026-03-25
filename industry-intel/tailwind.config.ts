import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#080C18',
          2: '#0C1220',
          3: '#101828',
          4: '#141E2E',
        },
        border: {
          DEFAULT: '#1A2540',
          2: '#243354',
        },
        cyan: { DEFAULT: '#00C8F0', dim: 'rgba(0,200,240,0.08)' },
        amber: { DEFAULT: '#F5A623' },
        emerald: { DEFAULT: '#1FBF6A' },
        violet: { DEFAULT: '#9D7BF8' },
        orange: { DEFAULT: '#F26B3A' },
        ink: {
          DEFAULT: '#DDE5EF',
          2: '#7A8FA6',
          3: '#3E5065',
        },
        mining: '#F5A623',
        energy: '#1FBF6A',
        dc: '#00C8F0',
        institutional: '#9D7BF8',
        press: '#F26B3A',
      },
      fontFamily: {
        condensed: ['var(--font-barlow-condensed)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
        sans: ['var(--font-barlow)', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.25s ease both',
        'pulse-dot': 'pulseDot 2s infinite',
        spin: 'spin 0.8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}

export default config
