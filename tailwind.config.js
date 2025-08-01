/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFDF5',      // A warm, soft background
        'saffron': '#F4A261',    // A muted, earthy orange for accents
        'sage': '#2A9D8F',        // A calming green for translations or details
        'charcoal': '#264653',  // A dark, soft alternative to black for text
      },
    },
  },
  plugins: [],
}
