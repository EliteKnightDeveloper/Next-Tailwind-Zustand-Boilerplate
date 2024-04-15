import { FC, Fragment, useEffect, useState } from 'react'
import DataTable from '@/common/components/DataTable'
import Input from '@/common/elements/Input'
import { Search } from '@/common/components/Icons'
import api from '@/api'
import Select, { IOption } from '@/common/elements/Select'
import { useRouter } from 'next/router'

interface Escalations {
  id: number
  customer: string
  owner: string
  channel: string
  name: string
  time: string
  credit: string
  reason: string
  response: string
  chatroomID: number
}

const data: Escalations[] = [
  {
    id: 0,
    customer: 'Tran@azara.ai',
    owner: 'Owner',
    channel: 'Email',
    name: 'Tran',
    time: '5 mins ago',
    credit: '200',
    reason: 'Keywords',
    response: 'Please reach out to azara.support',
    chatroomID: 3,
  },
]

const Escalations: FC = () => {
  const [logs, setLogs] = useState<Escalations[]>(data)
  const [agents, setAgents] = useState<IOption[]>([])
  const [agent, setAgent] = useState<IOption>({
    id: 0,
    label: 'Select Agent',
  })

  const router = useRouter()

  const toChatPage = (chatroomID: number) => {
    router.push(`/chat/${chatroomID}`, undefined, { shallow: true })
  }

  useEffect(() => {
    api.agents
      .getAllAgents()
      .then((response) => {
        const mappedAgents = response
          .filter((agent) => {
            return agent.deployed === true
          })
          .map((agent) => ({
            id: agent.id,
            label: agent.name,
            value: agent.id,
          }))
        if (mappedAgents.length === 0) {
          setAgents([{ id: -1, label: 'No Deployed Agent', value: 0 }])
          setAgent({ id: -1, label: 'No Deployed Agent', value: 0 })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <Fragment>
      <div className="flex flex-row items-center justify-center gap-4 mt-6">
        <Select
          options={agents}
          value={agent!}
          onChange={(value) => {
            setAgent(value)
          }}
          className="w-[250px]"
        />
        <Input
          className="w-full"
          icon={<Search />}
          position="start"
          placeholder="Search for escalations"
        />
      </div>
      <div className="flex flex-col w-full mt-6 max-sm:overflow-x-scroll scrollbar-hide">
        <DataTable
          data={logs}
          columns={[
            {
              name: 'Customer',
              cell: (row) => (
                <span
                  className="text-sm font-semibold text-white"
                  onClick={() => toChatPage(row.chatroomID)}
                >
                  {row.customer}
                </span>
              ),
            },
            {
              name: 'Owner',
              cell: (row) => (
                <span className="text-sm font-normal text-white">
                  {row.owner}
                </span>
              ),
            },
            {
              name: 'Channel',
              cell: (row) => (
                <span className="text-sm font-normal text-neon-100">
                  {row.channel}
                </span>
              ),
            },
            {
              name: 'Agent Name',
              cell: (row) => (
                <span className="text-sm font-normal text-white">
                  {row.name}
                </span>
              ),
            },
            {
              name: 'Interaction Time',
              cell: (row) => (
                <span className="text-sm font-normal text-white">
                  {row.time}
                </span>
              ),
            },
            {
              name: 'Total Credit Used',
              cell: (row) => (
                <span className="text-sm font-normal text-white">
                  {row.credit}
                </span>
              ),
            },
            {
              name: 'Reason',
              cell: (row) => (
                <span className="text-sm font-semibold text-white underline">
                  {row.reason}
                </span>
              ),
            },
            {
              name: 'Response',
              cell: (row) => (
                <span className="text-sm font-normal text-white">
                  {row.response}
                </span>
              ),
            },
          ]}
        />
      </div>
    </Fragment>
  )
}

export default Escalations
