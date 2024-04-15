import { firebaseAuth } from '@/api/firebaseConfig'
import { useEffect, useState } from 'react'
import { useGlobalStore } from '../stores/globalStore'
import { createNewUser } from '@/api/firebase'
import { useUserStore } from '../stores/userStore'
import { useNotifications } from '@/hooks/useNotifications'
import { useRouter } from 'next/router'
import { appLinks } from '../utils/constants'
import axios from 'axios'
import { axiosIntegrations } from '@/api/request'

export const useAuthStatus = () => {
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)
  const [setPageLoading, isSignedIn, setIsSignedIn] = useGlobalStore(
    (state) => [state.setPageLoading, state.isSignedIn, state.setIsSignedIn]
  )
  const { addNotification } = useNotifications()
  const [setUser, setLoginTime, setTenant] = useUserStore((state) => [
    state.setUser,
    state.setLoginTime,
    state.setTenant,
  ])
  const router = useRouter()
  const isInviteLink = router.pathname.indexOf(appLinks.signup) !== -1

  useEffect(
    () => {
      if (!isInviteLink) {
        setPageLoading(true)
        setIsCheckingStatus(true)
      }

      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const userToken = await user.getIdToken(true)
          const { claims } = await user.getIdTokenResult(true)

          const firebaseTenant = (claims.tenant as string)
            ? (claims.tenant as string)
            : (localStorage.getItem('azara-tenant') as string)
          setTenant(firebaseTenant)
          axios.defaults.baseURL = `https://${firebaseTenant}.azara-ai.com:9000`
          axiosIntegrations.defaults.baseURL = `https://${firebaseTenant}.azara-ai.com:8000/blackbox`

          localStorage.setItem('token', userToken)
          setLoginTime(user.metadata.lastSignInTime!)
          createNewUser(
            firebaseTenant,
            user.email!,
            user.displayName || '',
            userToken
          )
            .then((userInfo) => {
              setUser(userInfo)
              setIsSignedIn(true)
              setPageLoading(false)
              setIsCheckingStatus(false)

              addNotification({
                type: 'Success',
                text: 'Login Success',
              })
            })
            .catch((error: any) => {
              addNotification({
                type: 'Fail',
                text: error,
              })
              setUser(null)
              firebaseAuth.signOut()
              setIsSignedIn(false)
              setPageLoading(false)
              setIsCheckingStatus(false)
            })
        } else {
          localStorage.removeItem('token')
          setPageLoading(false)
          setIsCheckingStatus(false)
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { isSignedIn, isCheckingStatus }
}
