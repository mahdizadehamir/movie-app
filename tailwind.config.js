module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto:["Roboto", "sans-serif"],
      },
      colors:{
        'black-rgba':'rgba(0, 0, 0, 0.48)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}