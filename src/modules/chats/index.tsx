import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useThemeStore } from '@/common/stores/themeStore'
import ChatPanel from './components/ChatPanel'
import AgentInfo from './components/AgentInfo'
import { classNames } from '@/common/utils'
import { IAgent } from '@/interfaces'
import api from '@/api'
import { Collapse, Expand } from '@/common/components/Icons'
import Avatar from '@/common/elements/Avatar'
import { ImageUrl } from '@/common/utils/constants'
import Mobile from './components/AgentInfo/Mobile'

const AgentChat: FC = () => {
  const [
    isProfilebarOpened,
    isMobileProfilebarCollapsed,
    setMobileProfilebarCollapsed,
  ] = useThemeStore((state) => [
    state.isProfilebarOpened,
    state.isMobileProfilebarCollapsed,
    state.setMobileProfilebarCollapsed,
  ])

  const [isLoading, setLoading] = useState(true)
  const [agentInfo, setAgentInfo] = useState<IAgent>({
    id: 0,
    image: '',
    objective: '',
    name: '',
    role: '',
    tone: '',
    archived: false,
    docs: [],
    examples: '',
    plan: '',
    welcome: '',
    user: 0,
    deployed: false,
    pinned: false,
  })

  const [messages, setMessages] = useState<string[]>([])
  const { query: queryParam } = useRouter()
  const [msgCounts, setMsgCounts] = useState(0)

  const setProfilebarOpened = () => {
    setMobileProfilebarCollapsed(!isMobileProfilebarCollapsed)
  }

  useEffect(() => {
    setLoading(true)
    api.chats.getMessages(queryParam.id as unknown as number).then((resp) => {
      setAgentInfo(resp.participants[0])
      setMessages(resp.chat.messages)
      setMsgCounts(resp.chat.messages.length)
      setLoading(false)
    })
  }, [queryParam.id])

  return (
    <div className="flex w-full max-sm:flex-col max-sm:h-full">
      <div className="flex-1 max-sm:pb-[75px]">
        <ChatPanel
          agent={agentInfo}
          isLoading={isLoading}
          defaultMessages={messages}
        />
      </div>
      <div
        className={classNames(
          isProfilebarOpened ? 'w-[400px]' : 'w-[80px]',
          'xl:full-height overflow-y-auto scrollbar-hide max-sm:hidden'
        )}
      >
        <AgentInfo agent={agentInfo} isLoading={isLoading} msgs={msgCounts} />
      </div>
      <div
        className={classNames(
          'flex flex-col fixed bottom-0 right-0 left-0 fit-content  overflow-y-scroll h-[calc(100%-6.9rem)] scrollbar-hide z-[100]',
          isMobileProfilebarCollapsed ? 'max-sm:h-[75px]' : '',
          'sm:hidden'
        )}
      >
        <div className="flex flex-row items-center justify-between px-5 py-3 bg-[#0B0C0E]">
          <div className="flex flex-row items-center gap-2">
            <Avatar
              src={ImageUrl + '/' + agentInfo.image}
              alt={''}
              width={52}
              height={52}
              isHuman={false}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {agentInfo.name}
              </span>
              <span className="text-sm font-medium text-gray-200">
                {agentInfo.role}
              </span>
            </div>
          </div>
          <div>
            <button
              className="p-2 text-gray-300 -rotate-90 bg-gray-600 rounded-xl"
              onClick={setProfilebarOpened}
            >
              {isMobileProfilebarCollapsed ? (
                <div className="text-white hover:text-neon-100">
                  <Expand />
                </div>
              ) : (
                <div className="text-white hover:text-neon-100">
                  <Collapse />
                </div>
              )}
            </button>
          </div>
        </div>
        {!isMobileProfilebarCollapsed && (
          <Mobile agent={agentInfo} isLoading={isLoading} />
        )}
      </div>
    </div>
  )
}

export default AgentChat
