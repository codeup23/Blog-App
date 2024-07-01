/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom-0.9-1': '0.9fr 1fr',
      },
      screens: {
        'ss': '200px',
      },
    },
  },
  plugins: [],
}

