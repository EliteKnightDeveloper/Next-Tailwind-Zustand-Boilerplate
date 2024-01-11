/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          100: '#74DEFF',
          200: '#0FC6FF',
          300: '#0094C2',
        },
        orange: '#FF7D05',
        purple: {
          100: '#7458B4',
          200: '#573F8D',
          300: '#412F6A',
        },
        gray: {
          100: '#F2F3F5',
          200: '#ADADAD',
          300: '#7D828B',
          400: '#5C6169',
          500: '#36393F',
          600: '#202225',
          700: '#A3A9B3',
        },
        black: '#16171A',
        red: '#ED4245',
        dark: '#0B0D0E80',
        startGrey: '#292929',
        endGrey: '#34343400',
        darkGradientStart: '#562586',
        darkGradientEnd: '#00CDCD',
        startBlue: '#7FE8FF',
        endBlue: '#175A76',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
