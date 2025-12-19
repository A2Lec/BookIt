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
      <h2 className="text-3xl font-bold mb-6">Mes réservations</h2>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((b) => {
            const resource = resources.find((r) => r.id === b.resourceId)
            return (
              <div key={b.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-xl">{b.title}</h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">{resource?.name}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded font-semibold text-sm ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {b.status === 'CONFIRMED' ? '✓ Confirmée' : '⏳ En attente'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Début</p>
                    <p className="font-semibold">{new Date(b.startTime).toLocaleString('fr')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Fin</p>
                    <p className="font-semibold">{new Date(b.endTime).toLocaleString('fr')}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                      removeBooking(b.id)
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
                >
                  ✗ Annuler
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="text-gray-500 text-lg">Vous n'avez aucune réservation</p>
          <p className="text-gray-400 mt-2">Allez au calendrier pour créer une nouvelle réservation</p>
        </div>
      )}
    </div>
  )
}
