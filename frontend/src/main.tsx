import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

console.log('🚀 BookIt app starting...')
console.log('Root element:', document.getElementById('root'))

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found!')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

console.log('✅ App mounted successfully')
