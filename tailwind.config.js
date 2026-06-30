// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom palette
        dark: '#0F0F0F',        // Almost black (background)
        darkMuted: '#202020',   // Slightly lighter black
        greenBright: '#5DD62C', // Bright green (accents)
        greenDark: '#337418',   // Dark green (admin)
        lightBg: '#F8F8F8',     // Light background
        orange: '#FF6B35',      // Orange for your name
        glass: 'rgba(255,255,255,0.1)', // Glass effect background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}