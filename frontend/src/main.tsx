import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import { useThemeStore } from './store/themeStore'

console.log('🚀 Bookly app starting...')
console.log('Root element:', document.getElementById('root'))

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found!')
}

// Initialize theme on mount
const theme = useThemeStore.getState().theme
if (theme === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

console.log('✅ App mounted successfully')
