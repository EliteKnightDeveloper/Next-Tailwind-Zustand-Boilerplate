import { usePopupStore } from '../stores/popupStore'

interface ShowConfirmInput {
  title: string
  message: string
  confirmText: string
  onConfirm: () => void
}

export const usePopup = () => {
  const [
    isConfirmOpen,
    title,
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
  ] = usePopupStore((state) => [
    state.isConfirmOpen,
    state.title,
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
  ])

  const showConfirm = (input: ShowConfirmInput) => {
    setTitle(input.title)
    setMessage(input.message)
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
    message,
    confirmText,
    showConfirm,
    hideConfirm,
    onConfirm,
    setIsConfirming,
  }
}
