import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Close, Logo, Spinner, Tick } from '@/common/components/Icons'
import api from '@/api'
import Button from '@/common/elements/Button'
import { appLinks } from '@/common/utils/constants'
import axios from 'axios'
import { useUserStore } from '@/common/stores/userStore'

const Singup = () => {
  const [isValidating, setValidating] = useState(true)
  const [success, setSuccess] = useState(false)
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (!params.get('token') || !params.get('tenant')) return
    const tenant = atob(params.get('tenant')!)
    localStorage.setItem('azara-tenant', tenant)

    axios.defaults.baseURL = `https://${tenant}.azara-ai.com:9000`

    api.auth
      .validate(params.get('token') || '')
      .then(() => {
        setValidating(false)
        setSuccess(true)
      })
      .catch(() => {
        setValidating(false)
        setSuccess(false)
      })
  }, [params])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="flex flex-row justify-center items-center h-[55px] gap-4">
        <Logo />
        <span className="text-3xl font-bold text-white">Azara</span>
      </div>

      {isValidating && (
        <div className="flex gap-2 items-center text-white max-md:px-3">
          <span className="spinner">
            <Spinner />
          </span>
          <h3 className="text-white">Validating your information ...</h3>
        </div>
      )}

      {!isValidating && success && (
        <div className="flex gap-2 items-center text-white max-md:px-3">
          <div className="min-w-[20px]">
            <Tick />
          </div>
          <h3>Validation successful. You can sign in now.</h3>
        </div>
      )}

      {!isValidating && !success && (
        <div className="flex gap-2 items-center text-white max-md:px-3">
          <div className="min-w-[20px]">
            <Close />
          </div>
          <h3>
            Validation failed. The token might be expired or token is invalid.
          </h3>
        </div>
      )}
      {!isValidating && (
        <div className="flex flex-col">
          <Button
            text="Back to Sign in"
            onClick={() =>
              router.push(appLinks.dashboard, undefined, {
                shallow: false,
              })
            }
          />
        </div>
      )}
    </div>
  )
}

export default Singup
