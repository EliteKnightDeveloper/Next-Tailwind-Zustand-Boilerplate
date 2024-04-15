import { FC, useEffect, useState } from 'react'
import { Quote } from '@/common/components/Icons'
import Progress from './Progress'
import PieChart from './PieChart'
import api from '@/api'
import Select, { IOption } from '@/common/elements/Select'
import Tooltip from '@/common/elements/Tooltip'

const pieChartData = {
  datasets: [
    {
      data: [37.5, 25, 25, 12.5, 12.5],
      backgroundColor: ['#655cfe', '#b45bdd', '#a457f9', '#c292ff', '#8fb1ff'],
      content: [
        'Personal Development',
        'Career Advice',
        'Leadership Advice',
        'Book-Specific Questions',
        'Book-Specific Questions',
      ],
      borderWidth: 0.1,
    },
  ],
}

const TQA: FC = () => {
  const [agents, setAgents] = useState<IOption[]>([])
  const [agent, setAgent] = useState<IOption>({
    id: 0,
    label: 'Select Agent',
  })

  useEffect(() => {
    api.agents
      .getAllAgents()
      .then((response) => {
        const mappedAgents = response.map((agent) => ({
          id: agent.id,
          label: agent.name,
          value: agent.id,
        }))
        setAgents(mappedAgents)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="flex flex-col w-auto h-full gap-6 p-6 bg-black rounded-xl form-container max-sm:p-3">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row items-center w-full gap-3">
          <span className="text-xl font-semibold text-white max-sm:text-base">
            Top Questions Asked
          </span>
          <Tooltip
            description={'Get real-time insights into AI assistant activity.'}
          >
            <Quote />
          </Tooltip>
        </div>
        <Select
          options={agents}
          value={agent!}
          onChange={(value) => {
            setAgent(value)
          }}
          className="w-[150px]"
        />
      </div>
      <div className="flex flex-row items-center w-full gap-10 px-6 py-4 max-sm:flex-col">
        <div className="flex items-center justify-center max-sm:w-full h-[300px] w-[300px]">
          <PieChart data={pieChartData} />
        </div>
        <div className="flex flex-col w-full gap-5">
          {pieChartData.datasets[0].data.map((_, index) => (
            <Progress
              content={pieChartData.datasets[0].content[index]}
              percent={pieChartData.datasets[0].data[index]}
              background={pieChartData.datasets[0].backgroundColor[index]}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold text-white ">AI Summary</span>
        <span className="text-sm font-medium text-gray-400 ">
          Here is a text to help explain to the user more clearly what this
          means.
        </span>
      </div>
    </div>
  )
}

export default TQA
