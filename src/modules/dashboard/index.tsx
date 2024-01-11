import { FC, Fragment, useState } from 'react'
import ReactPlayer from 'react-player'
import { Quote } from '@/common/components/Icons'
import Members from './components/Member'
import CreditChart from './components/CreditChart'
import AgentEngagment from './components/AgentEngagment'
import Select, { IOption } from '@/common/elements/Select'
import TQA from './components/TQA'
import RecentChat from './components/RecentChat'
import Tooltip from '@/common/elements/Tooltip'

const Times: IOption[] = [
  {
    id: 0,
    label: '3 Days',
    value: 3,
  },
  {
    id: 1,
    label: '7 Days',
    value: 7,
  },
  {
    id: 2,
    label: '30 Days',
    value: 30,
  },
]

const data: IOption[] = [
  {
    id: 0,
    label: 'Tran',
    value: 0,
  },
]

const Dashboard: FC = () => {
  const [tab, setTab] = useState(3)
  const [seats, setSeats] = useState<IOption[]>(data)
  const [seat, setSeat] = useState<IOption>(data[0])

  const [times, setTimes] = useState<IOption[]>(Times)
  const [time, setTime] = useState<IOption>(Times[0])

  const changeSeatSelect = (value: IOption) => {
    setSeat(value)
  }

  const changeTimeSelect = (value: IOption) => {
    setTime(value)
    setTab(value.value!)
  }

  return (
    <Fragment>
      <div className="flex flex-col px-6 py-8 max-sm:px-5 max-sm:py-2">
        <div className="flex flex-row w-full gap-6 max-sm:flex-col max-sm:gap-4">
          <div className="flex flex-col flex-initial w-full p-6 bg-black rounded-xl form-container max-sm:w-full max-sm:p-3">
            <div className="flex flex-row items-start justify-between w-full max-sm:flex-col max-sm:gap-4">
              <div className="flex flex-row items-center gap-3">
                <span className="text-xl font-semibold text-white max-sm:text-base">
                  Credit Usage
                </span>
                <Tooltip
                  description={
                    'Monitor your credit usage, avoid fees, and stay financially informed.'
                  }
                >
                  <Quote />
                </Tooltip>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-gray-100">
                    User Seat
                  </span>
                  <Select
                    options={seats}
                    value={seat}
                    onChange={(value) => {
                      changeSeatSelect(value)
                    }}
                    className="w-[100px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-gray-100">
                    Time Range
                  </span>
                  <Select
                    options={times}
                    value={time}
                    onChange={(value) => {
                      changeTimeSelect(value)
                    }}
                    className="w-[100px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-2 xl:px-3 xl:py-4 h-[300px] z-10">
              <CreditChart period={tab} />
            </div>
          </div>
        </div>
        <AgentEngagment />
        <div className="flex flex-row w-full h-full gap-6 mt-3 max-sm:flex-col">
          <div className="flex flex-col flex-initial w-[70%]">
            <TQA />
          </div>
          <div className="flex flex-col flex-initial w-[30%]">
            <RecentChat />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
