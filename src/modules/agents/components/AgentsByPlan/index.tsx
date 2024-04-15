import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AgentCard, { AgentCardSkeleton } from './AgentCard'
import api from '@/api'
import { IAgent } from '@/interfaces'
import { useUserStore } from '@/common/stores/userStore'
import { appLinks } from '@/common/utils/constants'
import { useChatStore } from '@/common/stores/chatStore'
import { usePopup } from '@/common/hooks/usePopup'
import Loading from '@/common/components/Loading'
import { useNotifications } from '@/hooks/useNotifications'
import { useAgents } from '@/hooks/useAgents'

const AgentsByPlanSkeleton: FC = () => {
  const skeletons = []

  for (let i = 0; i < 8; ++i) {
    skeletons.push(<AgentCardSkeleton key={i} />)
  }

  return skeletons
}

const AgentsByPlan: FC = () => {
  const [pinnedAgents, setPinnedAgents] = useState<IAgent[]>([])
  const [unpinnedAgents, setUnpinnedAgents] = useState<IAgent[]>([])
  const [archivedAgents, setArchivedAgents] = useState<IAgent[]>([])
  const [isDuplicating, setDuplicating] = useState(false)
  const [archived, setArchived] = useState(true)
  const [isNameModalOpen, setNameModalOpen] = useState(false)
  const user = useUserStore((state) => state.user)
  const [chats, setChats] = useChatStore((state) => [
    state.chats,
    state.setChats,
  ])
  const router = useRouter()
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const [isChatCreating, setChatCreating] = useState<string>()
  const { addNotification } = useNotifications()
  const { agents, isLoading, deleteAgent, pinAgent } = useAgents()

  useEffect(() => {
    setPinnedAgents(
      agents
        ?.filter((agent) => !agent.archived && agent.pinned)
        .sort((a, b) => (Number(a.deployed) - Number(b.deployed) >= 0 ? -1 : 1))
    )
    setUnpinnedAgents(
      agents
        ?.filter((agent) => !agent.archived && !agent.pinned)
        .sort((a, b) => (Number(a.deployed) - Number(b.deployed) >= 0 ? -1 : 1))
    )
    setArchivedAgents(agents?.filter((agent) => agent.archived))
  }, [agents])

  const toggleNameModalOpen = () => {
    setNameModalOpen(!isNameModalOpen)
  }

  const onClickChat = (agent: IAgent) => {
    setChatCreating(agent.id)
    localStorage.setItem('is-first-query', 'true')
    api.chats
      .createChat({
        name: 'Untitled',
        agent_id: agent.id,
      })
      .then((data) => {
        setChats([...chats, data])
        setChatCreating('')
        toggleNameModalOpen()
        router.push(`${appLinks.chat}/${data.id}`)
        addNotification({
          type: 'Success',
          text: 'Chat Create Success',
        })
      })
      .catch(() => {
        toggleNameModalOpen()
        setChatCreating('')
        addNotification({
          type: 'Fail',
          text: 'Chat Create Fail',
        })
      })
  }

  const onDeleteAgent = (agentId: string) => {
    showConfirm({
      title: 'Delete this AI agent?',
      confirmText: 'Delete',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setIsConfirming(true)
        deleteAgent(agentId).then(() => {
          hideConfirm()
          setIsConfirming(false)
        })
      },
    })
  }

  return (
    <div className="py-3">
      <div className="items-start mt-11">
        {isLoading ? (
          <div className="grid gap-6 lg:grid-cols-4 max-md:grid-cols-1 md:grid-cols-2 gap-y-16">
            <AgentsByPlanSkeleton />
          </div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-4 max-md:grid-cols-1 md:grid-cols-2 gap-y-16">
              {pinnedAgents.map((agent: IAgent, id: number) => {
                return (
                  <AgentCard
                    data={{
                      ...agent,
                      pinned: agent.deployed || agent.pinned,
                    }}
                    key={id}
                    onDulicate={() => {}}
                    onDelete={() => onDeleteAgent(agent.id)}
                    pinAgent={() => pinAgent(agent.id)}
                    onClickChat={() => {
                      onClickChat(agent)
                    }}
                    isCreatingChat={isChatCreating === agent.id}
                  />
                )
              })}
            </div>
            {pinnedAgents.length !== 0 && unpinnedAgents.length !== 0 && (
              <div className="my-16 pin-divider"></div>
            )}
            <div className="grid gap-6 lg:grid-cols-4 max-md:grid-cols-1 md:grid-cols-2 gap-y-16">
              {unpinnedAgents
                .filter((agent) => !agent.pinned)
                .map((agent: IAgent, id: number) => {
                  return (
                    <AgentCard
                      data={agent}
                      key={id}
                      onDulicate={() => {}}
                      onDelete={() => onDeleteAgent(agent.id)}
                      pinAgent={() => pinAgent(agent.id)}
                      onClickChat={() => {
                        onClickChat(agent)
                      }}
                      isCreatingChat={isChatCreating === agent.id}
                    />
                  )
                })}
            </div>
          </>
        )}
        {isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {isDuplicating && <AgentCardSkeleton />}
      </div>
    </div>
  )
}

export default AgentsByPlan
