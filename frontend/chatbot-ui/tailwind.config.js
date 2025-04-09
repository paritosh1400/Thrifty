/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // If you are using class-based dark mode (based on your index.html)
  darkMode: 'class',
}