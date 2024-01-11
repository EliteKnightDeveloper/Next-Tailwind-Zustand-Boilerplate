import { FC, ReactElement, Fragment } from 'react'
import Modal from '@/common/elements/Modal'
import Login from '@/modules/Login'
import { useAuthStatus } from '../hooks/useAuthStatus'

interface AuthContainerProps {
  children: ReactElement
}

const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  const { isCheckingStatus, isSignedIn } = useAuthStatus()

  return (
    <Fragment>
      {children}
      <Modal
        isOpen={!isSignedIn && !isCheckingStatus}
        onClose={() => {}}
        className="px-16 py-6 max-sm:px-5 max-sm:w-full"
        isStatic
      >
        <Login />
      </Modal>
    </Fragment>
  )
}

export default AuthContainer
