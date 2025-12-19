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
    AVAILABLE: 'bg-green-100 text-green-800',
    MAINTENANCE: 'bg-yellow-100 text-yellow-800',
    OUT_OF_SERVICE: 'bg-red-100 text-red-800',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Ressources</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          {showForm ? '✖ Annuler' : '➕ Ajouter'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-bold text-lg mb-4">Ajouter une ressource</h3>
          <form onSubmit={handleAddResource} className="space-y-4">
            <input
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom de la ressource"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <select
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="ROOM">Salle</option>
              <option value="EQUIPMENT">Équipement</option>
              <option value="VEHICLE">Véhicule</option>
              <option value="WORKSTATION">Poste de travail</option>
            </select>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold">
              Créer
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{r.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[r.status]}`}>
                {r.status === 'AVAILABLE' ? '✓ Libre' : r.status === 'MAINTENANCE' ? '⚙ Maintenance' : '✗ Indisponible'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{categoryLabels[r.category]}</p>
            {r.description && <p className="text-sm text-gray-500 mb-2">{r.description}</p>}
            {r.capacity && <p className="text-sm text-gray-700">👥 Capacité: {r.capacity} personnes</p>}
            {r.location && <p className="text-sm text-gray-700">📍 {r.location}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
