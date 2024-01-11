import { create } from 'zustand'

interface GlobalStoreInterface {
  isPageLoading: boolean
  setPageLoading: (isPageLoading: boolean) => void

  isSignedIn: boolean
  setIsSignedIn: (isSignedIn: boolean) => void
}

const globalStore = (set: any) => ({
  isPageLoading: true,
  setPageLoading: (isPageLoading: boolean) => set({ isPageLoading }),

  isSignedIn: false,
  setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
})

export const useGlobalStore = create<GlobalStoreInterface>(globalStore)
