import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useBookingsStore } from '../store/bookingsStore'
import { useResourcesStore } from '../store/resourcesStore'

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const bookings = useBookingsStore((state) => state.getTodayBookings())
  const allBookings = useBookingsStore((state) => state.bookings)
  const resources = useResourcesStore((state) => state.resources)

  const occupiedResourceIds = new Set(bookings.map((b) => b.resourceId))
  const occupiedCount = occupiedResourceIds.size

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

        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-cyan-neon dark:border-opacity-20 dark:hover:border-opacity-40 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle hover:shadow-soft hover:border-cyan-light transition">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary text-xs md:text-sm font-semibold">Ressources occupées</p>
              <p className="text-2xl md:text-4xl font-black text-cyan-light mt-2">{occupiedCount}</p>
            </div>
            <span className="text-3xl md:text-5xl opacity-20 flex-shrink-0">🔴</span>
          </div>
        </div>

        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-rose-coral dark:border-opacity-20 dark:hover:border-opacity-40 p-6 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle hover:shadow-soft hover:border-cyan-light transition">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="dark:text-snow-white dark:text-opacity-70 text-light-text-secondary text-xs md:text-sm font-semibold">Disponibles</p>
              <p className="text-2xl md:text-4xl font-black text-rose-coral mt-2">{resources.length - occupiedCount}</p>
            </div>
            <span className="text-3xl md:text-5xl opacity-20 flex-shrink-0">✅</span>
          </div>
        </div>
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
    </div>
  )
}
