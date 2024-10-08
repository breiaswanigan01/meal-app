module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // Enable dark mode with a class
  theme: {
    extend: {
      animation: {
        spin: 'spin 1s linear'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
