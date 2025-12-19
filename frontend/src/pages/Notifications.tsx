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
        return 'border-l-cyan-neon bg-cyan-neon bg-opacity-10'
      case 'BOOKING_CANCELLED':
        return 'border-l-rose-coral bg-rose-coral bg-opacity-10'
      case 'RESOURCE_AVAILABLE':
        return 'border-l-indigo-royal bg-indigo-royal bg-opacity-10'
      case 'REMINDER':
        return 'border-l-yellow-400 bg-yellow-400 bg-opacity-10'
      default:
        return 'border-l-indigo-royal bg-indigo-royal bg-opacity-10'
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent">🔔 Notifications</h2>
          <p className="text-snow-white text-opacity-60 mt-2">Restez informé des mises à jour</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-6 py-3 bg-indigo-royal text-snow-white rounded-xl hover:bg-opacity-90 font-semibold transition"
          >
            Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            filter === 'all'
              ? 'bg-indigo-royal text-snow-white'
              : 'bg-white bg-opacity-10 text-snow-white hover:bg-opacity-20 border border-white border-opacity-20'
          }`}
        >
          Toutes ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            filter === 'unread'
              ? 'bg-indigo-royal text-snow-white'
              : 'bg-white bg-opacity-10 text-snow-white hover:bg-opacity-20 border border-white border-opacity-20'
          }`}
        >
          Non lues ({unreadCount})
        </button>
      </div>

      {/* Liste des notifications */}
      {filteredNotifications.length === 0 ? (
        <div className="glass-card p-12 rounded-2xl border border-white border-opacity-10 text-center">
          <p className="text-xl text-snow-white text-opacity-70 mb-2">📭 Aucune notification</p>
          <p className="text-snow-white text-opacity-50">Vous êtes à jour !</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`glass-card p-4 rounded-xl border-l-4 border-white border-opacity-10 hover:border-opacity-30 transition ${getNotificationColor(notification.type)} ${
                !notification.isRead ? 'ring-2 ring-indigo-royal ring-opacity-30' : ''
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.isRead ? 'font-bold text-snow-white' : 'text-snow-white text-opacity-90'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-snow-white text-opacity-50 mt-1 font-mono">
                      {new Date(notification.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs px-3 py-1 bg-indigo-royal bg-opacity-20 text-indigo-royal rounded-lg hover:bg-opacity-30 transition border border-indigo-royal border-opacity-30"
                    >
                      Marquer comme lu
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-xs px-3 py-1 bg-rose-coral bg-opacity-20 text-rose-coral rounded-lg hover:bg-opacity-30 transition border border-rose-coral border-opacity-30"
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
