import { FC, ReactNode, Fragment } from 'react'
import dynamic from 'next/dynamic'
import { usePopup } from '@/common/hooks/usePopup'

const ConfirmModal = dynamic(
  () => import('@/common/components/Modal/ConfirmModal'),
  { ssr: false }
)

interface PopupContainerProps {
  children: ReactNode
}

const PopupContainer: FC<PopupContainerProps> = ({ children }) => {
  const {
    isConfirmOpen,
    isConfirming,
    title,
    confirmText,
    message,
    hideConfirm,
    onConfirm,
  } = usePopup()

  return (
    <Fragment>
      {children}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={title}
        confirmText={confirmText}
        message={message}
        onConfirm={onConfirm}
        onCancel={hideConfirm}
        isConfirming={isConfirming}
      />
    </Fragment>
  )
}

export default PopupContainer
