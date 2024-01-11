import { FC } from 'react'
import CountUp from 'react-countup'

interface AgentEngagmentCardProps {
  title: string
  num: number
  items: {
    title: string
    num: string
  }[]
}

const AgentEngagmentCard: FC<AgentEngagmentCardProps> = ({
  title,
  num,
  items,
}) => (
  <div className="flex flex-col items-center w-full p-8 bg-black rounded-xl package-card max-sm:p-4">
    <span className="text-sm font-medium text-white">{title}</span>
    <span className="mt-6 text-5xl font-semibold text-neon-100">
      <CountUp start={0} end={num} duration={5} />
    </span>
    <div className="flex flex-col items-center w-full gap-4 mt-12 max-sm:mt-4">
      {items.map((item, index) => {
        return (
          <div
            className="flex flex-row items-center justify-between w-full"
            key={index}
          >
            <span className="text-sm font-normal text-gray-700">
              {item.title}
            </span>
            <span className="text-sm font-medium text-white">
              {parseInt(item.num).toLocaleString()}
            </span>
          </div>
        )
      })}
    </div>
  </div>
)

export default AgentEngagmentCard
