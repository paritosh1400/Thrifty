// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure it scans your component files
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Add custom dark mode colors if needed
      colors: {
        'dark-bg': '#1e1e1e',
        'dark-sidebar': '#252526',
        'dark-input': '#3c3c3c',
        'dark-text': '#cccccc',
        'dark-text-secondary': '#9e9e9e',
        // ... other colors
      }
    },
  },
  plugins: [],
}