import React, { useState } from 'react'
import { CheckCircle2, XCircle, Sparkles, Clock, Bell } from 'lucide-react'
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
        return <CheckCircle2 className="w-5 h-5" />
      case 'BOOKING_CANCELLED':
        return <XCircle className="w-5 h-5" />
      case 'RESOURCE_AVAILABLE':
        return <Sparkles className="w-5 h-5" />
      case 'REMINDER':
        return <Clock className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'BOOKING_CONFIRMED':
        return 'dark:border-l-cyan-neon dark:bg-cyan-neon dark:bg-opacity-10 border-l-cyan-light bg-cyan-light bg-opacity-10'
      case 'BOOKING_CANCELLED':
        return 'dark:border-l-rose-coral dark:bg-rose-coral dark:bg-opacity-10 border-l-rose-coral bg-rose-coral bg-opacity-10'
      case 'RESOURCE_AVAILABLE':
        return 'dark:border-l-indigo-royal dark:bg-indigo-royal dark:bg-opacity-10 border-l-indigo-royal bg-indigo-royal bg-opacity-10'
      case 'REMINDER':
        return 'dark:border-l-yellow-400 dark:bg-yellow-400 dark:bg-opacity-10 border-l-yellow-400 bg-yellow-400 bg-opacity-10'
      default:
        return 'dark:border-l-indigo-royal dark:bg-indigo-royal dark:bg-opacity-10 border-l-indigo-royal bg-indigo-royal bg-opacity-10'
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
          <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-royal to-cyan-neon bg-clip-text text-transparent flex items-center gap-2">
            <Bell className="w-10 h-10 text-cyan-neon" />
            Notifications
          </h2>
          <p className="dark:text-snow-white dark:text-opacity-60 text-light-text-secondary mt-2">Restez informé des mises à jour</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-6 py-3 dark:bg-indigo-royal dark:text-snow-white dark:hover:bg-opacity-90 bg-indigo-royal text-white hover:opacity-90 rounded-xl font-semibold transition"
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
              ? 'dark:bg-indigo-royal dark:text-snow-white bg-indigo-royal text-white'
              : 'dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 dark:border dark:border-white dark:border-opacity-20 bg-light-border text-light-text hover:opacity-80'
          }`}
        >
          Toutes ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            filter === 'unread'
              ? 'dark:bg-indigo-royal dark:text-snow-white bg-indigo-royal text-white'
              : 'dark:bg-white dark:bg-opacity-10 dark:text-snow-white dark:hover:bg-opacity-20 dark:border dark:border-white dark:border-opacity-20 bg-light-border text-light-text hover:opacity-80'
          }`}
        >
          Non lues ({unreadCount})
        </button>
      </div>

      {/* Liste des notifications */}
      {filteredNotifications.length === 0 ? (
        <div className="dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border dark:border-white dark:border-opacity-10 p-8 md:p-12 rounded-2xl bg-light-surface border border-light-border-subtle shadow-subtle text-center">
          <Bell className="w-12 h-12 mx-auto opacity-20 mb-4" />
          <p className="text-lg md:text-xl dark:text-snow-white dark:text-opacity-70 text-light-text mb-2">Aucune notification</p>
          <p className="dark:text-snow-white dark:text-opacity-50 text-light-text-secondary">Vous êtes à jour !</p>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4 pb-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`dark:glass-card dark:bg-dark-grey dark:bg-opacity-20 dark:border-l-4 dark:border-white dark:border-opacity-10 dark:hover:border-opacity-30 dark:rounded-xl dark:transition p-3 md:p-4 rounded-xl border-l-4 border-light-border bg-light-surface shadow-subtle hover:shadow-soft transition ${getNotificationColor(notification.type)} ${
                !notification.isRead ? 'dark:ring-2 dark:ring-indigo-royal dark:ring-opacity-30 ring-2 ring-indigo-royal ring-opacity-20' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="text-cyan-light dark:text-cyan-neon flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.isRead ? 'dark:font-bold dark:text-snow-white font-bold text-light-text' : 'dark:text-snow-white dark:text-opacity-90 text-light-text text-opacity-90'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs dark:text-snow-white dark:text-opacity-50 text-light-text-secondary mt-1 font-mono">
                      {new Date(notification.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2 sm:ml-4 flex-shrink-0 w-full sm:w-auto">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs px-2 md:px-3 py-1 dark:bg-indigo-royal dark:bg-opacity-20 dark:text-indigo-royal dark:hover:bg-opacity-30 dark:border dark:border-indigo-royal dark:border-opacity-30 bg-indigo-royal bg-opacity-20 text-indigo-royal border border-indigo-royal border-opacity-30 rounded-lg hover:opacity-80 transition whitespace-nowrap"
                    >
                      Marquer comme lu
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-xs px-2 md:px-3 py-1 dark:bg-rose-coral dark:bg-opacity-20 dark:text-rose-coral dark:hover:bg-opacity-30 dark:border dark:border-rose-coral dark:border-opacity-30 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:opacity-80 transition whitespace-nowrap"
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
