import { FC, useState, Fragment, useEffect } from 'react'
import DataTable from '@/common/components/DataTable'
import Avatar from '@/common/elements/Avatar'
import { Spread, Plus } from '@/common/components/Icons'
import DropdownMenu from '@/common/components/DropdownMenu'
import Button from '@/common/elements/Button'
import { usePopup } from '@/common/hooks/usePopup'
import { ImageUrl, ROLE } from '@/common/utils/constants'
import api from '@/api'
import { IUser } from '@/interfaces'
import AddMember from './AddMember'
import EditMember from './EditMember'
import { capitalize } from '@/common/utils'
import { useNotifications } from '@/hooks/useNotifications'
import { useUserStore } from '@/common/stores/userStore'

const MembersTable: FC = () => {
  const [showAddMember, setShowAddMember] = useState(false)
  const [showEditMember, setShowEditMember] = useState(false)
  const [user] = useUserStore((state) => [state.user])
  const [currentUser, setCurrentUser] = useState<IUser>()
  const { showConfirm, setIsConfirming, hideConfirm } = usePopup()
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setLoading] = useState(true)
  const { addNotification } = useNotifications()

  useEffect(() => {
    api.users.getUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  const showAddMemberModal = () => {
    setShowAddMember(!showAddMember)
  }

  const showEditMemberModal = (data: IUser) => {
    setCurrentUser(data)
    setShowEditMember(!showEditMember)
  }

  const removeMember = (userid: string) => {
    showConfirm({
      title: 'Remove this member?',
      confirmText: 'Remove',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setIsConfirming(true)
        api.users
          .deleteUser(userid)
          .then(() => {
            setUsers(users.filter((user) => user.id !== userid))
            addNotification({
              text: 'Remove member success.',
              type: 'Success',
            })

            hideConfirm()
            setIsConfirming(false)
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

  return (
    <Fragment>
      <div className="flex flex-row justify-between max-sm:flex-col max-sm:gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Manage Members
          </span>
          <span className="mt-2 text-sm font-normal text-gray-300">
            Invite your coworkers and set their access level.
          </span>
        </div>
        {user?.role !== ROLE.MANAGER && user?.role !== ROLE.VIEWER && (
          <div className="flex flex-row gap-3 max-sm:justify-between">
            <Button
              text="Add member"
              icon={<Plus />}
              onClick={showAddMemberModal}
              className="px-4"
            />
          </div>
        )}
      </div>
      <AddMember
        show={showAddMember}
        showModal={showAddMemberModal}
        onCreate={(newUser) => {
          setUsers([...users, newUser])
        }}
      />
      <div className="mt-4 max-sm:overflow-x-scroll scrollbar-hide">
        <DataTable
          data={users}
          loading={isLoading}
          columns={[
            {
              name: 'User',
              cell: (row) => (
                <div className="flex items-center gap-3 py-4">
                  <Avatar
                    src={`${ImageUrl}/${row.image}`}
                    alt={''}
                    width={40}
                    height={40}
                    border
                    isHuman={true}
                    className="min-w-[40px] min-h-[40px]"
                  />
                  <div className="flex flex-col gap-0.5 w-max">
                    <span className="text-sm font-medium text-white">
                      {row.name}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {row.email}
                    </span>
                  </div>
                </div>
              ),
            },
            {
              name: 'Role',
              cell: (row) => (
                <span className="text-white">{capitalize(row.role)}</span>
              ),
            },
            {
              name: 'Action',
              cell: (row) => (
                <DropdownMenu
                  align="right"
                  options={[
                    {
                      title: 'Edit',
                      action: () => {
                        showEditMemberModal(row)
                      },
                    },
                    {
                      title: 'Remove',
                      action: () => removeMember(row.id),
                      color: 'text-red',
                    },
                  ]}
                  icon={<Spread />}
                />
              ),
              right: true,
            },
          ]}
        />
      </div>
      <EditMember
        show={showEditMember}
        showModal={(show) => setShowEditMember(show)}
        data={currentUser!}
        onTransferOwnership={(from, to, role) => {
          setUsers(
            users.map((u) => {
              if (u.id === from) {
                return {
                  ...u,
                  role,
                }
              } else if (u.id === to) {
                return {
                  ...u,
                  role: ROLE.OWNER,
                }
              }
              return u
            })
          )
        }}
        onSave={(updatedRole) => {
          setUsers(
            users.map((user) =>
              user.id === currentUser?.id
                ? {
                    ...user,
                    role: updatedRole,
                  }
                : user
            )
          )
        }}
      />
    </Fragment>
  )
}

export default MembersTable
