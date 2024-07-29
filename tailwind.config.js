module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'finance-bg': '#f3f4f6',
        'finance-text': '#1f2937',
        'finance-primary': '#0d9488',
        'finance-secondary': '#64748b',
        'finance-error': '#dc2626',
      },
      borderRadius: {
        'finance': '8px',
      },
      fontFamily: {
        'finance': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
