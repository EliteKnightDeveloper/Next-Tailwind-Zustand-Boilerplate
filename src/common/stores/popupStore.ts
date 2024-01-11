import { create } from 'zustand'

interface CallbackInterface {
  (): void
}

interface PopupStoreInterface {
  isConfirmOpen: boolean
  setConfirmOpen: (isConfirmOpen: boolean) => void

  isToastOpen: boolean
  setIsToastOpen: (isToastOpen: boolean) => void

  title: string
  setTitle: (title: string) => void

  confirmText: string
  setConfirmText: (confirmText: string) => void

  message: string
  setMessage: (message: string) => void

  onConfirm: () => void
  setOnConfirm: (onConfirm: CallbackInterface) => void

  isConfirming: boolean
  setIsConfirming: (isConfirming: boolean) => void
}

const popupStore = (set: any) => ({
  isConfirmOpen: false,
  setConfirmOpen: (isConfirmOpen: boolean) => {
    set({ isConfirmOpen })
  },

  isToastOpen: false,
  setIsToastOpen: (isToastOpen: boolean) => {
    set({ isToastOpen })
  },

  title: '',
  setTitle: (title: string) => {
    set({ title })
  },

  confirmText: '',
  setConfirmText: (confirmText: string) => {
    set({ confirmText })
  },

  message: '',
  setMessage: (message: string) => {
    set({ message })
  },

  isConfirming: false,
  setIsConfirming: (isConfirming: boolean) => {
    set({ isConfirming })
  },

  onConfirm: () => {},
  setOnConfirm: (onConfirm: CallbackInterface) => {
    set({ onConfirm })
  },
})

export const usePopupStore = create<PopupStoreInterface>(popupStore)
