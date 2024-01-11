import { FC, useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import TabWidget from '@/common/elements/TabWidget'
import { classNames } from '@/common/utils'
import { useThemeStore } from '@/common/stores/themeStore'
import { Collapse, Expand } from '@/common/components/Icons'
import Agent from './Agents'
import Documents from './Documents'
import Integrations from './Integrations'
import Settings from './Settings'
import WorkFlow from './Workflows'
import Chatbar from './Chatbar'
import api from '@/api'
import { IAgent } from '@/interfaces'
import MobileChatbar from './MobileChatbar'

const EditAgent: FC = () => {
  const router = useRouter()
  const { query } = router
  const [isChatbarOpened, isMobileChatbarOpened, setMobileChatbarOpened] =
    useThemeStore((state) => [
      state.isChatbarOpened,
      state.isMobileChatbarOpened,
      state.setMobileChatbarOpened,
    ])

  const [isLoading, setLoading] = useState(true)
  const [agent, setAgent] = useState<IAgent>()

  useEffect(
    () => {
      setLoading(true)
      api.agents.getAgent(query.id!.toString()).then((response) => {
        setAgent(response)
        setLoading(false)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query.id]
  )

  const setMobileChatbar = () => {
    setMobileChatbarOpened(!isMobileChatbarOpened)
  }

  return (
    <Fragment>
      <div className="flex flex-row justify-center max-sm:flex-col">
        <div
          className={classNames(
            'flex flex-row justify-between items-baseline w-full px-6 py-3 transition-all max-sm:px-5 max-sm:py-2 max-sm:items-start',
            isChatbarOpened ? 'pr-[420px] max-2xl:pr-[320px]' : 'pr-[90px]'
          )}
        >
          <div className="w-full sm:relative ">
            <div className="flex flex-col w-full max-sm:mt-4 max-sm:pb-20">
              <TabWidget
                tabs={[
                  {
                    title: 'Edit Agent',
                    content: <Agent agent={agent} isLoading={isLoading} />,
                  },
                  {
                    title: 'Documents',
                    content: <Documents />,
                  },
                  {
                    title: 'Integrations',
                    content: <Integrations />,
                  },
                  {
                    title: 'Workflows',
                    content: <WorkFlow />,
                  },
                  // {
                  //   title: 'Settings',
                  //   content: <Settings />,
                  // },
                ]}
                activeTab={0}
              />
            </div>
          </div>
        </div>
        <div
          className={classNames(
            isChatbarOpened ? 'w-[400px] max-2xl:w-[300px]' : 'w-[80px]',
            '-mr-0 fixed right-0 transition-all max-sm:hidden'
          )}
        >
          <Chatbar isLoading={isLoading} agent={agent} />
        </div>
        <div
          className={classNames(
            isMobileChatbarOpened
              ? 'fixed bottom-0 h-[calc(100%-6.9rem)]'
              : 'md:hidden flex flex-col fixed bottom-0 right-0 left-0 fit-content  overflow-y-scroll  scrollbar-hide max-sm:h-16 bg-gradient-to-r from-[#46577BCC] to-[#492D4DCC]',
            'flex flex-col justify-center items-center w-full z-[1000]'
          )}
        >
          {!isMobileChatbarOpened && (
            <div className="flex flex-row items-center justify-between w-full px-5">
              <span className="text-base font-semibold text-white">
                Chat with agent
              </span>
              <div>
                <button
                  className="p-2 text-gray-300 -rotate-90 bg-gray-500 rounded-xl"
                  onClick={setMobileChatbar}
                >
                  <Expand />
                </button>
              </div>
            </div>
          )}
          {isMobileChatbarOpened && (
            <div className="flex flex-row items-center justify-between w-full h-16 px-5 py-2 bg-[#0b0d0e] sm:hidden">
              <div className="flex flex-col">
                <span className="text-base font-semibold text-white">
                  {agent?.name}
                </span>
                <span className="text-base font-medium text-gray-300">
                  {agent?.role}
                </span>
              </div>
              <button
                className="p-2 text-white -rotate-90 bg-gray-500 hover:text-neon-100 rounded-xl"
                onClick={setMobileChatbar}
              >
                <Collapse />
              </button>
            </div>
          )}
          {isMobileChatbarOpened && (
            <MobileChatbar isLoading={isLoading} agent={agent} />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default EditAgent
