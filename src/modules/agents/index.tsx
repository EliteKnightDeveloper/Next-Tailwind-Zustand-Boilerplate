import { FC } from 'react'
import Button from '@/common/elements/Button'
import TabWidget from '@/common/elements/TabWidget'
import AgentsByPlan from './components/AgentsByPlan'
import { useRouter } from 'next/router'

const Agents: FC = () => {
  const router = useRouter()
  const onCreateAgent = () => {
    router.push('/agents/create', undefined, { shallow: true })
  }

  return (
    <div className="flex flex-col px-6 py-8 min-full-height max-sm:px-5 max-sm:py-2">
      <span className="flex justify-center z-[100] text-4xl font-semibold text-center text-white max-sm:text-xl">
        Get started with an Agent!
      </span>
      <span className="flex justify-center z-[100] mt-6 text-lg text-center text-gray-100 max-sm:text-base max-sm:mt-2">
        Select from Industry expert roles. Simply click on an expert to chat.
      </span>
      <div className="flex justify-center mt-6">
        <Button
          text="Create your agent"
          variant="solid"
          size="lg"
          onClick={onCreateAgent}
          className="z-10"
        />
      </div>
      <AgentsByPlan />
    </div>
  )
}

export default Agents
