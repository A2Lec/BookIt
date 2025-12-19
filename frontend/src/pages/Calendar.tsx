import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useBookingsStore } from '../store/bookingsStore'
import { useResourcesStore } from '../store/resourcesStore'

export default function Calendar() {
  const user = useAuthStore((state) => state.user)
  const bookings = useBookingsStore((state) => state.bookings)
  const addBooking = useBookingsStore((state) => state.addBooking)
  const hasConflict = useBookingsStore((state) => state.hasConflict)
  const resources = useResourcesStore((state) => state.resources)

  const [currentDate, setCurrentDate] = useState(new Date())
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    resourceId: '',
    title: '',
    startTime: '',
    endTime: '',
  })

  function handleDateClick(day: Date) {
    setSelectedDate(new Date(day))
    setShowForm(true)
    setError('')
  }

  function handleCreateBooking(e: React.FormEvent) {
    e.preventDefault()
    if (!user) {
      setError('Vous devez être connecté')
      return
    }

    if (!formData.resourceId || !formData.title || !formData.startTime || !formData.endTime) {
      setError('Tous les champs sont obligatoires')
      return
    }

    const start = new Date(formData.startTime)
    const end = new Date(formData.endTime)

    if (end <= start) {
      setError('La date de fin doit être après la date de début')
      return
    }

    if (hasConflict(formData.resourceId, formData.startTime, formData.endTime)) {
      setError('Cette ressource est déjà réservée pendant cette période')
      return
    }

    const newBooking = {
      id: 'book-' + Math.random().toString(36).substring(7),
      resourceId: formData.resourceId,
      userId: user.id,
      title: formData.title,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      status: 'CONFIRMED' as const,
      isRecurring: false,
    }

    addBooking(newBooking)
    setShowForm(false)
    setFormData({ resourceId: '', title: '', startTime: '', endTime: '' })
    setError('')
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))

  const monthName = currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent">Calendrier 📅</h2>
        <p className="dark:text-snow-white dark:text-opacity-60 text-light-text text-opacity-70 mt-2">Sélectionnez un jour pour créer une réservation</p>
      </div>

      <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 rounded-2xl bg-light-surface border border-light-border mb-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-4 py-2 dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 bg-light-border text-light-text hover:opacity-80 rounded-lg font-semibold transition"
          >
            ← Précédent
          </button>
          <h3 className="text-2xl font-bold dark:text-snow-white text-light-text capitalize">{monthName}</h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-4 py-2 dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 bg-light-border text-light-text hover:opacity-80 rounded-lg font-semibold transition"
          >
            Suivant →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
            <div key={d} className="font-bold text-center py-2 dark:text-snow-white dark:text-opacity-60 text-light-text-secondary">
              {d}
            </div>
          ))}

          {days.map((day, i) => {
            const dayBookings = day ? bookings.filter((b) => new Date(b.startTime).toDateString() === day.toDateString()) : []
            const isToday = day && new Date().toDateString() === day.toDateString()

            return (
              <div
                key={i}
                onClick={() => day && handleDateClick(day)}
                className={`min-h-24 p-2 border rounded-lg cursor-pointer transition ${
                  day
                    ? `${isToday ? 'dark:bg-indigo-royal dark:bg-opacity-20 dark:border-indigo-royal dark:border-opacity-50 bg-indigo-royal bg-opacity-10 border-indigo-royal border-opacity-40' : 'dark:bg-white dark:bg-opacity-5 dark:border-white dark:border-opacity-10 dark:hover:bg-opacity-10 bg-light-surface-alt border-light-border-subtle hover:border-cyan-light'}`
                    : 'bg-transparent border-transparent'
                }`}
              >
                {day && (
                  <>
                    <div className={`font-bold mb-1 ${isToday ? 'text-indigo-royal' : 'dark:text-snow-white text-light-text'}`}>{day.getDate()}</div>
                    {dayBookings.slice(0, 2).map((b) => (
                      <div key={b.id} className="text-xs dark:bg-cyan-neon dark:bg-opacity-20 dark:text-cyan-neon dark:border dark:border-cyan-neon dark:border-opacity-30 bg-cyan-light bg-opacity-20 text-cyan-light border border-cyan-light border-opacity-30 p-1 rounded mb-1 truncate">
                        {b.title}
                      </div>
                    ))}
                    {dayBookings.length > 2 && <div className="text-xs dark:text-snow-white dark:text-opacity-50 text-light-text-secondary">+{dayBookings.length - 2}</div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 dark:bg-black dark:bg-opacity-70 bg-black bg-opacity-30 dark:backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-8 rounded-2xl bg-light-surface border border-light-border-subtle shadow-soft max-w-md w-full">
            <h3 className="text-2xl font-bold dark:text-snow-white text-light-text mb-4">Créer une réservation</h3>

            {error && <div className="mb-4 p-3 dark:bg-rose-coral dark:bg-opacity-20 dark:text-rose-coral dark:border dark:border-rose-coral dark:border-opacity-30 bg-red-100 text-red-700 border border-red-300 rounded-lg">{error}</div>}

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-snow-white mb-2">Ressource *</label>
                <select
                  value={formData.resourceId}
                  onChange={(e) => setFormData({ ...formData, resourceId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
                  required
                >
                  <option value="" className="bg-midnight text-snow-white">Choisir une ressource...</option>
                  {resources.map((r) => (
                    <option key={r.id} value={r.id} className="bg-midnight text-snow-white">
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-snow-white mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Réunion d'équipe"
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white placeholder-snow-white placeholder-opacity-50 focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-snow-white mb-2">Début *</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-snow-white mb-2">Fin *</label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-snow-white focus:outline-none focus:border-indigo-royal focus:bg-opacity-15 transition"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-cyan-neon text-midnight py-3 rounded-xl hover:bg-opacity-90 font-semibold transition">
                  ✓ Réserver
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setError('')
                    setFormData({ resourceId: '', title: '', startTime: '', endTime: '' })
                  }}
                  className="flex-1 bg-white bg-opacity-10 text-snow-white py-3 rounded-xl hover:bg-opacity-20 font-semibold transition"
                >
                  ✕ Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
