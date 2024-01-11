import { FC } from 'react'
import Button from '@/common/elements/Button'
import WorkflowTable from './components/WorkflowTable'

const Worflows: FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 py-8 max-sm:px-5 max-sm:py-2">
      {/* <span className="flex justify-center z-[100] text-4xl font-semibold text-center text-white max-sm:text-xl">
        Workflows: Power Up Your Productivity
      </span>
      <span className="flex justify-center z-[100] mt-6 text-lg font-normal text-center text-white max-sm:text-base max-sm:mt-2">
        Everything is completely under your control.
      </span> */}
      <span className="flex z-[100] text-lg font-semibold text-white max-sm:text-base max-sm:mt-2">
        Agent Workflows
      </span>
      <span className="flex z-[100] text-sm font-normal text-white max-sm:text-base mt-2">
        Unleash your Agent with the power to access real-time information and
        seamlessly operate data.
      </span>
      <div className="relative w-full mt-6 max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:justify-center">
        <div className="top-0 right-0 2xl:absolute max-sm:flex max-sm:justify-center max-sm:items-center max-sm:w-full">
          <Button text="Add new workflow" variant="gradient" />
        </div>
        <div className="flex flex-col w-full">
          <WorkflowTable />
        </div>
      </div>
    </div>
  )
}

export default Worflows
