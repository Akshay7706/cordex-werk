/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#000000', // pure black
          surface: '#111111', // dark gray
          primary: '#FFFFFF', // pure white
          secondary: '#888888', // medium gray
          accent: '#E60000', // vivid crimson
          hover: '#990000', // dark crimson
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      spacing: {
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
        '5xl': '5rem',
        '6xl': '6rem',
      },
      fontSize: {
        '8xl': '6rem',
        '9xl': '8rem',
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
