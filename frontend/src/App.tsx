import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import Calendar from './pages/Calendar'
import MyBookings from './pages/MyBookings'
import Notifications from './pages/Notifications'

// Composant pour protéger les routes
function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  return isAuthenticated ? element : <Navigate to="/login" replace />
}

export default function App() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">📅 BookIt</h1>
          <nav className="space-x-4 flex items-center">
            {user ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  📊 Dashboard
                </Link>
                <Link to="/resources" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  🛠️ Ressources
                </Link>
                <Link to="/calendar" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  📅 Calendrier
                </Link>
                <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  📝 Mes réservations
                </Link>
                <Link to="/notifications" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  🔔 Notifications
                </Link>
                <div className="border-l pl-4 ml-4">
                  <span className="text-gray-600 text-sm font-semibold">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                  >
                    🚪 Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="text-blue-600 font-semibold">
                Se connecter
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 pb-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/resources" element={<ProtectedRoute element={<Resources />} />} />
          <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
          <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings />} />} />
          <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
        </Routes>
      </main>
    </div>
  )
}
