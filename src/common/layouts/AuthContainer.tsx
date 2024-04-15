import { FC, ReactElement, Fragment } from 'react'
import Modal from '@/common/elements/Modal'
import Login from '@/modules/Login'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { useRouter } from 'next/router'
import { appLinks } from '@/common/utils/constants'
import { useUserStore } from '../stores/userStore'
import Loading from '../components/Loading'

interface AuthContainerProps {
  children: ReactElement
}

const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  const { isCheckingStatus, isSignedIn } = useAuthStatus()
  const [user] = useUserStore((state) => [state.user])
  const router = useRouter()
  const isInviteLink = router.pathname.indexOf(appLinks.signup) !== -1

  return (
    <Fragment>
      {(user || isInviteLink) && children}
      {children}
      {/* {isCheckingStatus && !isInviteLink && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
      )} */}
      {/* <Modal
        isOpen={!isSignedIn && !isInviteLink && !isCheckingStatus}
        onClose={() => {}}
        className="px-16 py-6 max-sm:px-5 max-sm:w-full"
        isStatic
      >
        <Login />
      </Modal> */}
    </Fragment>
  )
}

export default AuthContainer
