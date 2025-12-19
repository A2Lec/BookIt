import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useBookingsStore } from '../store/bookingsStore'
import { useResourcesStore } from '../store/resourcesStore'

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const bookings = useBookingsStore((state) => state.getTodayBookings())
  const allBookings = useBookingsStore((state) => state.bookings)
  const resources = useResourcesStore((state) => state.resources)

  const [showOccupiedModal, setShowOccupiedModal] = useState(false)
  const [showAvailableModal, setShowAvailableModal] = useState(false)

  const occupiedResourceIds = new Set(bookings.map((b) => b.resourceId))
  const occupiedResources = Array.from(occupiedResourceIds).map((id) => resources.find((r) => r.id === id)).filter(Boolean)
  const occupiedCount = occupiedResourceIds.size
  const availableResources = resources.filter((r) => !occupiedResourceIds.has(r.id))

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent mb-2">
          Bienvenue, {user?.name} 👋
        </h2>
        <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary">Gérez vos réservations et ressources</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-indigo-royal dark:border-opacity-20 dark:hover:border-opacity-40 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle hover:shadow-soft hover:border-cyan-light transition">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary text-xs md:text-sm font-semibold">Réservations du jour</p>
              <p className="text-2xl md:text-4xl font-black text-indigo-royal mt-2">{bookings.length}</p>
            </div>
            <span className="text-3xl md:text-5xl opacity-20 flex-shrink-0">📅</span>
          </div>
        </div>

        <button
          onClick={() => setShowOccupiedModal(true)}
          className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-cyan-neon dark:border-opacity-20 dark:hover:border-opacity-40 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle hover:shadow-soft hover:border-cyan-light transition cursor-pointer text-left"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary text-xs md:text-sm font-semibold">Ressources occupées</p>
              <p className="text-2xl md:text-4xl font-black text-cyan-light mt-2">{occupiedCount}</p>
            </div>
            <span className="text-3xl md:text-5xl opacity-20 flex-shrink-0">🔴</span>
          </div>
        </button>

        <button
          onClick={() => setShowAvailableModal(true)}
          className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-rose-coral dark:border-opacity-20 dark:hover:border-opacity-40 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle hover:shadow-soft hover:border-cyan-light transition cursor-pointer text-left"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary text-xs md:text-sm font-semibold">Disponibles</p>
              <p className="text-2xl md:text-4xl font-black text-rose-coral mt-2">{resources.length - occupiedCount}</p>
            </div>
            <span className="text-3xl md:text-5xl opacity-20 flex-shrink-0">✅</span>
          </div>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Today's Bookings */}
        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle">
          <h3 className="text-xl font-bold dark:text-snow-white text-light-text mb-4">📅 Réservations du jour</h3>
          {bookings.length > 0 ? (
            <ul className="space-y-3">
              {bookings.map((b) => {
                const resource = resources.find((r) => r.id === b.resourceId)
                return (
                  <li key={b.id} className="p-4 rounded-xl dark:bg-white dark:bg-opacity-5 dark:border dark:border-white dark:border-opacity-10 dark:hover:border-indigo-royal dark:hover:border-opacity-30 bg-light-surface-alt border border-light-border-subtle hover:border-cyan-light hover:shadow-subtle transition">
                    <p className="font-semibold dark:text-snow-white text-light-text">{b.title}</p>
                    <p className="text-sm text-cyan-light">{resource?.name}</p>
                    <p className="text-xs dark:text-snow-white dark:text-opacity-50 text-light-text-secondary font-mono mt-1">
                      {new Date(b.startTime).toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })} -{' '}
                      {new Date(b.endTime).toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="dark:text-gray-500 text-light-text-secondary">Aucune réservation aujourd'hui</p>
          )}
        </div>

        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle">
          <h3 className="text-xl font-bold dark:text-snow-white text-light-text mb-4">🎯 Mes réservations (7 prochains jours)</h3>
          {allBookings.length > 0 ? (
            <ul className="space-y-3">
              {allBookings.slice(0, 5).map((b) => {
                const resource = resources.find((r) => r.id === b.resourceId)
                return (
                  <li key={b.id} className="p-4 rounded-xl dark:bg-white dark:bg-opacity-5 dark:border-l-4 dark:border-indigo-royal dark:hover:border-opacity-40 bg-light-surface-alt border-l-4 border-cyan-light hover:shadow-subtle transition">
                    <p className="font-semibold dark:text-snow-white text-light-text">{b.title}</p>
                    <p className="text-sm text-cyan-light">{resource?.name}</p>
                    <p className="text-xs dark:text-snow-white dark:text-opacity-50 text-light-text-secondary font-mono mt-1">{new Date(b.startTime).toLocaleDateString('fr')}</p>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="dark:text-snow-white dark:text-opacity-50 text-light-text-secondary">Aucune réservation</p>
          )}
        </div>
      </div>

      {/* Occupied Resources Modal */}
      {showOccupiedModal && (
        <div className="fixed inset-0 dark:bg-black dark:bg-opacity-70 bg-black bg-opacity-30 dark:backdrop-blur-sm flex items-end md:items-center justify-center z-50 px-4 pb-24 md:pb-0">
          <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 md:p-8 rounded-2xl bg-light-surface border border-light-border-subtle shadow-soft w-full md:max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold dark:text-snow-white text-light-text">Ressources occupées</h3>
                <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-1">{occupiedCount} ressource{occupiedCount !== 1 ? 's' : ''} en utilisation</p>
              </div>
              <button
                onClick={() => setShowOccupiedModal(false)}
                className="text-2xl dark:text-snow-white text-light-text hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {occupiedResources.length > 0 ? (
                occupiedResources.map((resource) => {
                  const resourceBookings = bookings.filter((b) => b.resourceId === resource?.id)
                  return (
                    <div key={resource?.id} className="dark:bg-white dark:bg-opacity-5 dark:border dark:border-white dark:border-opacity-10 bg-light-surface-alt border border-light-border-subtle p-4 rounded-xl">
                      <h4 className="font-bold dark:text-snow-white text-light-text mb-3">{resource?.name}</h4>
                      <div className="space-y-3">
                        {resourceBookings.map((booking) => (
                          <div key={booking.id} className="dark:bg-white dark:bg-opacity-3 dark:border dark:border-cyan-neon dark:border-opacity-20 bg-light-surface border border-cyan-light border-opacity-20 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold dark:text-snow-white text-light-text text-sm">{booking.title}</p>
                              <span className="text-xs px-2 py-1 dark:bg-cyan-neon dark:bg-opacity-20 dark:text-cyan-neon bg-cyan-light bg-opacity-20 text-cyan-light rounded-full">✓ Confirmée</span>
                            </div>
                            <p className="text-xs dark:text-snow-white dark:text-opacity-70 text-light-text-secondary font-mono">
                              {new Date(booking.startTime).toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="dark:bg-white dark:bg-opacity-5 bg-light-surface-alt p-8 rounded-xl text-center">
                  <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary">Aucune ressource occupée</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Available Resources Modal */}
      {showAvailableModal && (
        <div className="fixed inset-0 dark:bg-black dark:bg-opacity-70 bg-black bg-opacity-30 dark:backdrop-blur-sm flex items-end md:items-center justify-center z-50 px-4 pb-24 md:pb-0">
          <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-6 md:p-8 rounded-2xl bg-light-surface border border-light-border-subtle shadow-soft w-full md:max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold dark:text-snow-white text-light-text">Ressources disponibles</h3>
                <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-1">{availableResources.length} ressource{availableResources.length !== 1 ? 's' : ''} libre{availableResources.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setShowAvailableModal(false)}
                className="text-2xl dark:text-snow-white text-light-text hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {availableResources.length > 0 ? (
                availableResources.map((resource) => (
                  <div key={resource.id} className="dark:bg-white dark:bg-opacity-5 dark:border dark:border-white dark:border-opacity-10 bg-light-surface-alt border border-light-border-subtle p-4 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold dark:text-snow-white text-light-text">{resource.name}</h4>
                        <p className="text-sm dark:text-snow-white dark:text-opacity-70 text-light-text-secondary mt-1">{resource.description}</p>
                      </div>
                      <span className="text-xs px-3 py-1 dark:bg-rose-coral dark:bg-opacity-20 dark:text-rose-coral bg-rose-coral bg-opacity-20 text-rose-coral rounded-full font-semibold flex-shrink-0 ml-3">Libre</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="dark:bg-white dark:bg-opacity-5 bg-light-surface-alt p-8 rounded-xl text-center">
                  <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary">Aucune ressource disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
