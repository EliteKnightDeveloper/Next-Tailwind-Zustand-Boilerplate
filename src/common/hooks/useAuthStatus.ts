import { firebaseAuth } from '@/api/firebaseConfig'
import { useEffect, useState } from 'react'
import { useGlobalStore } from '../stores/globalStore'
import { createNewUser } from '@/api/firebase'
import { useUserStore } from '../stores/userStore'

export const useAuthStatus = () => {
  const [isCheckingStatus, setIsCheckingStatus] = useState(true)
  const [setPageLoading, isSignedIn, setIsSignedIn] = useGlobalStore(
    (state) => [state.setPageLoading, state.isSignedIn, state.setIsSignedIn]
  )
  const [setUser, setLoginTime] = useUserStore((state) => [
    state.setUser,
    state.setLoginTime,
  ])

  useEffect(
    () => {
      setPageLoading(true)
      setIsCheckingStatus(true)

      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const userToken = await user.getIdToken(true)
          localStorage.setItem('token', userToken)
          setLoginTime(user.metadata.lastSignInTime!)
          createNewUser(user.email!, user.displayName || '', userToken)
            .then((userInfo) => {
              setUser(userInfo)
              setIsSignedIn(true)
              setPageLoading(false)
              setIsCheckingStatus(false)
            })
            .catch((error: any) => {})
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
