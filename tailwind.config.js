/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      width:{
        "card": "400px",
      },
      height:{
        "card": "550px",
      },
      colors:{
        marvelRed: '#ED1D24',
      }
    },
  },
  plugins: [],
}

