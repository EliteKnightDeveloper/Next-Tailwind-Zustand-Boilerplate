import { FC, Fragment, useState } from 'react'
import Avatar from '@/common/elements/Avatar'
import { Message, Pin, Spinner, Spread } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import { IAgent } from '@/interfaces'
import Skeleton from '@/common/elements/Skeleton'
import { ImageUrl } from '@/common/utils/constants'
import DropdownMenu from '@/common/components/DropdownMenu'
import { useRouter } from 'next/router'
import api from '@/api'
import { useNotifications } from '@/hooks/useNotifications'
import { useUserStore } from '@/common/stores/userStore'

export type AgentCardProps = {
  data: IAgent
  isCreatingChat?: boolean
  onDulicate: (agentId: number) => void
  onDelete: (agentId: number) => void
  onClickChat: () => void
  pinAgent: (agentId: number) => void
}

export const AgentCardSkeleton: FC = () => (
  <>
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-[120px] h-[120px] relative z-10">
        <Skeleton variant="avatar" width="full" height="full" />
      </div>
      <div className="flex flex-col justify-end items-center bg-black rounded-xl px-5 pt-2 -mt-[calc(15%)] w-full avatar-card pb-5 h-full">
        <div className="flex flex-col items-center justify-center w-full pb-2 mt-8 border-b border-gray-500">
          <div className="w-[60%] h-[20px] mt-4">
            <Skeleton
              variant="rectangular"
              width="full"
              height="full"
              isLoading
            />
          </div>
          <span className="my-2 w-[40%] h-[10px]">
            <Skeleton
              variant="rectangular"
              width="full"
              height="full"
              isLoading
            />
          </span>
        </div>
        <div className="w-full mt-4 h-fit">
          <Skeleton variant="text" lines={4} />
        </div>
      </div>
    </div>
  </>
)

const AgentCard: FC<AgentCardProps> = ({
  data,
  isCreatingChat = false,
  onDulicate,
  onDelete,
  onClickChat,
  pinAgent,
}) => {
  const router = useRouter()
  const { addNotification } = useNotifications()
  const [isPinning, setPinning] = useState(false)
  const [setEditAgent] = useUserStore((state) => [state.setEditAgent])

  const linkEdit = () => {
    router.push(`agents/edit/${data.id}`)
    setEditAgent(data.id.toString())
  }

  const onPinAgent = (agentId: number) => {
    if (isPinning) return
    setPinning(true)

    api.agents
      .pinAgent(agentId)
      .then((response) => {
        if (response.pinned)
          addNotification({
            type: 'Success',
            text: 'Agent Pin Success',
          })
        else
          addNotification({
            type: 'Success',
            text: 'Agent Unpin Success',
          })
        setPinning(false)
        pinAgent(agentId)
      })
      .catch(() => {
        setPinning(false)
        addNotification({
          type: 'Fail',
          text: 'Agent Pin Fail',
        })
      })
  }

  return (
    <Fragment>
      <div
        className={`flex flex-col justify-center items-center h-full ${
          data.archived ? 'opacity-30' : ''
        }`}
        role="Agent"
      >
        <Avatar
          src={ImageUrl + '/' + data.image}
          width={120}
          height={120}
          alt={''}
          border
          isHuman={false}
          badgeIcon={'none'}
          className="w-[120px] h-[120px] z-[100] relative"
        />
        <div className="flex flex-col justify-end items-center bg-black rounded-xl px-5 pt-2 -mt-[calc(15%)] w-full avatar-card pb-5 h-full">
          {data.deployed && (
            <div className="ribbon-wrapper">
              <div className="ribbon">Deployed</div>
            </div>
          )}
          <div className="flex flex-row items-center gap-2 absolute justify-end w-full right-[calc(5%)] top-[calc(8%)]">
            <div
              className="z-10 cursor-pointer pin"
              onClick={() => onPinAgent(data.id)}
              role="Pin"
            >
              <span className="hidden">{data.name}</span>
              {isPinning ? (
                <div className="spinner">
                  <Spinner />
                </div>
              ) : (
                <div
                  className={data.pinned ? 'text-neon-100' : 'text-gray-400'}
                >
                  <Pin />
                </div>
              )}
            </div>
            <DropdownMenu
              testRole={data.name}
              align="right"
              options={[
                {
                  title: 'Edit',
                  action: linkEdit,
                },
                // {
                //   title: 'Duplicate',
                //   action: () => onDulicate(data.id),
                // },
                {
                  title: 'Delete',
                  action: () => onDelete(data.id),
                  color: 'text-red',
                },
              ]}
              icon={<Spread />}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full pb-2 mt-16 border-b border-gray-500">
            <span className="text-lg text-white text-medium document-title">
              {data.name}
            </span>
            <span className="mt-2 text-base text-gray-300 text-medium document-title">
              {data.role}
            </span>
          </div>
          <span className="flex-1 w-full mt-2 text-sm font-normal text-center text-gray-300 break-words document-body">
            {data.objective}
          </span>
          {!data.archived && (
            <div className="absolute chat-button bottom-0 translate-y-[80%]">
              <div className="flex flex-row items-center justify-center gap-2">
                <Button
                  text="Chat"
                  icon={<Message />}
                  onClick={onClickChat}
                  isLoading={isCreatingChat}
                  disabled={isCreatingChat}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default AgentCard
