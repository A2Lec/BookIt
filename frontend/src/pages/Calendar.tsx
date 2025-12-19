import React, { useState } from 'react'
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
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
  const [showDayDetail, setShowDayDetail] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    resourceId: '',
    title: '',
    startHour: '09',
    startMin: '00',
    endHour: '10',
    endMin: '00',
  })

  function handleDateClick(day: Date) {
    const newDate = new Date(day)
    setSelectedDate(newDate)
    setShowDayDetail(true)
    setShowForm(false)
    setError('')
    // Reset form with the selected date
    setFormData({
      resourceId: '',
      title: '',
      startHour: '09',
      startMin: '00',
      endHour: '10',
      endMin: '00',
    })
  }

  function openAddForm() {
    setShowForm(true)
    setShowDayDetail(false)
  }

  function handleCreateBooking(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !selectedDate) {
      setError('Erreur: utilisateur ou date manquante')
      return
    }

    if (!formData.resourceId || !formData.title) {
      setError('Tous les champs sont obligatoires')
      return
    }

    const startTime = new Date(selectedDate)
    startTime.setHours(parseInt(formData.startHour), parseInt(formData.startMin), 0)

    const endTime = new Date(selectedDate)
    endTime.setHours(parseInt(formData.endHour), parseInt(formData.endMin), 0)

    if (endTime <= startTime) {
      setError('La date de fin doit être après la date de début')
      return
    }

    if (hasConflict(formData.resourceId, startTime, endTime)) {
      setError('Cette ressource est déjà réservée à ce créneau')
      return
    }

    addBooking({
      id: 'booking-' + Math.random().toString(36).substring(7),
      userId: user.id,
      resourceId: formData.resourceId,
      title: formData.title,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: 'CONFIRMED',
    })

    setShowForm(false)
    setShowDayDetail(true)
    setFormData({
      resourceId: '',
      title: '',
      startHour: '09',
      startMin: '00',
      endHour: '10',
      endMin: '00',
    })
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))

  const monthName = currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
  
  const dayBookings = selectedDate ? bookings.filter((b) => new Date(b.startTime).toDateString() === selectedDate.toDateString()) : []

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent flex items-center gap-3">
          <CalendarIcon className="w-10 h-10 text-cyan-neon" />
          Calendrier
        </h2>
        <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-2">Sélectionnez un jour pour créer une réservation</p>
      </div>

      <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle mb-8">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-4 py-2 dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 bg-light-border text-light-text hover:opacity-80 rounded-lg font-semibold transition"
          >
            ← Précédent
          </button>
          <h3 className="text-2xl font-bold dark:text-snow-white text-light-text capitalize whitespace-nowrap">{monthName}</h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-4 py-2 dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 bg-light-border text-light-text hover:opacity-80 rounded-lg font-semibold transition"
          >
            Suivant →
          </button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
            <div key={d} className="font-bold text-center py-2 text-xs md:text-sm dark:text-snow-white dark:text-opacity-60 text-light-text-secondary hidden lg:block">
              {d}
            </div>
          ))}

          {days.map((day, i) => {
            const dBookings = day ? bookings.filter((b) => new Date(b.startTime).toDateString() === day.toDateString()) : []
            const isToday = day && new Date().toDateString() === day.toDateString()
            const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString()

            return (
              <div
                key={i}
                onClick={() => day && handleDateClick(day)}
                className={`min-h-16 md:min-h-24 p-1 md:p-2 border rounded-lg cursor-pointer transition ${
                  day
                    ? isSelected ? 'dark:bg-cyan-neon dark:bg-opacity-30 dark:border-cyan-neon dark:border-opacity-50 bg-cyan-light bg-opacity-30 border-cyan-light border-opacity-50 ring-2 dark:ring-cyan-neon ring-cyan-light' : isToday ? 'dark:bg-indigo-royal dark:bg-opacity-20 dark:border-indigo-royal dark:border-opacity-50 bg-indigo-royal bg-opacity-10 border-indigo-royal border-opacity-40' : 'dark:bg-white dark:bg-opacity-5 dark:border-white dark:border-opacity-10 dark:hover:bg-opacity-10 bg-light-surface-alt border-light-border-subtle hover:border-cyan-light'
                    : 'bg-transparent border-transparent'
                }`}
              >
                {day && (
                  <>
                    <div className={`font-bold mb-1 text-sm md:text-base ${isSelected ? 'text-cyan-light dark:text-cyan-neon' : isToday ? 'text-indigo-royal' : 'dark:text-snow-white text-light-text'}`}>{day.getDate()}</div>
                    {dBookings.slice(0, 1).map((b) => (
                      <div key={b.id} className="text-xs dark:bg-cyan-neon dark:bg-opacity-20 dark:text-cyan-neon dark:border dark:border-cyan-neon dark:border-opacity-30 bg-cyan-light bg-opacity-20 text-cyan-light border border-cyan-light border-opacity-30 p-0.5 md:p-1 rounded mb-1 truncate hidden md:block">
                        {b.title}
                      </div>
                    ))}
                    {dBookings.length > 1 && <div className="text-xs dark:text-snow-white dark:text-opacity-50 text-light-text-secondary hidden md:block">+{dBookings.length - 1}</div>}
                    {dBookings.length > 0 && <div className="md:hidden flex gap-1 mt-1">
                      {dBookings.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full dark:bg-cyan-neon bg-cyan-light"></div>
                      ))}
                    </div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Day Detail View */}
      {showDayDetail && selectedDate && (
        <div className="fixed inset-0 dark:bg-black dark:bg-opacity-70 bg-black bg-opacity-30 dark:backdrop-blur-sm flex items-end md:items-center justify-center z-50 px-4 pb-24 md:pb-0">
          <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 md:p-8 rounded-2xl bg-light-surface border border-light-border-subtle shadow-soft w-full md:max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold dark:text-snow-white text-light-text">
                  {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h3>
                <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-1">{dayBookings.length} réservation{dayBookings.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setShowDayDetail(false)}
                className="text-2xl dark:text-snow-white text-light-text hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>

            {/* Timeline of bookings */}
            <div className="mb-8 space-y-4">
              {dayBookings.length > 0 ? (
                dayBookings.map((booking) => {
                  const resource = resources.find((r) => r.id === booking.resourceId)
                  const startHour = new Date(booking.startTime).getHours()
                  const endHour = new Date(booking.endTime).getHours()
                  const startMin = new Date(booking.startTime).getMinutes()
                  const endMin = new Date(booking.endTime).getMinutes()
                  
                  return (
                    <div key={booking.id} className="dark:bg-white dark:bg-opacity-5 dark:border dark:border-white dark:border-opacity-10 bg-light-surface-alt border border-light-border-subtle p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold dark:text-snow-white text-light-text">{booking.title}</h4>
                        <span className="text-xs px-2 py-1 dark:bg-cyan-neon dark:bg-opacity-20 dark:text-cyan-neon bg-cyan-light bg-opacity-20 text-cyan-light rounded-full flex items-center gap-1">
                          {booking.status === 'CONFIRMED' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              Confirmée
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              En attente
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-cyan-light dark:text-cyan-neon font-semibold mb-2">{resource?.name}</p>
                      <p className="text-sm dark:text-snow-white dark:text-opacity-70 text-light-text font-mono">
                        {String(startHour).padStart(2, '0')}:{String(startMin).padStart(2, '0')} - {String(endHour).padStart(2, '0')}:{String(endMin).padStart(2, '0')}
                      </p>
                    </div>
                  )
                })
              ) : (
                <div className="dark:bg-white dark:bg-opacity-5 bg-light-surface-alt p-8 rounded-xl text-center">
                  <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary">Aucune réservation pour ce jour</p>
                </div>
              )}
            </div>

            <button
              onClick={openAddForm}
              className="w-full dark:bg-indigo-royal dark:hover:bg-opacity-80 dark:text-snow-white px-6 py-3 rounded-lg font-semibold bg-indigo-royal hover:bg-opacity-80 text-snow-white transition"
            >
              + Ajouter une réservation
            </button>
          </div>
        </div>
      )}

      {/* Add Booking Form */}
      {showForm && selectedDate && (
        <div className="fixed inset-0 dark:bg-black dark:bg-opacity-70 bg-black bg-opacity-30 dark:backdrop-blur-sm flex items-end md:items-center justify-center z-50 px-4 pb-24 md:pb-0">
          <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 md:p-8 rounded-2xl bg-light-surface border border-light-border-subtle shadow-soft w-full md:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold dark:text-snow-white text-light-text">Nouvelle réservation</h3>
                <p className="text-xs dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-1 flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-2xl dark:text-snow-white text-light-text hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 p-3 dark:bg-indigo-royal dark:bg-opacity-20 dark:text-cyan-neon bg-indigo-royal bg-opacity-10 text-indigo-royal rounded-lg text-sm">
              📅 {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            {error && <div className="mb-4 p-3 dark:bg-rose-coral dark:bg-opacity-20 dark:text-rose-coral dark:border dark:border-rose-coral dark:border-opacity-30 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold dark:text-snow-white text-light-text mb-2">Ressource *</label>
                <select
                  value={formData.resourceId}
                  onChange={(e) => setFormData({ ...formData, resourceId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
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
                <label className="block text-sm font-semibold dark:text-snow-white text-light-text mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Réunion d'équipe"
                  className="w-full px-4 py-3 rounded-xl dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:placeholder-snow-white dark:placeholder-opacity-50 dark:focus:border-indigo-royal dark:focus:bg-opacity-15 bg-light-surface-alt border border-light-border text-light-text placeholder-light-text-secondary placeholder-opacity-60 focus:outline-none focus:border-cyan-light transition"
                  required
                />
              </div>

              {/* Time Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold dark:text-snow-white text-light-text">Horaire *</label>
                
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-xs dark:text-snow-white dark:text-opacity-60 text-light-text-secondary">Début</label>
                    <div className="flex gap-2 mt-1">
                      <select
                        value={formData.startHour}
                        onChange={(e) => setFormData({ ...formData, startHour: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal bg-light-surface-alt border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <span className="dark:text-snow-white text-light-text font-bold">:</span>
                      <select
                        value={formData.startMin}
                        onChange={(e) => setFormData({ ...formData, startMin: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal bg-light-surface-alt border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-xs dark:text-snow-white dark:text-opacity-60 text-light-text-secondary">Fin</label>
                    <div className="flex gap-2 mt-1">
                      <select
                        value={formData.endHour}
                        onChange={(e) => setFormData({ ...formData, endHour: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal bg-light-surface-alt border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <span className="dark:text-snow-white text-light-text font-bold">:</span>
                      <select
                        value={formData.endMin}
                        onChange={(e) => setFormData({ ...formData, endMin: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg dark:bg-white dark:bg-opacity-10 dark:border dark:border-white dark:border-opacity-20 dark:text-snow-white dark:focus:border-indigo-royal bg-light-surface-alt border border-light-border text-light-text focus:outline-none focus:border-cyan-light transition"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 px-6 py-2 rounded-lg font-semibold bg-light-border text-light-text hover:opacity-80 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 dark:bg-indigo-royal dark:hover:bg-opacity-80 dark:text-snow-white px-6 py-2 rounded-lg font-semibold bg-indigo-royal hover:bg-opacity-80 text-snow-white transition"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
