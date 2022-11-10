/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-main': "url('/src/assets/bgImg.jpg')",
        'charts':"url('/src/assets/charts.jpg')",
        'bear':"url('/src/assets/bear.jpg')",
      }
    },
  },
  plugins: [],
}
