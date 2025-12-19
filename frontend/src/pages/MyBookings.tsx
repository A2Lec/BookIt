import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useBookingsStore } from '../store/bookingsStore'
import { useResourcesStore } from '../store/resourcesStore'

export default function MyBookings() {
  const user = useAuthStore((state) => state.user)
  const bookings = useBookingsStore((state) => state.getBookingsByUser(user?.id || ''))
  const removeBooking = useBookingsStore((state) => state.removeBooking)
  const resources = useResourcesStore((state) => state.resources)

  if (!user) return <div className="text-center py-8">Vous devez être connecté</div>

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent">Mes réservations</h2>
        <p className="text-snow-white text-opacity-60 mt-2">Gérez vos réservations</p>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((b) => {
            const resource = resources.find((r) => r.id === b.resourceId)
            return (
              <div key={b.id} className="glass-card p-6 rounded-2xl border border-white border-opacity-10 hover:border-opacity-30 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-snow-white">{b.title}</h3>
                    <p className="text-cyan-neon mt-1">
                      <span className="font-semibold">{resource?.name}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg font-semibold text-sm ${b.status === 'CONFIRMED' ? 'bg-cyan-neon bg-opacity-20 text-cyan-neon border border-cyan-neon border-opacity-30' : 'bg-indigo-royal bg-opacity-20 text-indigo-royal border border-indigo-royal border-opacity-30'}`}>
                    {b.status === 'CONFIRMED' ? '✓ Confirmée' : '⏳ En attente'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-snow-white text-opacity-60 uppercase">Début</p>
                    <p className="font-semibold text-snow-white font-mono">{new Date(b.startTime).toLocaleString('fr')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-snow-white text-opacity-60 uppercase">Fin</p>
                    <p className="font-semibold text-snow-white font-mono">{new Date(b.endTime).toLocaleString('fr')}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                      removeBooking(b.id)
                    }
                  }}
                  className="w-full bg-rose-coral bg-opacity-20 text-rose-coral px-4 py-3 rounded-xl hover:bg-opacity-30 font-semibold transition border border-rose-coral border-opacity-30"
                >
                  ✗ Annuler
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="glass-card p-12 rounded-2xl border border-white border-opacity-10 text-center">
          <p className="text-snow-white text-opacity-70 text-lg">Vous n'avez aucune réservation</p>
          <p className="text-snow-white text-opacity-50 mt-2">Allez au calendrier pour créer une nouvelle réservation</p>
        </div>
      )}
    </div>
  )
}
