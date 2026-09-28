/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF8',
        surface: '#F2F0EC',
        ink: '#1A1A1A',
        'ink-muted': '#6B6B6B',
        accent: '#C9A96E',
        'accent-dark': '#A8813F',
        blush: '#F0DDD5',
        'blush-deep': '#E8C4B4',
        border: '#E5E2DC',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      boxShadow: {
        card: '0 2px 20px rgba(0,0,0,0.06)',
        hover: '0 8px 40px rgba(0,0,0,0.12)',
        modal: '0 24px 80px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}
