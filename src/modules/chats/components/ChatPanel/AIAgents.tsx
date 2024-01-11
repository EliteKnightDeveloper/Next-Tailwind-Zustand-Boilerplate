import { FC, useState, useMemo } from 'react'
import Input from '@/common/elements/Input'
import AgentCard, { AgentCardProps } from './AgentCard'
import Button from '@/common/elements/Button'
import AgentLabel from './AgentLabel'
import { Search } from '@/common/components/Icons'
import { ImageUrl } from '@/common/utils/constants'

const defaultAgents: AgentCardProps[] = [
  {
    id: '1',
    name: 'Olivia',
    title: 'HR Manager',
    description: 'Streamline HR operations and ensure compliance.',
    image: ImageUrl!,
    checked: false,
  },
  {
    id: '2',
    name: 'Ben',
    title: 'HR Manager',
    description: 'Streamline HR operations and ensure compliance.',
    image: ImageUrl!,
    checked: false,
  },
  {
    id: '3',
    name: 'Emily',
    title: 'HR Manager',
    description: 'Streamline HR operations and ensure compliance.',
    image: ImageUrl!,
    checked: false,
  },
  {
    id: '4',
    name: 'Olivia',
    title: 'HR Manager',
    description: 'Streamline HR operations and ensure compliance.',
    image: ImageUrl!,
    checked: false,
  },
  {
    id: '5',
    name: 'Ben',
    title: 'HR Manager',
    description: 'Streamline HR operations and ensure compliance.',
    image: ImageUrl!,
    checked: false,
  },
  {
    id: '6',
    name: 'Emily',
    title: 'HR Manager',
    description: 'Streamline HR operations and ensure compliance.',
    image: ImageUrl!,
    checked: false,
  },
]

interface AIAgentsProps {
  onAddAgents: () => void
}

const AIAgents: FC<AIAgentsProps> = ({ onAddAgents }) => {
  const [agents, setAgents] = useState(defaultAgents)
  const selectedAgents = useMemo(
    () => agents.filter((agent) => agent.checked),
    [agents]
  )

  const toggle = (id: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              checked: !agent.checked,
            }
          : agent
      )
    )
  }

  return (
    <div className="w-full">
      <div className="w-[40%]">
        <Input
          placeholder="Search agent name, role"
          className="w-full"
          icon={<Search />}
          position="start"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-8 h-[350px] overflow-y-auto scrollbar-hide">
        {agents.map((agent, index) => (
          <div
            onClick={() => {
              toggle(agent.id)
            }}
            key={index}
          >
            <AgentCard {...agent} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="flex gap-8">
          {selectedAgents.length !== 0 && (
            <span className="flex items-center text-white">
              Added ({selectedAgents.length})
            </span>
          )}
          <div className="flex gap-4">
            {selectedAgents.map((agent, index) => (
              <AgentLabel
                name={agent.name}
                image={ImageUrl + '/' + agent.image}
                key={index}
                onRemove={() => {
                  toggle(agent.id)
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <Button text="Add to Chat" onClick={onAddAgents} />
        </div>
      </div>
    </div>
  )
}

export default AIAgents
