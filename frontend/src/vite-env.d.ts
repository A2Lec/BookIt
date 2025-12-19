import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL?: string
    }
  }
}
