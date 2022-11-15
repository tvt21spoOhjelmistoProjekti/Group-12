/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-main': "url('/src/assets/bgImg.jpg')",
        'bg-bear': "url('/src/assets/polar_bear_penguin.jpg')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
})
