import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Plus, X, Building2, Wrench, Car, Briefcase, Users, MapPin } from 'lucide-react'
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

  const categoryLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    ROOM: { label: 'Salle', icon: <Building2 className="w-4 h-4" /> },
    EQUIPMENT: { label: 'Équipement', icon: <Wrench className="w-4 h-4" /> },
    VEHICLE: { label: 'Véhicule', icon: <Car className="w-4 h-4" /> },
    WORKSTATION: { label: 'Poste de travail', icon: <Briefcase className="w-4 h-4" /> },
  }

  const statusColors: Record<string, string> = {
    AVAILABLE: 'dark:bg-cyan-neon dark:bg-opacity-20 dark:text-cyan-neon dark:border dark:border-cyan-neon dark:border-opacity-30 bg-cyan-light bg-opacity-20 text-cyan-light border border-cyan-light border-opacity-30',
    MAINTENANCE: 'dark:bg-yellow-400 dark:bg-opacity-20 dark:text-yellow-400 dark:border dark:border-yellow-400 dark:border-opacity-30 bg-yellow-400 bg-opacity-20 text-yellow-400 border border-yellow-400 border-opacity-30',
    OUT_OF_SERVICE: 'dark:bg-rose-coral dark:bg-opacity-20 dark:text-rose-coral dark:border dark:border-rose-coral dark:border-opacity-30 bg-rose-coral bg-opacity-20 text-rose-coral border border-rose-coral border-opacity-30',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent">Ressources</h2>
          <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-1">Gérez vos ressources</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 ${showForm ? 'dark:bg-rose-coral dark:bg-opacity-20 dark:text-rose-coral dark:border dark:border-rose-coral dark:border-opacity-30 bg-red-100 text-red-700 border border-red-300' : 'dark:bg-indigo-royal dark:text-snow-white dark:hover:bg-opacity-90 bg-indigo-royal text-white hover:opacity-90'}`}
        >
          {showForm ? (
            <>
              <X className="w-4 h-4" />
              Annuler
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Ajouter
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle mb-8">
          <h3 className="font-bold text-lg dark:text-snow-white text-light-text mb-4">Ajouter une ressource</h3>
          <form onSubmit={handleAddResource} className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text placeholder-light-text-secondary placeholder-opacity-60 focus:outline-none focus:border-cyan-light transition"
              placeholder="Nom de la ressource"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <select
              className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="ROOM" className="dark:bg-midnight dark:text-snow-white bg-light-surface text-light-text">Salle</option>
              <option value="EQUIPMENT" className="dark:bg-midnight dark:text-snow-white bg-light-surface text-light-text">Équipement</option>
              <option value="VEHICLE" className="dark:bg-midnight dark:text-snow-white bg-light-surface text-light-text">Véhicule</option>
              <option value="WORKSTATION" className="dark:bg-midnight dark:text-snow-white bg-light-surface text-light-text">Poste de travail</option>
            </select>
            <button type="submit" className="w-full dark:bg-cyan-neon dark:text-midnight dark:hover:bg-opacity-90 bg-indigo-royal text-white hover:opacity-90 py-3 rounded-xl font-semibold transition">
              Créer
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {resources.map((r) => (
          <div key={r.id} className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 dark:hover:border-opacity-30 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle hover:shadow-soft hover:border-cyan-light transition">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg dark:text-snow-white text-light-text">{r.name}</h3>
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${statusColors[r.status]}`}>
                {r.status === 'AVAILABLE' ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Libre
                  </>
                ) : r.status === 'MAINTENANCE' ? (
                  <>
                    <AlertTriangle className="w-3 h-3" />
                    Maintenance
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3" />
                    Indisponible
                  </>
                )}
              </span>
            </div>
            <p className="text-sm text-cyan-light dark:text-cyan-neon mb-2 flex items-center gap-1">
              {categoryLabels[r.category].icon}
              {categoryLabels[r.category].label}
            </p>
            {r.description && <p className="text-sm dark:text-snow-white dark:text-opacity-70 text-light-text-secondary mb-2">{r.description}</p>}
            {r.capacity && <p className="text-sm dark:text-snow-white dark:text-opacity-70 text-light-text-secondary flex items-center gap-1"><Users className="w-3 h-3" />Capacité: {r.capacity} personnes</p>}
            {r.location && <p className="text-sm dark:text-snow-white dark:text-opacity-70 text-light-text-secondary flex items-center gap-1"><MapPin className="w-3 h-3" />{r.location}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
