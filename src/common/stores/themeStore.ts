import { create } from 'zustand'

interface ThemeStoreInterface {
  isSidebarCollapsed: boolean
  setSidebarCollapsed: (isSidebarCollapsed: boolean) => void

  isMobileSidebarCollapsed: boolean
  setMobileSidebarCollapsed: (isMobileSidebarCollapsed: boolean) => void

  isChatbarOpened: boolean
  setChatbarOpened: (isChatbarOpened: boolean) => void

  isNotificationPanelOpened: boolean
  setNotificationPanelOpened: (isNotificationPanelOpened: boolean) => void

  isMobileChatbarOpened: boolean
  setMobileChatbarOpened: (isMobileChatbarOpened: boolean) => void

  isProfilebarOpened: boolean
  setProfilebarOpened: (isProfilebarOpened: boolean) => void

  isMobileProfilebarCollapsed: boolean
  setMobileProfilebarCollapsed: (isMobileProfilebarCollapsed: boolean) => void

  isChatLogBarCollapsed: boolean
  setChatLogBarCollapsed: (isChatLogBarCollapsed: boolean) => void

  isMobileChatLogBarCollapsed: boolean
  setMobileChatLogBarCollapsed: (isMobileChatLogBarCollapsed: boolean) => void
}

const themeStore = (set: any) => ({
  isSidebarCollapsed: false,
  setSidebarCollapsed: (isSidebarCollapsed: boolean) =>
    set({ isSidebarCollapsed }),

  isChatbarOpened: false,
  setChatbarOpened: (isChatbarOpened: boolean) => set({ isChatbarOpened }),

  isNotificationPanelOpened: false,
  setNotificationPanelOpened: (isNotificationPanelOpened: boolean) =>
    set({ isNotificationPanelOpened }),

  isMobileChatbarOpened: false,
  setMobileChatbarOpened: (isMobileChatbarOpened: boolean) =>
    set({ isMobileChatbarOpened }),

  isMobileSidebarCollapsed: true,
  setMobileSidebarCollapsed: (isMobileSidebarCollapsed: boolean) =>
    set({ isMobileSidebarCollapsed }),

  isProfilebarOpened: true,
  setProfilebarOpened: (isProfilebarOpened: boolean) =>
    set({ isProfilebarOpened }),

  isMobileProfilebarCollapsed: true,
  setMobileProfilebarCollapsed: (isMobileProfilebarCollapsed: boolean) =>
    set({ isMobileProfilebarCollapsed }),

  isChatLogBarCollapsed: true,
  setChatLogBarCollapsed: (isChatLogBarCollapsed: boolean) =>
    set({ isChatLogBarCollapsed }),

  isMobileChatLogBarCollapsed: false,
  setMobileChatLogBarCollapsed: (isMobileChatLogBarCollapsed: boolean) =>
    set({ isMobileChatLogBarCollapsed }),
})

export const useThemeStore = create<ThemeStoreInterface>(themeStore)
