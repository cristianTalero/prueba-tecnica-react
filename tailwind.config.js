/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.tsx', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio'), require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
}
