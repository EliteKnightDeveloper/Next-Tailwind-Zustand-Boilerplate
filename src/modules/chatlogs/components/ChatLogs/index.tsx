import { FC, Fragment, useEffect, useState } from 'react'
import { Quote } from '@/common/components/Icons'
import Select, { IOption } from '@/common/elements/Select'
import MultiSelect, { MultiSelectOption } from '@/common/elements/MultiSelect'
import { Channels } from '@/common/utils/constants'
import DatePicker from '@/common/elements/DatePicker'
import moment from 'moment'
import { useRouter } from 'next/router'
import api from '@/api'
import Loading from '@/common/components/Loading'
import { useThemeStore } from '@/common/stores/themeStore'
import { useChatStore } from '@/common/stores/chatStore'
import { IChat } from '@/interfaces'
import { timeDifference } from '@/common/utils/date'
import { classNames } from '@/common/utils'

const Credits: IOption[] = [
  { id: 0, value: 0, label: 'All' },
  { id: 1, value: 1, label: '<50' },
  { id: 2, value: 2, label: '<100' },
  { id: 3, value: 3, label: '<200' },
]

const Times: IOption[] = [
  { id: 0, value: 0, label: 'All' },
  { id: 1, value: 1, label: '< 30 sec' },
  { id: 2, value: 2, label: '1-2 min' },
  { id: 3, value: 3, label: '3-5 min' },
  { id: 4, value: 4, label: '5-10 min' },
  { id: 5, value: 5, label: '> 10 min' },
]

const ChatLogs: FC = () => {
  const [logs, setLogs] = useState<IChat[]>([])
  const [channels, setChannels] = useState<MultiSelectOption[]>([])
  const [credit, setCredit] = useState<IOption>(Credits[0])
  const [time, setTime] = useState<IOption>(Times[0])
  const [startDate, setStartDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  )
  const [endDate, setEndDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  )
  const [agents, setAgents] = useState<IOption[]>([])
  const [agent, setAgent] = useState<IOption>({
    id: 0,
    label: 'Select Agent',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isAgent, setIsAgent] = useState(false)
  const [setChatLogBarCollapsed] = useThemeStore((state) => [
    state.setChatLogBarCollapsed,
  ])

  const [setChatroomID, setChatLog] = useChatStore((state) => [
    state.setChatroomID,
    state.setChatLog,
  ])

  const router = useRouter()
  const { query } = router

  const onStartDateChange = (date: Date) => {
    setStartDate(moment(date).format('YYYY-MM-DD'))
  }

  const onEndDateChange = (date: Date) => {
    setEndDate(moment(date).format('YYYY-MM-DD'))
  }

  useEffect(() => {
    if (channels.length > 0 && Number(agent.id) > -1) {
      setIsAgent(false)
      const channelList = channels.map((channel) => {
        const formattedLabel = channel?.label!.toString().replace(/\s/g, '')
        return formattedLabel
      })
      setIsLoading(true)
      api.chatLogs
        .getChatLogsByOwner(
          agent.id.toString(),
          startDate + ' ' + '00:00:00',
          endDate + ' ' + '23:59:59',
          channelList
        )
        .then((response) => {
          const result = response.filter((resp) => {
            return resp.messages.length > 0
          })
          setLogs(result)
          setIsLoading(false)
        })
        .catch((err) => {})
    }
  }, [agent, startDate, endDate, channels, time, credit])

  useEffect(() => {
    setChatroomID(0)
    setIsLoading(true)
    setLogs([])
    api.agents
      .getAgentsByOwner()
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
          setIsAgent(true)
        } else if (query.id !== '0') {
          const selectedAgent = mappedAgents.find(
            (agent) => agent.id === Number(query.id)
          )
          setAgent(selectedAgent!)
          setAgents(mappedAgents)
          setIsAgent(false)
        } else {
          setAgent(mappedAgents[0])
          setAgents(mappedAgents)
          setIsAgent(false)
        }
        setIsLoading(false)
      })
      .catch(() => {})
  }, [])

  const showChatHistory = (data: IChat) => {
    setChatLogBarCollapsed(true)
    setChatroomID(data.id)
    setChatLog(data)
  }

  return (
    <Fragment>
      <div className="flex w-full gap-6 mt-6 xl:flex-row max-sm:flex-col md:flex-col">
        <div className="flex flex-col gap-3 p-3 bg-black xl:w-1/2 2xl:w-1/3 md:w-full form-container h-fit max-sm:w-full">
          <span className="text-xl font-semibold text-white">Filter</span>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm font-medium text-gray-100">Agent</span>
              <Select
                options={agents}
                value={agent!}
                onChange={(value) => {
                  setAgent(value)
                }}
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm font-medium text-gray-100">
                Start Date
              </span>
              <DatePicker onChange={(date) => onStartDateChange(date)} />
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm font-medium text-gray-100">
                End Date
              </span>
              <DatePicker onChange={(date) => onEndDateChange(date)} />
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm font-medium text-gray-100">Channel</span>
              <MultiSelect
                options={Channels}
                placeholder="Select Channel"
                value={channels}
                onChange={(value) => {
                  setChannels(value)
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-100">
                Interaction Time
              </span>
              <Select
                options={Times}
                value={time}
                onChange={(value) => {
                  setTime(value)
                }}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-100">
                Credits Used
              </span>
              <Select
                options={Credits}
                value={credit}
                onChange={(value) => {
                  setCredit(value)
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3 p-3 bg-black form-container h-[80vh]">
          <div className="flex flex-row items-center gap-3">
            <span className="text-xl font-semibold text-white">
              Conversation
            </span>
            {/* <Quote /> */}
          </div>
          <div
            className={classNames(
              'z-10 flex flex-col  h-full gap-4 overflow-y-scroll scrollbar-hide',
              isAgent ? 'items-center justify-center' : ''
            )}
          >
            {logs.map((log, idx) => {
              return (
                <div
                  className="flex flex-col px-2 pt-2 pb-4 border-b border-b-gray-500 hover:bg-gray-500 hover:cursor-pointer hover:rounded-xl"
                  key={idx}
                  onClick={() => showChatHistory(log)}
                >
                  <div className="flex flex-row justify-between gap-4 max-sm:flex-col">
                    <div className="flex flex-col max-sm:gap-2">
                      <div className="flex flex-row items-start flex-1 gap-2">
                        <span className="text-sm font-medium text-white  min-w-[80px]">
                          Customer:
                        </span>
                        <span className="text-sm text-gray-700 font-noraml">
                          {log.messages[0]}
                        </span>
                      </div>
                      <div className="flex flex-row items-start flex-1 gap-2">
                        <span className="text-sm font-medium text-white  min-w-[80px]">
                          Agent:
                        </span>
                        <span className="text-sm text-gray-700 font-noraml">
                          {log.messages[1]}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-100 whitespace-pre max-sm:text-right font-noraml">
                      {timeDifference(log.end_time)}
                    </span>
                  </div>
                </div>
              )
            })}
            {isAgent && (
              <span className="text-lg font-semibold text-white">
                No Deployed Agents
              </span>
            )}
          </div>
        </div>
        {isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default ChatLogs
