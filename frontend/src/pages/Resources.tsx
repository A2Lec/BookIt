import React, { useState } from 'react'
import { useResourcesStore } from '../store/resourcesStore'

export default function Resources() {
  const resources = useResourcesStore((state) => state.resources)
  const addResource = useResourcesStore((state) => state.addResource)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('ROOM')
  const [showForm, setShowForm] = useState(false)

  function handleAddResource(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return

    const newResource = {
      id: 'res-' + Math.random().toString(36).substring(7),
      name: newName,
      category: newCategory as any,
      status: 'AVAILABLE' as const,
      description: '',
    }

    addResource(newResource)
    setNewName('')
    setNewCategory('ROOM')
    setShowForm(false)
  }

  const categoryLabels: Record<string, string> = {
    ROOM: '🏢 Salle',
    EQUIPMENT: '🔧 Équipement',
    VEHICLE: '🚗 Véhicule',
    WORKSTATION: '💼 Poste de travail',
  }

  const statusColors: Record<string, string> = {
    AVAILABLE: 'bg-cyan-neon bg-opacity-20 text-cyan-neon border border-cyan-neon border-opacity-30',
    MAINTENANCE: 'bg-yellow-400 bg-opacity-20 text-yellow-400 border border-yellow-400 border-opacity-30',
    OUT_OF_SERVICE: 'bg-rose-coral bg-opacity-20 text-rose-coral border border-rose-coral border-opacity-30',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent">Ressources</h2>
          <p className="text-snow-white text-opacity-60 mt-1">Gérez vos ressources</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-3 rounded-xl font-semibold transition ${showForm ? 'bg-rose-coral bg-opacity-20 text-rose-coral border border-rose-coral border-opacity-30' : 'bg-indigo-royal text-snow-white hover:bg-opacity-90'}`}
        >
          {showForm ? '✖ Annuler' : '➕ Ajouter'}
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 rounded-2xl border border-white border-opacity-10 mb-8">
          <h3 className="font-bold text-lg text-snow-white mb-4">Ajouter une ressource</h3>
          <form onSubmit={handleAddResource} className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              placeholder="Nom de la ressource"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <select
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="ROOM" className="bg-midnight text-snow-white">🏢 Salle</option>
              <option value="EQUIPMENT" className="bg-midnight text-snow-white">🔧 Équipement</option>
              <option value="VEHICLE" className="bg-midnight text-snow-white">🚗 Véhicule</option>
              <option value="WORKSTATION" className="bg-midnight text-snow-white">💼 Poste de travail</option>
            </select>
            <button type="submit" className="w-full bg-cyan-neon text-midnight py-3 rounded-xl hover:bg-opacity-90 font-semibold transition">
              Créer
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((r) => (
          <div key={r.id} className="glass-card p-6 rounded-2xl border border-white border-opacity-10 hover:border-opacity-30 transition">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-snow-white">{r.name}</h3>
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[r.status]}`}>
                {r.status === 'AVAILABLE' ? '✓ Libre' : r.status === 'MAINTENANCE' ? '⚙ Maintenance' : '✗ Indisponible'}
              </span>
            </div>
            <p className="text-sm text-cyan-neon mb-2">{categoryLabels[r.category]}</p>
            {r.description && <p className="text-sm text-snow-white text-opacity-70 mb-2">{r.description}</p>}
            {r.capacity && <p className="text-sm text-snow-white text-opacity-70">👥 Capacité: {r.capacity} personnes</p>}
            {r.location && <p className="text-sm text-snow-white text-opacity-70">📍 {r.location}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
