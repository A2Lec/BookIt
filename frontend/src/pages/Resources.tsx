import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Plus, X, Building2, Wrench, Car, Briefcase, Users, MapPin, Trash2, Edit2, Calendar } from 'lucide-react'
import { useResourcesStore } from '../store/resourcesStore'
import { useAuthStore } from '../store/authStore'
import { useBookingsStore } from '../store/bookingsStore'

export default function Resources() {
  const user = useAuthStore((state) => state.user)
  const resources = useResourcesStore((state) => state.resources)
  const addResource = useResourcesStore((state) => state.addResource)
  const updateResource = useResourcesStore((state) => state.updateResource)
  const removeResource = useResourcesStore((state) => state.removeResource)
  const addBooking = useBookingsStore((state) => state.addBooking)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('ROOM')
  const [newDescription, setNewDescription] = useState('')
  const [newCapacity, setNewCapacity] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newStatus, setNewStatus] = useState('AVAILABLE')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null)
  const [reservationTitle, setReservationTitle] = useState('')
  const [reservationDate, setReservationDate] = useState('')
  const [reservationStartTime, setReservationStartTime] = useState('09:00')
  const [reservationEndTime, setReservationEndTime] = useState('10:00')
  const [isClosingReservation, setIsClosingReservation] = useState(false)

  const resetForm = () => {
    setNewName('')
    setNewCategory('ROOM')
    setNewDescription('')
    setNewCapacity('')
    setNewLocation('')
    setNewStatus('AVAILABLE')
    setEditingId(null)
    setShowForm(false)
  }

  function handleSaveResource(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return

    if (editingId) {
      // Mode modification
      updateResource(editingId, {
        name: newName,
        category: newCategory as any,
        status: newStatus as any,
        description: newDescription || undefined,
        capacity: newCapacity ? parseInt(newCapacity) : undefined,
        location: newLocation || undefined,
      })
    } else {
      // Mode création
      const newResource = {
        id: 'res-' + Math.random().toString(36).substring(7),
        name: newName,
        category: newCategory as any,
        status: newStatus as any,
        description: newDescription || undefined,
        capacity: newCapacity ? parseInt(newCapacity) : undefined,
        location: newLocation || undefined,
      }
      addResource(newResource)
    }
    resetForm()
  }

  const handleEditResource = (resource: any) => {
    setEditingId(resource.id)
    setNewName(resource.name)
    setNewCategory(resource.category)
    setNewDescription(resource.description || '')
    setNewCapacity(resource.capacity ? String(resource.capacity) : '')
    setNewLocation(resource.location || '')
    setNewStatus(resource.status)
    setShowForm(true)
  }

  const handleOpenReservation = (resourceId: string) => {
    setSelectedResourceId(resourceId)
    setReservationTitle('')
    setReservationDate('')
    setReservationStartTime('09:00')
    setReservationEndTime('10:00')
    setShowReservationModal(true)
  }

  const handleCloseReservation = () => {
    setIsClosingReservation(true)
    setTimeout(() => {
      setShowReservationModal(false)
      setIsClosingReservation(false)
    }, 200)
  }

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reservationTitle.trim() || !reservationDate || !selectedResourceId) return

    const startTime = `${reservationDate}T${reservationStartTime}:00`
    const endTime = `${reservationDate}T${reservationEndTime}:00`

    addBooking({
      id: 'booking-' + Math.random().toString(36).substring(7),
      title: reservationTitle,
      resourceId: selectedResourceId,
      startTime,
      endTime,
      status: 'CONFIRMED',
      userId: user?.id || '',
      isRecurring: false,
    })

    setShowReservationModal(false)
    setSelectedResourceId(null)
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

  const canManageResources = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      removeResource(id)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent">Ressources</h2>
          <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-1">Gérez vos ressources</p>
        </div>
        {canManageResources && (
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
        )}
      </div>

      {showForm && (
        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle mb-8">
          <h3 className="font-bold text-lg dark:text-snow-white text-light-text mb-4">{editingId ? 'Modifier la ressource' : 'Ajouter une ressource'}</h3>
          <form onSubmit={handleSaveResource} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text placeholder-light-text-secondary placeholder-opacity-60 focus:outline-none focus:border-cyan-light transition"
                placeholder="Nom de la ressource *"
                value={newName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
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
            </div>
            
            <textarea
              className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text placeholder-light-text-secondary placeholder-opacity-60 focus:outline-none focus:border-cyan-light transition resize-none"
              placeholder="Description"
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text placeholder-light-text-secondary placeholder-opacity-60 focus:outline-none focus:border-cyan-light transition"
                placeholder="Capacité (personnes)"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                min="1"
              />
              <input
                className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text placeholder-light-text-secondary placeholder-opacity-60 focus:outline-none focus:border-cyan-light transition"
                placeholder="Localisation"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </div>

            <select
              className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="AVAILABLE" className="dark:bg-midnight dark:text-snow-white bg-light-surface text-light-text">Disponible</option>
              <option value="MAINTENANCE" className="dark:bg-midnight dark:text-snow-white bg-light-surface text-light-text">En maintenance</option>
              <option value="OUT_OF_SERVICE" className="dark:bg-midnight dark:text-snow-white bg-light-surface text-light-text">Indisponible</option>
            </select>

            <button type="submit" className="w-full dark:bg-cyan-neon dark:text-midnight dark:hover:bg-opacity-90 bg-indigo-royal text-white hover:opacity-90 py-3 rounded-xl font-semibold transition">
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {resources.map((r) => (
          <div key={r.id} className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 dark:hover:border-opacity-30 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle hover:shadow-soft hover:border-cyan-light transition">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg dark:text-snow-white text-light-text">{r.name}</h3>
              </div>
              <div className="flex items-center gap-2">
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
                <button
                  onClick={() => handleOpenReservation(r.id)}
                  className="p-2 dark:text-indigo-royal text-indigo-royal dark:hover:bg-indigo-royal dark:hover:bg-opacity-20 hover:bg-indigo-royal hover:bg-opacity-20 rounded-lg transition"
                  title="Réserver"
                >
                  <Calendar className="w-4 h-4" />
                </button>
                {canManageResources && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditResource(r)}
                      className="p-2 dark:text-cyan-neon text-cyan-light dark:hover:bg-cyan-neon dark:hover:bg-opacity-20 hover:bg-cyan-light hover:bg-opacity-20 rounded-lg transition"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id, r.name)}
                      className="p-2 dark:text-rose-coral text-rose-coral dark:hover:bg-rose-coral dark:hover:bg-opacity-20 hover:bg-rose-coral hover:bg-opacity-20 rounded-lg transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
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

      {showReservationModal && (
        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 ${isClosingReservation ? 'modal-backdrop-exit' : 'modal-backdrop-enter'}`}>
          <div className={`dark:bg-midnight bg-white rounded-2xl shadow-xl max-w-md w-full ${isClosingReservation ? 'modal-content-exit' : 'modal-content-enter'}`}>
            <div className="p-6 border-b dark:border-white dark:border-opacity-10 border-light-border">
              <h2 className="text-2xl font-bold dark:text-snow-white text-light-text">Réserver une ressource</h2>
            </div>
            
            <form onSubmit={handleSubmitReservation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium dark:text-snow-white text-light-text mb-2">
                  Titre de la réservation
                </label>
                <input
                  type="text"
                  required
                  value={reservationTitle}
                  onChange={(e) => setReservationTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal bg-light-surface border border-light-border text-light-text placeholder-light-text-secondary focus:outline-none focus:border-cyan-light transition"
                  placeholder="Ex: Réunion d'équipe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-snow-white text-light-text mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal bg-light-surface border border-light-border text-light-text placeholder-light-text-secondary focus:outline-none focus:border-cyan-light transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-snow-white text-light-text mb-2">
                    Heure de début
                  </label>
                  <input
                    type="time"
                    required
                    value={reservationStartTime}
                    onChange={(e) => setReservationStartTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal bg-light-surface border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-snow-white text-light-text mb-2">
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    required
                    value={reservationEndTime}
                    onChange={(e) => setReservationEndTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal bg-light-surface border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t dark:border-white dark:border-opacity-10 border-light-border">
                <button
                  type="button"
                  onClick={handleCloseReservation}
                  className="flex-1 py-2 px-4 rounded-lg dark:text-snow-white dark:hover:bg-white dark:hover:bg-opacity-10 text-light-text hover:bg-light-surface-alt transition font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 rounded-lg dark:bg-cyan-neon dark:text-midnight dark:hover:bg-opacity-90 bg-indigo-royal text-white hover:opacity-90 transition font-medium"
                >
                  Réserver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )}