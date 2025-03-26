/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        'polygon-[0_0,100%_0,85%_100%,0_100%]': 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-x-fast': 'gradient-x 1.5s ease infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      },
    },
  },
  plugins: [],
}
