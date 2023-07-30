/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        myCyan: "#318774",
        myPeach: "#E3D7FF",
        myWhite: "#E2DFDF",
        myLightGray: "#313638",
        myDarkGray: "#17171B",
        myMidGray: "#909DA1",
        inputBg: "#1E1E1E",
      },
      fontFamily: {
        amaranth: ["Amaranth", "sans-serif"],
        "bungee-outline": ["Bungee Outline", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}

