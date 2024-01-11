import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Cross } from '@/common/components/Icons'
import Avatar from '@/common/elements/Avatar'
import Input from '@/common/elements/Input'
import Modal from '@/common/elements/Modal'
import Select, { IOption } from '@/common/elements/Select'
import Button from '@/common/elements/Button'

interface Member {
  avatar: string
  name: string
  email: string
  permission: number
}

interface EditMemberProps {
  show: boolean
  showModal: (show: boolean) => void
  data: Member
}

const Permission: IOption[] = [
  { id: 0, label: 'Can View' },
  { id: 1, label: 'Full Access' },
]

const EditMember: FC<EditMemberProps> = ({ show, showModal, data }) => {
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [permission, setPermission] = useState<IOption>()

  useEffect(() => {
    setSelectedImage(data?.avatar)
    setPermission(Permission[data?.permission])
  }, [data])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setSelectedImage(base64String!.toString())
    }
    reader.readAsDataURL(file)
  }

  const changePermisson = (value: IOption) => {
    setPermission(value)
  }

  return (
    <Modal isOpen={show} onClose={() => showModal(show)}>
      <div className="flex flex-col p-6 w-[810px] max-sm:w-[335px] max-sm:p-4">
        <div className="flex flex-row justify-between w-full">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Edit member
          </span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={() => showModal(show)}
          >
            <Cross />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-8 max-sm:gap-6 max-sm:mt-6">
          <div className="flex flex-row w-full max-sm:flex-col max-sm:gap-3">
            <span className="w-[200px] text-sm font-medium text-white">
              Avatar
            </span>
            <div className="flex flex-col items-start w-full 2xl:ml-3">
              <Avatar
                src={selectedImage}
                alt={''}
                width={64}
                height={64}
                border
                isHuman={true}
                badgeIcon="icon"
                onClickBadge={handleImageChange}
                badgeHeight={6}
                badgeWidth={6}
              />
            </div>
          </div>
          <div className="flex flex-row w-full max-sm:flex-col max-sm:gap-3">
            <span className="w-[200px] text-sm font-medium text-white">
              Name
            </span>
            <div className="flex flex-col w-full gap-4 2xl:ml-3 max-sm:gap-2">
              <Input className="w-full" value={data?.name} disabled />
            </div>
          </div>
          <div className="flex flex-row w-full max-sm:flex-col max-sm:gap-3">
            <span className="w-[200px] text-sm font-medium text-white">
              Email
            </span>
            <div className="flex flex-col w-full gap-4 2xl:ml-3 max-sm:gap-2">
              <Input className="w-full" value={data?.email} disabled />
            </div>
          </div>
          <div className="flex flex-row w-full max-sm:flex-col max-sm:gap-3">
            <span className="w-[200px] text-sm font-medium text-white">
              Permission
            </span>
            <div className="flex flex-col w-full gap-4 2xl:ml-3 max-sm:gap-2">
              <Select
                className="w-full"
                options={Permission}
                value={permission!}
                onChange={(value) => {
                  changePermisson(value)
                }}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="flex justify-end w-full 2xl:mt-4">
            <Button text={'Save'} variant={'gradient'} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditMember
