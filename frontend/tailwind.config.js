/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      clipPath: {
        'polygon-[0_0,100%_0,85%_100%,0_100%]': 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-x-fast': 'gradient-x 1.5s ease infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-slow': 'gradient-y 8s ease infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow-delayed': 'pulse 6s 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse': 'pulse 15s infinite alternate',
        'pulse-delay': 'pulse-delay 18s infinite alternate-reverse',
        'pulse-fast-anim': 'pulse-fast 12s infinite alternate',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-position': '50% 0%',
          },
          '50%': {
            'background-position': '50% 100%',
          },
        },
        'pulse': {
          '0%': { opacity: '0.7' },
          '50%': { opacity: '0.9' },
          '100%': { opacity: '0.7' },
        },
        'pulse-delay': {
          '0%': { opacity: '0.6', transform: 'scale(0.98)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
          '100%': { opacity: '0.6', transform: 'scale(0.98)' },
        },
        'pulse-fast': {
          '0%': { opacity: '0.5', transform: 'scale(0.96)' },
          '50%': { opacity: '0.7', transform: 'scale(1.04)' },
          '100%': { opacity: '0.5', transform: 'scale(0.96)' },
        },
      },
    },
  },
  plugins: [],
}
