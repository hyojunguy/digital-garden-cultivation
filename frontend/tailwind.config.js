export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'garden-primary': '#4CAF50',
        'garden-secondary': '#2E7D32',
        'garden-light': '#E8F5E9',
        'garden-accent': '#FF5722', // Add this line for garden-accent color
      },
    },
  },
  plugins: [],
}