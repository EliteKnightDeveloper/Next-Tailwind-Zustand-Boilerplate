import Avatar from '@/common/elements/Avatar'
import Button from '@/common/elements/Button'
import Input from '@/common/elements/Input'
import Modal from '@/common/elements/Modal'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import ChangePassword from './ChangePassword'
import { Cross } from '@/common/components/Icons'
import { IUser } from '@/interfaces'
import { useUserStore } from '@/common/stores/userStore'
import api from '@/api'
import { useNotifications } from '@/hooks/useNotifications'
import { ImageUrl } from '@/common/utils/constants'
import Select, { IOption } from '@/common/elements/Select'
import { getAllTimezonesFormatted } from '@/common/utils/timezone'

interface EditProfileProps {
  show: boolean
  showModal: (show: boolean) => void
  data: IUser
}
const EditProfile: FC<EditProfileProps> = ({ show, showModal, data }) => {
  const [selectedImage, setSelectedImage] = useState<string>(ImageUrl!)
  const [passwordModal, setPasswordModal] = useState(false)
  const [userName, setUserName] = useState(data.name)
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser])
  const { addNotification } = useNotifications()
  const [zones, setZones] = useState<string[]>([])
  const [timezones, setTimezones] = useState<IOption[]>([])
  const [timezone, setTimezone] = useState<IOption>({
    id: 0,
    label: 'Select Timezone',
  })

  useEffect(() => {
    const fetchTimezones = async () => {
      const allTimezones = getAllTimezonesFormatted()
      setZones(allTimezones)
    }
    fetchTimezones()
  }, [show])

  useEffect(() => {
    const mappedTimezones: IOption[] = zones.map((zone, index) => ({
      id: index,
      label: zone,
    }))
    setTimezones(mappedTimezones)
    if (mappedTimezones.length > 0) {
      setTimezone(mappedTimezones[0])
    }
  }, [zones])

  const showPasswordModal = () => {
    setPasswordModal(!passwordModal)
  }

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

  const onchangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
    setUser({ ...user!, name: event.target.value })
  }

  const onUpdateProfile = () => {
    api.users
      .updateUser(user!.id, user!)
      .then((respose) => {
        setUser(null)
        setUserName('')
        setUser(respose)
        addNotification({
          type: 'Success',
          text: 'User Update Success',
        })
      })
      .catch((error) => {
        addNotification({
          type: 'Fail',
          text: 'User Update Fail',
        })
      })
    showModal(show)
  }

  const setUserTimezone = (value: IOption) => {
    setTimezone(value)
    setUser({ ...user!, timezone: value.id.toString() })
  }

  return (
    <Modal isOpen={show} onClose={() => showModal(show)}>
      <div className="flex flex-col p-6 w-[810px] max-sm:w-[335px] max-sm:p-4">
        <div className="flex flex-row justify-between w-full">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Edit Profile
          </span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={() => showModal(show)}
          >
            <Cross />
          </div>
        </div>
        <div className="flex flex-row justify-start mt-8 max-sm:flex-col max-sm:gap-3 max-sm:mt-6">
          <span className="flex font-medium text-gray-100 text-sm w-[200px]">
            Avatar
          </span>
          <div className="flex flex-col items-start w-full">
            <Avatar
              src={selectedImage}
              height={64}
              width={64}
              badgeWidth={6}
              badgeHeight={6}
              alt={''}
              badgeIcon="icon"
              border
              isHuman={true}
              onClickBadge={handleImageChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-start mt-4 max-sm:flex-col max-sm:gap-3 max-sm:mt-6">
          <span className="flex font-medium text-gray-100 text-sm w-[200px]">
            User name
          </span>
          <Input
            className="w-full"
            value={userName}
            onChange={onchangeUserName}
          />
        </div>
        <div className="flex flex-row justify-start mt-4 max-sm:flex-col max-sm:gap-3 max-sm:mt-6">
          <span className="flex font-medium text-gray-100 text-sm w-[200px]">
            Name
          </span>
          <Input className="w-full" value={data.name} disabled />
        </div>
        <div className="flex flex-row justify-start mt-4 max-sm:flex-col max-sm:gap-3 max-sm:mt-6">
          <span className="flex font-medium text-gray-100 text-sm w-[200px]">
            Email
          </span>
          <Input className="w-full" value={data.email} disabled />
        </div>
        <div className="flex flex-row justify-start mt-4 max-sm:flex-col max-sm:gap-3 max-sm:mt-6">
          <span className="flex font-medium text-gray-100 text-sm w-[200px]">
            Password
          </span>
          <Input className="w-full" value={''} disabled />
        </div>
        {/* <div className="flex flex-row justify-start mt-4 max-sm:flex-col max-sm:gap-3 max-sm:mt-6">
          <span className="flex font-medium text-gray-100 text-sm w-[200px]">
            Timezone
          </span>
          <Select
            options={timezones}
            value={timezone!}
            onChange={(value) => {
              setUserTimezone(value)
            }}
            className="w-full"
            isSearchable
          />
        </div> */}
        <div className="flex flex-row justify-start mt-10 max-sm:flex-col max-sm:gap-3 max-sm:mt-6">
          <span className="flex font-medium text-gray-100 text-sm w-[200px]" />
          <div className="flex flex-row justify-end w-full gap-4">
            <Button
              text="Change password"
              variant="solid"
              onClick={showPasswordModal}
            />
            <Button text="Save" variant="gradient" onClick={onUpdateProfile} />
          </div>
          <ChangePassword show={passwordModal} showModal={showPasswordModal} />
        </div>
      </div>
    </Modal>
  )
}

export default EditProfile
