import { FC, useState } from 'react'
import Input from '@/common/elements/Input'
import { Search, Spread } from '@/common/components/Icons'
import DataTable from '@/common/components/DataTable'
import DropdownMenu from '@/common/components/DropdownMenu'
import { usePopup } from '@/common/hooks/usePopup'
import { useRouter } from 'next/router'

interface WorkFlow {
  id: number
  name: string
  date: string
  status: boolean
}

const data: WorkFlow[] = [
  {
    id: 1,
    name: 'Workflow name',
    date: '21/06/23',
    status: true,
  },
  {
    id: 2,
    name: 'Workflow name',
    date: '21/06/23',
    status: false,
  },
  {
    id: 3,
    name: 'Workflow name',
    date: '21/06/23',
    status: false,
  },
]

const AllWorkflows: FC = () => {
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const router = useRouter()

  const removeWorkFlow = (id: number) => {
    showConfirm({
      title: 'Remove this workflow?',
      confirmText: 'Remove',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        hideConfirm()
      },
    })
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
        <Input
          className="w-[340px]"
          placeholder="Search for workflow name"
          icon={<Search />}
          position="start"
        />
        <div className="flex items-end">
          <span className="text-xs font-normal text-gray-400">workflows</span>
        </div>
      </div>
      <div className="mt-4 max-sm:overflow-x-scroll scrollbar-hide">
        <DataTable
          data={data}
          columns={[
            {
              name: 'Workflow Name',
              cell: (row) => (
                <div className="flex justify-between gap-3">
                  <span className="text-sm font-normal text-white">
                    {row.name}
                  </span>
                </div>
              ),
            },
            {
              name: 'Modified date',
              cell: (row) => <span className="text-white">{row.date}</span>,
            },
            {
              name: 'Status',
              cell: (row) => (
                <div className="flex flex-row items-center gap-2">
                  {row.status ? (
                    <div className="rounded-full w-2.5 h-2.5 bg-neon-100" />
                  ) : (
                    <div className="rounded-full w-2.5 h-2.5 bg-red" />
                  )}
                  <span>
                    {row.status ? (
                      <span className="text-sm font-normal text-white">
                        Active
                      </span>
                    ) : (
                      <span className="text-sm font-normal text-gray-400">
                        Inactive
                      </span>
                    )}
                  </span>
                </div>
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
                      action: () =>
                        router.push(`/workflows/edit/${row.id}`, undefined, {
                          shallow: true,
                        }),
                    },
                    {
                      title: 'Duplicate',
                      action: () => removeWorkFlow(row.id),
                    },
                    {
                      title: 'Remove',
                      action: () => removeWorkFlow(row.id),
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
    </div>
  )
}

export default AllWorkflows
