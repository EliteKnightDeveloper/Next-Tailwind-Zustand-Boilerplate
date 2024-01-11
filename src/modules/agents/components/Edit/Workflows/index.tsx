import { ChangeEvent, FC, useState } from 'react'
import Input from '@/common/elements/Input'
import { Search, Spread } from '@/common/components/Icons'
import DataTable from '@/common/components/DataTable'
import DropdownMenu from '@/common/components/DropdownMenu'
import { usePopup } from '@/common/hooks/usePopup'
import { useRouter } from 'next/router'
import Toggle from '@/common/elements/Toggle'
import { debounce } from 'lodash'

interface WorkFlow {
  id: number
  name: string
  date: string
  status: boolean
}

const data: WorkFlow[] = [
  {
    id: 0,
    name: 'Workflow name',
    date: '21/06/23',
    status: true,
  },
  {
    id: 1,
    name: 'Workflow name',
    date: '21/06/23',
    status: false,
  },
  {
    id: 2,
    name: 'Workflow name',
    date: '21/06/23',
    status: false,
  },
]

const AgentWorkFlow: FC = () => {
  const [workflows, setWorkflows] = useState<WorkFlow[]>(data)
  const [text, setText] = useState('')

  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const router = useRouter()

  const debouncedSearch = debounce((query: string) => {
    setWorkflows(data.filter((item) => item.name.includes(query)))
  }, 500)

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    debouncedSearch(event.target.value)
  }

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

  const onToggle = (index: number) => {
    setWorkflows((prevItems) => {
      prevItems[index] = {
        ...prevItems[index],
        status: !prevItems[index].status,
      }
      return [...prevItems]
    })
  }

  return (
    <div className="flex flex-col w-full mt-5">
      <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
        <Input
          className="w-[340px]"
          placeholder="Search for workflow name"
          icon={<Search />}
          position="start"
          value={text}
          onChange={onSearchInputChange}
        />
      </div>
      <div className="mt-4 max-sm:overflow-x-scroll scrollbar-hide">
        <DataTable
          data={workflows}
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
              name: 'Active',
              cell: (row) => (
                <span className="text-sm font-normal text-white">
                  {row.status && (
                    <div className="flex flex-row items-center gap-4 w-max">
                      <Toggle
                        onToggle={() => {
                          onToggle(row.id)
                        }}
                        checked={row.status}
                      />
                      <span>Active</span>
                    </div>
                  )}
                  {!row.status && (
                    <div className="flex flex-row items-center gap-4 w-max">
                      <Toggle
                        onToggle={() => {
                          onToggle(row.id)
                        }}
                        checked={row.status}
                      />
                      <span>Inactive</span>
                    </div>
                  )}
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
                      action: () => router.push(`/agents/workflow/${row.id}`),
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

export default AgentWorkFlow
