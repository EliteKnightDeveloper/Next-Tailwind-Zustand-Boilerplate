import { FC, useState, Fragment } from 'react'
import DataTable from '@/common/components/DataTable'
import Avatar from '@/common/elements/Avatar'
import { Spread, Plus } from '@/common/components/Icons'
import DropdownMenu from '@/common/components/DropdownMenu'
import Button from '@/common/elements/Button'
import { usePopup } from '@/common/hooks/usePopup'
import AddMember from './AddMember'
import EditMember from './EditMember'
import { HUMAN_AVATARS } from '@/common/utils/constants'

interface Member {
  id: number
  avatar: string
  name: string
  email: string
  activeAgents: number
  permission: number
}

const data: Member[] = [
  {
    id: 1,
    name: 'James Lee',
    email: 'jameslee@gmail.com',
    permission: 0,
    activeAgents: 3,
    avatar: HUMAN_AVATARS[0],
  },
  {
    id: 2,
    name: 'Sarah',
    email: 'sarah@gmail.com',
    permission: 1,
    activeAgents: 3,
    avatar: HUMAN_AVATARS[3],
  },
  {
    id: 3,
    name: 'Tran',
    email: 'tran@gmail.com',
    permission: 1,
    activeAgents: 3,
    avatar: HUMAN_AVATARS[1],
  },
]

const MembersTable: FC = () => {
  const [showAddMember, setShowAddMember] = useState(false)
  const [showEditMember, setShowEditMember] = useState(false)
  const [editdata, setEditData] = useState<Member>()
  const [members, setMembers] = useState<Member[]>(data)
  const { showConfirm, hideConfirm } = usePopup()

  const showAddMemberModal = () => {
    setShowAddMember(!showAddMember)
  }

  const showEditMemberModal = (data: Member) => {
    setEditData(data)
    setShowEditMember(!showEditMember)
  }

  const removeMember = () => {
    showConfirm({
      title: 'Remove this member?',
      confirmText: 'Remove',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        hideConfirm()
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
        <div className="flex flex-row gap-3 max-sm:justify-between">
          <Button
            text="Add member"
            icon={<Plus />}
            onClick={showAddMemberModal}
          />
        </div>
      </div>
      <AddMember show={showAddMember} showModal={showAddMemberModal} />
      <div className="mt-4 max-sm:overflow-x-scroll scrollbar-hide">
        <DataTable
          data={members}
          columns={[
            {
              name: 'User',
              cell: (row) => (
                <div className="flex items-center gap-3 py-4">
                  <Avatar
                    src={row.avatar}
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
              name: 'Active Agents',
              cell: (row) => (
                <span className="text-white">{row.activeAgents}</span>
              ),
            },
            {
              name: 'Permission',
              cell: (row) => (
                <span className="text-white">
                  {row.permission === 0 ? 'Can View' : 'Full Access'}
                </span>
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
                      action: () => showEditMemberModal(row),
                    },
                    {
                      title: 'Remove',
                      action: removeMember,
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
        showModal={() => showEditMemberModal(editdata!)}
        data={editdata!}
      />
    </Fragment>
  )
}

export default MembersTable
