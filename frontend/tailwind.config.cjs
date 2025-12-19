module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'midnight': '#0F1115',
        'dark-grey': '#1E2025',
        'indigo-royal': '#6366F1',
        'cyan-neon': '#06B6D4',
        'snow-white': '#F9FAFB',
        'rose-coral': '#F43F5E',
        // Light theme colors - more subtle
        'light-bg': '#F8F9FC',
        'light-surface': '#FFFFFF',
        'light-surface-alt': '#F3F4F8',
        'light-text': '#374151',
        'light-text-secondary': '#6B7280',
        'light-border': '#E5E7EB',
        'light-border-subtle': '#F0F1F3',
        'cyan-light': '#14B8A6',
        'teal-soft': '#0D9488',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}


