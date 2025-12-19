module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'midnight': '#0F1115',
        'dark-grey': '#1E2025',
        'indigo-royal': '#6366F1',
        'cyan-neon': '#06B6D4',
        'snow-white': '#F9FAFB',
        'rose-coral': '#F43F5E',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
