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
      <h2 className="text-3xl font-bold mb-6">Calendrier 📅</h2>

      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
          >
            ← Précédent
          </button>
          <h3 className="text-2xl font-bold capitalize">{monthName}</h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
          >
            Suivant →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
            <div key={d} className="font-bold text-center py-2 text-gray-600">
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
                className={`min-h-24 p-2 border rounded cursor-pointer transition ${
                  day
                    ? `${isToday ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`
                    : 'bg-gray-100 border-gray-100'
                }`}
              >
                {day && (
                  <>
                    <div className={`font-bold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>{day.getDate()}</div>
                    {dayBookings.slice(0, 2).map((b) => (
                      <div key={b.id} className="text-xs bg-blue-100 text-blue-700 p-1 rounded mb-1 truncate">
                        {b.title}
                      </div>
                    ))}
                    {dayBookings.length > 2 && <div className="text-xs text-gray-500">+{dayBookings.length - 2} de plus</div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Créer une réservation</h3>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Ressource *</label>
                <select
                  value={formData.resourceId}
                  onChange={(e) => setFormData({ ...formData, resourceId: e.target.value })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choisir une ressource...</option>
                  {resources.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Réunion d'équipe"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Début *</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Fin *</label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold">
                  ✓ Réserver
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setError('')
                    setFormData({ resourceId: '', title: '', startTime: '', endTime: '' })
                  }}
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 font-semibold"
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
