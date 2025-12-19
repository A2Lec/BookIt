import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Calendar as CalendarIcon, Settings, Grid3x3, Clock, Sun, Moon, LogOut, Zap, Bell } from 'lucide-react'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/themeStore'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import CalendarPage from './pages/Calendar'
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
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  
  const [showFooter, setShowFooter] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Handle scroll for mobile footer
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowFooter(false)
      } else {
        setShowFooter(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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
    <div className="min-h-screen dark:bg-midnight dark:text-snow-white bg-light-bg text-light-text flex flex-col md:flex-row transition-colors">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 dark:bg-dark-grey bg-light-surface dark:border-white border-light-border border-r dark:border-opacity-10 flex-col p-6">
        <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent mb-8 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-cyan-neon" />
          Bookly
        </h1>

        <nav className="space-y-4 flex-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors font-semibold"
          >
            <Grid3x3 className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/resources"
            className="flex items-center gap-3 px-4 py-3 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors font-semibold"
          >
            <Settings className="w-5 h-5" />
            Ressources
          </Link>
          <Link
            to="/calendar"
            className="flex items-center gap-3 px-4 py-3 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors font-semibold"
          >
            <CalendarIcon className="w-5 h-5" />
            Calendrier
          </Link>
          <Link
            to="/my-bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors font-semibold"
          >
            <Clock className="w-5 h-5" />
            Réservations
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors font-semibold"
          >
            <Bell className="w-5 h-5" /> Notifications
          </Link>
        </nav>

        <div className="dark:border-white border-light-border border-t dark:border-opacity-10 pt-4 space-y-3">
          <p className="text-sm dark:text-snow-white text-light-text mb-2 font-semibold">{user.name}</p>
          <button
            onClick={toggleTheme}
            className="w-full px-4 py-2 dark:bg-indigo-royal dark:bg-opacity-20 bg-light-border text-indigo-royal rounded-lg hover:dark:bg-opacity-30 hover:bg-light-border hover:opacity-80 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            {theme === 'dark' ? <><Sun className="w-5 h-5" /> Clair</> : <><Moon className="w-5 h-5" /> Sombre</>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 dark:bg-rose-coral bg-rose-coral dark:hover:bg-opacity-90 hover:opacity-90 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pb-0 pb-24">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 dark:bg-dark-grey bg-light-surface dark:border-white border-light-border border-b dark:border-opacity-10 px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-cyan-neon" />
            Bookly
          </h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 dark:text-indigo-royal text-indigo-royal hover:opacity-70 transition-opacity"
            title="Changer le thème"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <div className="p-3 md:p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/resources" element={<ProtectedRoute element={<Resources />} />} />
            <Route path="/calendar" element={<ProtectedRoute element={<CalendarPage />} />} />
            <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings />} />} />
            <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 dark:bg-dark-grey bg-light-surface dark:border-white border-light-border border-t dark:border-opacity-10 overflow-x-auto overflow-y-hidden flex items-center px-2 py-2 z-50 transition-transform duration-300 ${showFooter ? 'translate-y-0' : 'translate-y-full'}`} style={{ scrollBehavior: 'smooth' }}>
        <Link
          to="/"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors flex-shrink-0"
          title="Dashboard"
        >
          <Grid3x3 className="w-5 h-5" />
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link
          to="/resources"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors flex-shrink-0"
          title="Ressources"
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs">Ressources</span>
        </Link>
        <Link
          to="/calendar"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors flex-shrink-0"
          title="Calendrier"
        >
          <CalendarIcon className="w-5 h-5" />
          <span className="text-xs">Calendrier</span>
        </Link>
        <Link
          to="/my-bookings"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors flex-shrink-0"
          title="Réservations"
        >
          <Clock className="w-5 h-5" />
          <span className="text-xs">Réservations</span>
        </Link>
        <Link
          to="/notifications"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-light-border transition-colors flex-shrink-0"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="text-xs">Notifications</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg dark:text-rose-coral text-rose-coral dark:hover:bg-rose-coral dark:hover:bg-opacity-20 hover:bg-light-border transition-colors flex-shrink-0"
          title="Déconnexion"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Déconnexion</span>
        </button>
      </nav>
    </div>
  )
}
