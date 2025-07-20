/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "public/index.html",
    "public/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        rmBlue: {
          normal: '#aad3ea',
          dark: '#2c5973'
        },
        rmYellow: {
          normal: '#f9f769'
        },
        rmPink: {
          normal: '#f676dc',
          dark: '#701d5f'
        },
        rmGreen: {
          normal: '#3ef714',
          dark: '#1a6309'
        },
        rmDarkBg: {
          normal: '#0b0c10',
          lighter: '#181a21',
        }
      }
    },
  },
  plugins: [],
}

