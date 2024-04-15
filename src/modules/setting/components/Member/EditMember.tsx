import { FC, useEffect, useState } from 'react'
import { Cross } from '@/common/components/Icons'
import Avatar from '@/common/elements/Avatar'
import Modal from '@/common/elements/Modal'
import Select, { IOption } from '@/common/elements/Select'
import Button from '@/common/elements/Button'
import { IUser } from '@/interfaces'
import { ImageUrl, ROLE } from '@/common/utils/constants'
import api from '@/api'
import { useNotifications } from '@/hooks/useNotifications'
import { usePopup } from '@/common/hooks/usePopup'
import { useUserStore } from '@/common/stores/userStore'

interface EditMemberProps {
  show: boolean
  showModal: (show: boolean) => void
  data: IUser
  onSave: (updatedRole: ROLE) => void
  onTransferOwnership: (from: string, to: string, role: ROLE) => void
}

const EditMember: FC<EditMemberProps> = ({
  show,
  showModal,
  data,
  onSave,
  onTransferOwnership,
}) => {
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser])
  const permissions: IOption[] = [
    { id: 0, label: 'Owner', value: ROLE.OWNER },
    { id: 1, label: 'Admin', value: ROLE.ADMIN },
    { id: 2, label: 'Manager', value: ROLE.MANAGER },
    { id: 3, label: 'Viewer', value: ROLE.VIEWER },
  ]
  const [permission, setPermission] = useState<IOption>(permissions[0])
  const { addNotification } = useNotifications()
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()

  const changePermisson = (value: IOption) => {
    setPermission(value)
  }

  const onClickTransferOwnerShip = () => {
    showConfirm({
      title: 'Are you sure you want to transfer the owner role?',
      type: 'Normal',
      confirmText: 'Transfer',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setIsConfirming(true)
        api.users
          .transferOwnership(data.id)
          .then(() => {
            setIsConfirming(false)
            hideConfirm()
            showModal(false)
            onTransferOwnership(user?.id!, data.id, data.role)

            setUser({
              ...user!,
              role: data.role,
            })
            addNotification({
              text: 'Transfer ownership success.',
              type: 'Success',
            })
          })
          .catch((err) => {
            addNotification({
              text: err.response.data.message,
              type: 'Fail',
            })
            setIsConfirming(false)
          })
      },
    })
  }

  useEffect(() => {
    if (!data) return
    setPermission(permissions.find((p) => p.value === data.role)!)
  }, [data])

  const onClickSave = () => {
    setLoading(true)
    api.users
      .updateUser(data.id, {
        role: permission.value as ROLE,
      })
      .then(() => {
        addNotification({
          text: 'Update role success.',
          type: 'Success',
        })
        setLoading(false)
        showModal(false)
        onSave(permission.value as ROLE)
      })
      .catch((err) => {
        addNotification({
          text: err.response.data.message,
          type: 'Fail',
        })
        setLoading(false)
      })
  }

  return (
    <Modal isOpen={show} onClose={() => showModal(false)}>
      <div className="flex flex-col p-6 w-[610px] max-sm:w-[335px] max-sm:p-4">
        <div className="flex flex-row justify-between w-full">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Edit member
          </span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={() => showModal(false)}
          >
            <Cross />
          </div>
        </div>
        <div className="flex gap-3 items-center mt-8">
          <Avatar
            src={`${ImageUrl}/${data?.image}`}
            alt={''}
            width={64}
            height={64}
            border
            isHuman={true}
            badgeHeight={6}
            badgeWidth={6}
          />
          <div className="flex flex-col gap-0.5">
            <h3 className="text-white font-medium text-sm">{data?.name}</h3>
            <h3 className="text-slate-500 text-sm">{data?.email}</h3>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-6 max-sm:gap-6 max-sm:mt-4">
          <div className="flex flex-col w-full gap-2">
            <span className="text-sm text-white">Permission</span>
            <div className="flex flex-col w-full gap-4 max-sm:gap-2">
              <Select
                className="w-full"
                options={permissions}
                value={permission}
                onChange={(value) => {
                  changePermisson(value)
                }}
                isSearchable={false}
              />
            </div>
          </div>
          {user?.role === ROLE.OWNER && (
            <div className="w-full">
              <button
                className="text-neon-100 text-sm pl-1"
                onClick={onClickTransferOwnerShip}
              >
                Transfer ownership
              </button>
            </div>
          )}
          <div className="flex justify-end w-full mt-3">
            <Button
              text={'Save'}
              variant={'gradient'}
              onClick={onClickSave}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditMember
