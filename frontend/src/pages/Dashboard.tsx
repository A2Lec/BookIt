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
        <p className="text-snow-white text-opacity-60">Gérez vos réservations et ressources</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-6 rounded-2xl border border-indigo-royal border-opacity-20 hover:border-opacity-40 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-snow-white text-opacity-70 text-sm font-semibold">Réservations du jour</p>
              <p className="text-4xl font-black text-indigo-royal mt-2">{bookings.length}</p>
            </div>
            <span className="text-5xl opacity-20">📅</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-cyan-neon border-opacity-20 hover:border-opacity-40 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-snow-white text-opacity-70 text-sm font-semibold">Ressources occupées</p>
              <p className="text-4xl font-black text-cyan-neon mt-2">{occupiedCount}</p>
            </div>
            <span className="text-5xl opacity-20">🔴</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-rose-coral border-opacity-20 hover:border-opacity-40 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-snow-white text-opacity-70 text-sm font-semibold">Disponibles</p>
              <p className="text-4xl font-black text-rose-coral mt-2">{resources.length - occupiedCount}</p>
            </div>
            <span className="text-5xl opacity-20">✅</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Bookings */}
        <div className="glass-card p-6 rounded-2xl border border-white border-opacity-10">
          <h3 className="text-xl font-bold text-snow-white mb-4">📅 Réservations du jour</h3>
          {bookings.length > 0 ? (
            <ul className="space-y-3">
              {bookings.map((b) => {
                const resource = resources.find((r) => r.id === b.resourceId)
                return (
                  <li key={b.id} className="p-4 rounded-xl bg-white bg-opacity-5 border border-white border-opacity-10 hover:border-indigo-royal hover:border-opacity-30 transition">
                    <p className="font-semibold text-snow-white">{b.title}</p>
                    <p className="text-sm text-cyan-neon">{resource?.name}</p>
                    <p className="text-xs text-snow-white text-opacity-50 font-mono mt-1">
                      {new Date(b.startTime).toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })} -{' '}
                      {new Date(b.endTime).toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune réservation aujourd'hui</p>
          )}
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white border-opacity-10">
          <h3 className="text-xl font-bold text-snow-white mb-4">🎯 Mes réservations (7 prochains jours)</h3>
          {allBookings.length > 0 ? (
            <ul className="space-y-3">
              {allBookings.slice(0, 5).map((b) => {
                const resource = resources.find((r) => r.id === b.resourceId)
                return (
                  <li key={b.id} className="p-4 rounded-xl bg-white bg-opacity-5 border-l-4 border-indigo-royal hover:border-opacity-40 transition">
                    <p className="font-semibold text-snow-white">{b.title}</p>
                    <p className="text-sm text-cyan-neon">{resource?.name}</p>
                    <p className="text-xs text-snow-white text-opacity-50 font-mono mt-1">{new Date(b.startTime).toLocaleDateString('fr')}</p>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-snow-white text-opacity-50">Aucune réservation</p>
          )}
        </div>
      </div>
    </div>
  )
}
