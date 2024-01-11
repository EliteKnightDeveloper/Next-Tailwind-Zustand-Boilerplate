import { FC, useState } from 'react'
import Select, { IOption } from '@/common/elements/Select'
import { Times, Agents } from '@/common/utils/constants'
import { Quote } from '@/common/components/Icons'
import AgentEngagmentCard from './AgentEngagmentCard'
import MultiSelect, { MultiSelectOption } from '@/common/elements/MultiSelect'
import Tooltip from '@/common/elements/Tooltip'

const AgentEngagment: FC = () => {
  const [timeValue, setTimeValue] = useState<IOption>(Times[0])
  const [agents, setAgents] = useState<MultiSelectOption[]>([])
  const description1 = [
    {
      title: ' Interactions made by Agent',
      num: '1214',
    },
  ]
  const description2 = [{ title: '% engaged with Agent', num: '59%' }]
  const description3 = [{ title: 'Escalations made by Agent', num: '-635' }]

  const changeTimeSelect = (value: IOption) => {
    setTimeValue(value)
  }

  return (
    <div className="flex flex-col w-full gap-4 p-6 mt-8 bg-black rounded-xl form-container max-sm:mt-4 max-sm:p-3">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row gap-3 items-center">
          <span className="text-xl font-semibold text-white max-sm:text-base">
            Agent Engagement
          </span>
          <Tooltip
            description={'Discover what users are curious about the most.'}
          >
            <Quote />
          </Tooltip>
        </div>
        <div className="flex flex-row gap-4 max-sm:flex-col">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-100">
              Deployed Agents
            </span>
            <MultiSelect
              value={agents}
              options={Agents}
              onChange={(values) => {
                setAgents(values)
              }}
              placeholder="Select agents"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-100">
              Time Range
            </span>
            <Select
              options={Times}
              value={timeValue}
              onChange={(value) => {
                changeTimeSelect(value)
              }}
              className="w-[100px]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6 max-sm:flex-col max-sm:gap-4">
        <AgentEngagmentCard
          title={'Total Interactions'}
          num={9658}
          items={description1}
        />
        <AgentEngagmentCard
          title={'Agent Engagement'}
          num={5869}
          items={description2}
        />
        <AgentEngagmentCard
          title={'Total Escalations'}
          num={960}
          items={description3}
        />
      </div>
    </div>
  )
}

export default AgentEngagment
