import { FC, useState } from 'react'
import { Cross } from '@/common/components/Icons'
import Input from '@/common/elements/Input'
import Modal from '@/common/elements/Modal'
import Button from '@/common/elements/Button'
import Select, { IOption } from '@/common/elements/Select'
import Required from '@/common/elements/Required'

const permission: IOption[] = [
  { id: 0, label: 'Can View' },
  { id: 1, label: 'Full Access' },
]

interface AddMemberProps {
  show: boolean
  showModal: (show: boolean) => void
}

const AddMember: FC<AddMemberProps> = ({ show, showModal }) => {
  const [defaultValue, setDefaultValue] = useState<IOption>(permission[0])
  const [isLoading, setLoading] = useState(false)

  const changeSelect = (value: IOption) => {
    setDefaultValue(value)
  }

  return (
    <Modal isOpen={show} onClose={() => showModal(show)}>
      <div className="flex flex-col p-6 w-[810px] max-sm:w-[335px] max-sm:p-4">
        <div className="flex flex-row justify-between w-full">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Add member
          </span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={() => showModal(show)}
          >
            <Cross />
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 mt-4 max-sm:mt-6">
          <div className="flex flex-col w-full gap-2 max-sm:gap-3">
            <div className="flex flex-row">
              <span className="text-sm font-normal text-gray-100">Email</span>
              <Required />
            </div>
            <Input type="text" placeholder="Email address" className="w-full" />
          </div>
          <div className="flex flex-col w-full gap-2 max-sm:gap-3">
            <span className="text-sm font-normal text-gray-100">
              Permission
            </span>
            <div className="z-[100] flex flex-row">
              <Select
                className="w-full"
                options={permission}
                value={defaultValue}
                onChange={(value) => {
                  changeSelect(value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-6">
          <Button text={'Save'} variant={'gradient'} isLoading={isLoading} />
        </div>
      </div>
    </Modal>
  )
}

export default AddMember
