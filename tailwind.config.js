/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: '#F7E7CE',
        champagneDark: '#D4AF37', // Gold-ish
        charcoal: '#36454F',
        darkNavy: '#0A192F',
        luxuryGold: '#C5A059',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
