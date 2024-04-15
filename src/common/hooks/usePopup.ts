import { PopupType, usePopupStore } from '../stores/popupStore'

interface ShowConfirmInput {
  title: string
  message: string
  confirmText: string
  type?: PopupType
  onConfirm: () => void
}

export const usePopup = () => {
  const [
    isConfirmOpen,
    title,
    type,
    confirmText,
    message,
    isConfirming,
    onConfirm,
    setConfirmOpen,
    setTitle,
    setMessage,
    setOnConfirm,
    setIsConfirming,
    setConfirmText,
    setType,
  ] = usePopupStore((state) => [
    state.isConfirmOpen,
    state.title,
    state.type,
    state.confirmText,
    state.message,
    state.isConfirming,
    state.onConfirm,
    state.setConfirmOpen,
    state.setTitle,
    state.setMessage,
    state.setOnConfirm,
    state.setIsConfirming,
    state.setConfirmText,
    state.setType,
  ])

  const showConfirm = (input: ShowConfirmInput) => {
    setTitle(input.title)
    setType(input.type ? input.type : 'Delete'), setMessage(input.message)
    setConfirmText(input.confirmText)
    setOnConfirm(input.onConfirm)
    setConfirmOpen(true)
  }

  const hideConfirm = () => {
    setConfirmOpen(false)
  }

  return {
    isConfirmOpen,
    isConfirming,
    title,
    type,
    message,
    confirmText,
    showConfirm,
    hideConfirm,
    onConfirm,
    setIsConfirming,
  }
}
