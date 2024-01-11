import { create } from 'zustand'
import { INotification } from '@/interfaces'
import { persist } from 'zustand/middleware'

interface NotificationInterface {
  notifications: INotification[]
  setNotifications: (notifications: INotification[]) => void
}

const notificationStore = (set: any) => ({
  notifications: [],
  setNotifications: (notifications: INotification[]) => {
    set({ notifications })
  },
})

const persistedNotificationStore: any = persist(notificationStore, {
  name: 'NOTIFICATION',
})
export const useNotificationStore = create<NotificationInterface>(
  persistedNotificationStore
)
