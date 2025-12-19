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

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-midnight text-snow-white flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-dark-grey border-r border-white border-opacity-10 flex-col p-6">
        <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent mb-8">
          📅 BookIt
        </h1>

        <nav className="space-y-4 flex-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors font-semibold"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/resources"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors font-semibold"
          >
            🛠️ Ressources
          </Link>
          <Link
            to="/calendar"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors font-semibold"
          >
            📅 Calendrier
          </Link>
          <Link
            to="/my-bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors font-semibold"
          >
            📝 Réservations
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors font-semibold"
          >
            🔔 Notifications
          </Link>
        </nav>

        <div className="border-t border-white border-opacity-10 pt-4">
          <p className="text-sm text-snow-white mb-3 font-semibold">{user.name}</p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-rose-coral hover:bg-opacity-90 text-white rounded-lg transition-colors font-semibold"
          >
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pb-0 pb-24">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 bg-dark-grey border-b border-white border-opacity-10 px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent">
            📅 BookIt
          </h1>
          <button
            onClick={handleLogout}
            className="text-rose-coral hover:text-rose-coral hover:opacity-80 transition-opacity"
          >
            🚪
          </button>
        </header>

        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/resources" element={<ProtectedRoute element={<Resources />} />} />
            <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
            <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings />} />} />
            <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-grey border-t border-white border-opacity-10 flex justify-around items-center px-4 py-3 z-50">
        <Link
          to="/"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors"
          title="Dashboard"
        >
          <span className="text-xl">📊</span>
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link
          to="/resources"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors"
          title="Ressources"
        >
          <span className="text-xl">🛠️</span>
          <span className="text-xs">Ressources</span>
        </Link>
        <Link
          to="/calendar"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors"
          title="Calendrier"
        >
          <span className="text-xl">📅</span>
          <span className="text-xs">Calendrier</span>
        </Link>
        <Link
          to="/my-bookings"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors"
          title="Réservations"
        >
          <span className="text-xl">📝</span>
          <span className="text-xs">Réservations</span>
        </Link>
        <Link
          to="/notifications"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-indigo-royal hover:bg-opacity-20 transition-colors"
          title="Notifications"
        >
          <span className="text-xl">🔔</span>
          <span className="text-xs">Notifications</span>
        </Link>
      </nav>
    </div>
  )
}
