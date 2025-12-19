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
      <h2 className="text-3xl font-bold mb-6">Bienvenue, {user?.firstName} 👋</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded shadow">
          <h3 className="font-bold text-gray-700">Réservations du jour</h3>
          <p className="text-4xl text-blue-600 font-bold mt-2">{bookings.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-600 p-6 rounded shadow">
          <h3 className="font-bold text-gray-700">Ressources occupées</h3>
          <p className="text-4xl text-green-600 font-bold mt-2">{occupiedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600 p-6 rounded shadow">
          <h3 className="font-bold text-gray-700">Ressources disponibles</h3>
          <p className="text-4xl text-purple-600 font-bold mt-2">{resources.length - occupiedCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-xl mb-4">📅 Réservations du jour</h3>
          {bookings.length > 0 ? (
            <ul className="space-y-3">
              {bookings.map((b) => {
                const resource = resources.find((r) => r.id === b.resourceId)
                return (
                  <li key={b.id} className="p-3 bg-gray-50 rounded border-l-4 border-blue-600">
                    <p className="font-semibold">{b.title}</p>
                    <p className="text-sm text-gray-600">{resource?.name}</p>
                    <p className="text-xs text-gray-500">
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

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-xl mb-4">🎯 Mes réservations (7 prochains jours)</h3>
          {allBookings.length > 0 ? (
            <ul className="space-y-3">
              {allBookings.slice(0, 5).map((b) => {
                const resource = resources.find((r) => r.id === b.resourceId)
                return (
                  <li key={b.id} className="p-3 bg-gray-50 rounded border-l-4 border-green-600">
                    <p className="font-semibold">{b.title}</p>
                    <p className="text-sm text-gray-600">{resource?.name}</p>
                    <p className="text-xs text-gray-500">{new Date(b.startTime).toLocaleDateString('fr')}</p>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune réservation</p>
          )}
        </div>
      </div>
    </div>
  )
}
