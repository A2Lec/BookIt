import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { mockNotifications } from '../lib/mockData'

type NotificationType = 'BOOKING_CONFIRMED' | 'BOOKING_CANCELLED' | 'RESOURCE_AVAILABLE' | 'REMINDER'

interface Notification {
  id: string
  userId: string
  type: NotificationType
  message: string
  isRead: boolean
  createdAt: string
}

export default function Notifications() {
  const user = useAuthStore((state) => state.user)
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications.filter((n) => n.userId === user?.id)
  )
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'BOOKING_CONFIRMED':
        return '✅'
      case 'BOOKING_CANCELLED':
        return '❌'
      case 'RESOURCE_AVAILABLE':
        return '✨'
      case 'REMINDER':
        return '⏰'
      default:
        return '📢'
    }
  }

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'BOOKING_CONFIRMED':
        return 'border-green-200 bg-green-50'
      case 'BOOKING_CANCELLED':
        return 'border-red-200 bg-red-50'
      case 'RESOURCE_AVAILABLE':
        return 'border-purple-200 bg-purple-50'
      case 'REMINDER':
        return 'border-yellow-200 bg-yellow-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const filteredNotifications = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🔔 Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition"
          >
            Marquer tout comme lu
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded font-semibold transition ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Toutes ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded font-semibold transition ${
            filter === 'unread'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Non lues ({unreadCount})
        </button>
      </div>

      {/* Liste des notifications */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded shadow">
          <p className="text-xl text-gray-500 mb-2">📭 Aucune notification</p>
          <p className="text-gray-400">Vous êtes à jour !</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-l-4 rounded shadow transition ${getNotificationColor(notification.type)} ${
                !notification.isRead ? 'ring-2 ring-blue-300' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 flex-1">
                  <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.isRead ? 'font-bold text-gray-800' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      Marquer comme lu
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
