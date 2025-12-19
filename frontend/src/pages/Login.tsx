import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { mockUsers } from '../lib/mockData'

export default function Login() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Mock login - find user in mock data
      const user = mockUsers.find((u) => u.email === email)
      if (!user) {
        throw new Error('Utilisateur non trouvé')
      }
      // In mock, we just accept any password
      const token = 'mock-token-' + Math.random().toString(36)
      setAuth(user, token)
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Mock register
      const newUser = {
        id: 'user-' + Math.random().toString(36).substring(7),
        email,
        firstName,
        lastName,
        role: 'USER' as const,
        departmentId: 'dept2',
      }
      const token = 'mock-token-' + Math.random().toString(36)
      setAuth(newUser, token)
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen dark:bg-midnight bg-light-bg flex items-center justify-center px-4">
      <div className="dark:glass-card p-8 rounded-2xl dark:border dark:border-white dark:border-opacity-10 dark:bg-dark-grey dark:bg-opacity-20 bg-light-surface border border-light-border w-full max-w-md">
        <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent mb-2 text-center">Bookly</h1>
        <p className="text-center dark:text-snow-white dark:text-opacity-60 text-light-text text-opacity-70 mb-8">Plateforme de réservation intelligente</p>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${tab === 'login' ? 'dark:bg-indigo-royal dark:text-snow-white bg-indigo-royal text-white' : 'dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 bg-light-border text-light-text hover:opacity-80'}`}
          >
            Connexion
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${tab === 'register' ? 'dark:bg-indigo-royal dark:text-snow-white bg-indigo-royal text-white' : 'dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 bg-light-border text-light-text hover:opacity-80'}`}
          >
            Inscription
          </button>
        </div>

        {error && <div className="mb-4 p-3 dark:bg-rose-coral dark:bg-opacity-20 dark:text-rose-coral dark:border dark:border-rose-coral dark:border-opacity-30 bg-red-100 text-red-700 border border-red-300 rounded-xl">{error}</div>}

        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              placeholder="Mot de passe"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="w-full bg-indigo-royal text-snow-white px-4 py-3 rounded-xl hover:bg-opacity-90 disabled:opacity-50 font-semibold transition">
              {loading ? '⏳ Connexion...' : 'Se connecter'}
            </button>
            <div className="text-sm text-snow-white text-opacity-70 mt-6 p-4 bg-white bg-opacity-5 rounded-xl border border-white border-opacity-10">
              <p className="font-semibold mb-2 text-cyan-neon">Comptes de test:</p>
              <p className="font-mono text-xs">admin@test.fr</p>
              <p className="font-mono text-xs">manager@test.fr</p>
              <p className="font-mono text-xs">user@test.fr</p>
            </div>
          </form>
        )}

        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              placeholder="Prénom"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            />
            <input
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              placeholder="Nom"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            />
            <input
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              placeholder="Mot de passe"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="w-full bg-cyan-neon text-midnight px-4 py-3 rounded-xl hover:bg-opacity-90 disabled:opacity-50 font-semibold transition">
              {loading ? '⏳ Inscription...' : "S'inscrire"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
