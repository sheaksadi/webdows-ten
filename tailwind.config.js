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
      transitionTimingFunction: {
        'delay-side': 'cubic-bezier(1,-0.05,.82,.39)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        popDown: {
          '0%': { top: '-100' },
          '100%': { top: '4rem' },
        }
      },
      animation: {
        popDown: 'popDown 1s ease-linear',
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}
