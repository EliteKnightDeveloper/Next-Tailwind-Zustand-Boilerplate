import { FC, Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Input from '@/common/elements/Input'
import Button from '@/common/elements/Button'
import { Logo } from '@/common/components/Icons'
import { useUserStore } from '@/common/stores/userStore'
import { classNames } from '@/common/utils'
import {
  attemptSignInWithGoogle,
  attemptSignInWithEmailAndPassword,
  attemptSignUpWithEmailAndPassword,
  attemptPasswordReset,
  createNewUser,
} from '@/api/firebase'
import Google from '~/static/icon/Google.svg'
import Microsoft from '~/static/icon/MS.svg'
import { useGlobalStore } from '@/common/stores/globalStore'
import { useNotifications } from '@/hooks/useNotifications'
import Loading from '@/common/components/Loading'

interface FormType {
  email: string
  password: string
  passwordConfirm: string
  passwordNew: string
}

const Login: FC = () => {
  const [setPageLoading, setIsSignedIn] = useGlobalStore((state) => [
    state.setPageLoading,
    state.setIsSignedIn,
  ])
  const [setUser] = useUserStore((state) => [state.setUser])
  const { register, handleSubmit, setValue, formState } = useForm<FormType>({
    mode: 'all',
  })
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { errors } = formState
  const [activeTab, setActiveTab] = useState(1)
  const [isEqual, setIsEqual] = useState(false)
  const [email, setEmail] = useState('')
  const { addNotification } = useNotifications()

  const handleTabClick = (index: number) => {
    setValue('email', '')
    setValue('password', '')
    setActiveTab(index)
  }

  const onSubmit = (register: FormType) => {
    setLoading(true)
    if (activeTab === 1) {
      attemptSignInWithEmailAndPassword({
        email: register.email,
        password: register.password,
        onSuccess: (user: any) => {
          // createNewUser(user.email!, user.displayName || '', user.accessToken)
          //   .then((userInfo) => {
          //     setUser(userInfo)
          //     setIsSignedIn(true)
          //     setPageLoading(false)
          //   })
          //   .catch((error: any) => {})
          setLoading(false)
          router.push('/dashboard')
          addNotification({
            type: 'Success',
            text: 'Login Success',
          })
        },
        onFail: (error: any) => {
          setLoading(false)
          addNotification({
            type: 'Fail',
            text: 'Invalid email or wrong Password',
          })
        },
      })
    } else if (activeTab === 2) {
      attemptSignUpWithEmailAndPassword({
        email: register.email,
        password: register.password,
        onSuccess: (user: any) => {
          setValue('email', '')
          setValue('password', '')
          setActiveTab(1)
          addNotification({
            type: 'Success',
            text: 'User Signup Success',
          })
          setLoading(false)
        },
        onFail: (error: any) => {
          addNotification({
            type: 'Fail',
            text: 'User Signup Fail',
          })
          setLoading(false)
        },
      })
    } else if (activeTab === 3) {
      setEmail(register.email)
      attemptPasswordReset({
        email: register.email,
        onSuccess: (result: any) => {
          addNotification({
            type: 'Success',
            text: 'Password Reset Request Sent',
          })
          setLoading(false)
        },
        onFail: (error: any) => {
          addNotification({
            type: 'Success',
            text: 'Password Reset Request Fail',
          })
          setLoading(false)
        },
      })
      setActiveTab(4)
    } else if (activeTab === 5) {
      if (register.passwordConfirm === register.passwordNew) {
        setActiveTab(6)
        setLoading(false)
      } else {
        setIsEqual(true)
      }
    }
  }

  const loginGoogle = () => {
    setLoading(true)
    attemptSignInWithGoogle({
      onSuccess: (user: any) => {
        router.push('/dashboard')
        setLoading(false)
      },
      onFail: (error: any) => {
        addNotification({
          type: 'Fail',
          text: 'Login Fail',
        })
        setLoading(false)
      },
    })
  }

  const loginMS = () => {
    setLoading(false)
  }

  const showForgotModal = (index: number) => {
    if (index === 1) {
      setValue('email', '')
      setValue('password', '')
    } else if (index === 3) {
      setValue('email', '')
    }
    setActiveTab(index)
  }

  const sendResetLink = () => {
    setLoading(true)
    attemptPasswordReset({
      email: email,
      onSuccess: (result: any) => {
        setLoading(false)
      },
      onFail: (error: any) => {},
    })
  }

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center w-[580px] max-sm:w-full">
        <div className="flex flex-row justify-center items-center h-[55px] gap-4">
          <Logo />
          <span className="text-3xl font-bold text-white">Azara</span>
        </div>
        {/* {activeTab === 1 || activeTab === 2 ? (
          <Fragment>
            <div className="flex flex-col w-full mt-8">
              <ul className="flex flex-row w-full">
                <li className="flex flex-col flex-1 w-full">
                  <div
                    className={classNames(
                      'inline-block rounded-t-lg p-3 text-base font-semibold text-center hover:cursor-pointer',
                      activeTab === 1 ? 'text-white' : 'text-gray-300'
                    )}
                    onClick={() => handleTabClick(1)}
                  >
                    Log in
                  </div>
                  {activeTab === 1 && (
                    <div className="bg-gradient-to-r from-darkGradientStart to-darkGradientEnd h-0.5 transition"></div>
                  )}
                </li>
                <li className="flex flex-col flex-1 w-full">
                  <div
                    className={classNames(
                      'inline-block rounded-t-lg p-3 text-base font-semibold text-center hover:cursor-pointer',
                      activeTab === 2 ? 'text-white' : 'text-gray-300'
                    )}
                    onClick={() => handleTabClick(2)}
                  >
                    Sign up
                  </div>
                  {activeTab === 2 && (
                    <div className="bg-gradient-to-r from-darkGradientStart to-darkGradientEnd h-0.5 transition"></div>
                  )}
                </li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full group mt-7"
            >
              <div className="flex flex-col w-full">
                <span className="text-sm font-normal text-white">Email</span>
                <div className="relative w-full gap-2 mt-2">
                  <Input
                    {...register('email', {
                      required: 'Please enter valid email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Please enter valid email',
                      },
                    })}
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                  {errors.email && (
                    <span className="text-sm text-red ">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full mt-4">
                <span className="text-sm font-normal text-white">Password</span>
                <div className="relative w-full gap-2 mt-2">
                  <Input
                    {...register('password', {
                      required: 'Please enter valid password',
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/i,
                        message: 'Please enter valid password',
                      },
                    })}
                    type="password"
                    placeholder="Enter password"
                    className="w-full"
                  />
                  {errors.password && (
                    <span className="text-sm text-red ">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              {activeTab === 1 ? (
                <Fragment>
                  <div className="flex flex-col w-full mt-4">
                    <Button
                      text="Log in"
                      variant="gradient"
                      type="submit"
                      width="fit-parent"
                      isLoading={isLoading}
                    />
                  </div>
                  <div
                    className="flex flex-col w-full mt-4 hover:cursor-pointer"
                    onClick={() => showForgotModal(3)}
                  >
                    <span className="text-sm font-semibold text-white">
                      Forgot password?
                    </span>
                  </div>
                </Fragment>
              ) : (
                <div className="flex flex-col w-full mt-4">
                  <Button
                    text="Sign up"
                    variant="gradient"
                    type="submit"
                    width="fit-parent"
                    isLoading={isLoading}
                  />
                </div>
              )}

              <div className="flex flex-col items-center justify-center mt-7">
                <div className="flex flex-row items-center w-full">
                  <div className="w-full h-0 border-b border-gray-300" />
                  <span className="ml-3 mr-3 text-sm font-normal text-gray-300">
                    or
                  </span>
                  <div className="w-full h-0 border-b border-gray-300" />
                </div>
              </div> */}
        <div className="flex flex-col items-center justify-center gap-2 mt-8 mb-4">
          <div
            className="flex flex-row items-center justify-center w-full gap-3 px-6 py-3 border border-gray-600 rounded-xl hover:cursor-pointer"
            onClick={loginGoogle}
          >
            <Image src={Google} alt={'Google'} loading="lazy" />
            <span className="text-sm font-semibold text-white">
              Login with Google
            </span>
          </div>
          {/* <div
            className="flex flex-row items-center justify-center w-full gap-3 px-2 py-3 border border-gray-600 rounded-xl hover:cursor-pointer"
            onClick={loginMS}
          >
            <Image src={Microsoft} alt={'Microsoft'} loading="lazy" />
            <span className="text-sm font-semibold text-white">
              Login with Microsoft
            </span>
          </div> */}
        </div>
        {/* </form>
          </Fragment> */}
        {/* ) : activeTab === 3 ? (
          <Fragment>
            <div className="flex flex-col items-center justify-center mt-8">
              <span className="text-sm font-normal text-white">
                Enter your email and we’ll send you a link to reset your
                password
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full group mt-7"
            >
              <div className="flex flex-col w-full">
                <span className="text-sm font-normal text-white">Email</span>
                <div className="relative w-full gap-2 mt-2">
                  <Input
                    {...register('email', {
                      required: 'Please enter valid email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Please enter valid email',
                      },
                    })}
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                  {errors.email && (
                    <span className="text-sm text-red ">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full mt-4">
                <Button
                  text="Send link to email"
                  variant="gradient"
                  type="submit"
                  width="fit-parent"
                  isLoading={isLoading}
                />
                <div
                  className="flex flex-col w-full mt-4 hover:cursor-pointer"
                  onClick={() => showForgotModal(1)}
                >
                  <span className="text-sm font-semibold text-white">
                    Back to Login?
                  </span>
                </div>
              </div>
            </form>
          </Fragment>
        ) : activeTab === 4 ? (
          <div className="flex flex-col items-center justify-center mt-8">
            <span className="text-2xl font-semibold text-white">
              Email sent
            </span>
            <span className="mt-2 text-sm font-normal text-white">
              We sent an email to user@gmail.com with a link to reset your
              password.
            </span>
            <span
              className="mt-4 text-sm font-normal underline text-neon-100 hover:cursor-pointer"
              onClick={sendResetLink}
            >
              Resend link
            </span>
          </div>
        ) : activeTab === 5 ? (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full group mt-7">
            <div className="flex flex-col w-full">
              <span className="text-sm font-normal text-white">
                New password
              </span>
              <div className="relative w-full gap-2 mt-2">
                <Input
                  {...register('passwordNew', {
                    required: 'Please enter valid password',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/i,
                      message: 'Please enter valid password',
                    },
                  })}
                  type="password"
                  placeholder="Enter new password"
                  className="w-full"
                />
                {errors.passwordNew && (
                  <span className="text-sm text-red ">
                    {errors.passwordNew.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full mt-4">
              <span className="text-sm font-normal text-white">
                Confirm new password
              </span>
              <div className="relative w-full gap-2 mt-2">
                <Input
                  {...register('passwordConfirm', {
                    required: 'Please enter valid password',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/i,
                      message: 'Please enter valid password',
                    },
                  })}
                  type="password"
                  placeholder="Enter new confirm password"
                  className="w-full"
                />
                {errors.passwordConfirm && (
                  <span className="text-sm text-red ">
                    {errors.passwordConfirm.message}
                  </span>
                )}
                {isEqual && (
                  <span className="text-sm text-red ">
                    Confirm password does not equal
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full mt-4">
              <Button
                text="Reset Password"
                variant="gradient"
                type="submit"
                width="fit-parent"
                isLoading={isLoading}
              />
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <span className="text-2xl font-semibold text-white">
              Password reset successful
            </span>
            <span className="mt-2 text-sm font-normal text-white">
              Awesome, you’ve successfully updated your password.
            </span>
            <div className="flex flex-col justify-center items-center mt-4 w-[120px]">
              <Button text="Log in" variant="gradient" width="fit-parent" />
            </div>
          </div>
        )} */}
      </div>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </Fragment>
  )
}

export default Login
