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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab('login')}
          className={`flex-1 py-2 rounded font-semibold transition ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Connexion
        </button>
        <button
          onClick={() => setTab('register')}
          className={`flex-1 py-2 rounded font-semibold transition ${tab === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Inscription
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {tab === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mot de passe"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 font-semibold">
            {loading ? '⏳ Connexion...' : 'Se connecter'}
          </button>
          <div className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded">
            <p className="font-semibold mb-1">Comptes de test:</p>
            <p>admin@test.fr</p>
            <p>manager@test.fr</p>
            <p>user@test.fr</p>
          </div>
        </form>
      )}

      {tab === 'register' && (
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Prénom"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nom"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mot de passe"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 font-semibold">
            {loading ? '⏳ Inscription...' : "S'inscrire"}
          </button>
        </form>
      )}
    </div>
  )
}
