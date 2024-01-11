import { Cross } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import Input from '@/common/elements/Input'
import Modal from '@/common/elements/Modal'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface ChangePasswordProps {
  show: boolean
  showModal: (show: boolean) => void
}

interface FormType {
  password: string
  passwordConfirm: string
  passwordNew: string
}

const ChangePassword: FC<ChangePasswordProps> = ({ show, showModal }) => {
  const [isEqual, setIsEqual] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { register, handleSubmit, setValue, formState } = useForm<FormType>({
    mode: 'all',
  })
  const { errors } = formState

  const onSubmit = (register: FormType) => {
    if (register.passwordConfirm === register.passwordNew) {
      setValue('password', '')
      setValue('passwordConfirm', '')
      setValue('passwordNew', '')
    } else {
      setIsEqual(true)
    }
  }

  return (
    <Modal isOpen={show} onClose={() => showModal(show)}>
      <div className="flex flex-col p-6 w-[810px] max-sm:w-[335px] max-sm:p-4">
        <div className="flex flex-row justify-between w-full">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Change Password
          </span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={() => showModal(show)}
          >
            <Cross />
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4 mt-8 group max-sm:mt-4"
          >
            <div className="flex flex-row w-full gap-4">
              <span className="text-sm font-normal text-white w-[250px]">
                Current Password
              </span>
              <div className="relative w-full mt-2">
                <Input
                  {...register('password', {
                    required: 'Please enter valid password',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/i,
                      message: 'Please enter valid password',
                    },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter current password"
                  className="w-full"
                />
                {errors.password && (
                  <div className="mt-2">
                    <span className="text-sm text-red ">
                      Please enter valid password
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full gap-4">
              <span className="text-sm font-normal text-white w-[250px]">
                New password
              </span>
              <div className="relative w-full mt-2">
                <Input
                  {...register('passwordNew', {
                    required: 'Please enter valid password',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/i,
                      message: 'Please enter valid password',
                    },
                  })}
                  id="passwordNew"
                  name="passwordNew"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full"
                />
                {errors.passwordNew && (
                  <div className="mt-2">
                    <span className="text-sm text-red ">
                      Please enter valid password
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full gap-4">
              <span className="text-sm font-normal text-white w-[250px]">
                Confirm new password
              </span>
              <div className="relative w-full mt-2">
                <Input
                  {...register('passwordConfirm', {
                    required: 'Please enter valid password',
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/i,
                      message: 'Please enter valid password',
                    },
                  })}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="Enter new confirm password"
                  className="w-full"
                />
                {errors.passwordConfirm && (
                  <div className="mt-2">
                    <span className="text-sm text-red ">
                      Please enter valid password
                    </span>
                  </div>
                )}
                {isEqual && (
                  <div className="mt-2">
                    <span className="text-sm text-red ">
                      Confirm password does not equal
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full mt-4">
              <Button
                text="Change Password"
                variant="gradient"
                type="submit"
                width="fit-parent"
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default ChangePassword
