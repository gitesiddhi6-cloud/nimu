/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          primary: '#FFD84D',
          soft: '#FFF1A8',
          pale: '#FFFBEA',
          deep: '#E6B800',
          glow: 'rgba(255, 216, 77, 0.45)',
        },
        cream: {
          50: '#FFFDF5',
          100: '#FFF9E8',
          200: '#FFF4D6',
          300: '#FDEBBF',
        },
        charcoal: {
          DEFAULT: '#27231D',
          light: '#423B33',
          dark: '#161412',
          black: '#0D0C0B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#EED971',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'yellow-sm': '0 2px 10px rgba(255, 216, 77, 0.25)',
        'yellow-glow': '0 0 30px rgba(255, 216, 77, 0.35)',
        'yellow-bright': '0 0 45px rgba(255, 216, 77, 0.65)',
        'polaroid': '0 10px 30px -5px rgba(39, 35, 29, 0.1), 0 2px 8px -1px rgba(39, 35, 29, 0.06)',
        'polaroid-hover': '0 25px 45px -10px rgba(255, 216, 77, 0.3), 0 10px 20px -5px rgba(39, 35, 29, 0.15)',
        'card-warm': '0 12px 35px -8px rgba(220, 180, 80, 0.15)',
        'terminal': '0 20px 60px -15px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 216, 77, 0.15)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-yellow': 'pulseYellow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(1deg)' },
        },
        pulseYellow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
}
