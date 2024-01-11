import { FC, Fragment, useState, useEffect } from 'react'
import { ImageUrl } from '@/common/utils/constants'
import {
  Close,
  SidebarEdit,
  Tick,
  SidebarTrash,
} from '@/common/components/Icons'
import Badge from '@/common/elements/Badge'
import Button from '@/common/elements/Button'
import { classNames } from '@/common/utils'
import { appLinks } from '@/common/utils/constants'
import Input from '@/common/elements/Input'
import api from '@/api'
import Skeleton from '@/common/elements/Skeleton'
import { usePopup } from '@/common/hooks/usePopup'
import { useChatStore } from '@/common/stores/chatStore'
import { useNotifications } from '@/hooks/useNotifications'
import { useRouter } from 'next/router'
import { useThemeStore } from '@/common/stores/themeStore'
import Avatar from '@/common/elements/Avatar'

interface ChatItemProps {
  id: number
  text: string
  messages: number
  avatar: string
}

const ChatItem: FC<ChatItemProps> = ({ id, text, messages, avatar }) => {
  const { addNotification } = useNotifications()
  const [chats, setChats] = useChatStore((state) => [
    state.chats,
    state.setChats,
  ])
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const router = useRouter()

  const active = router.query.id === id.toString()

  const [mode, setMode] = useState(0)
  const [editName, setEditName] = useState(text)
  const [name, setName] = useState(text)
  const [isLoading, setLoading] = useState(false)

  const [isSidebarCollapsed, setMobileSidebarCollapsed] = useThemeStore(
    (state) => [state.isSidebarCollapsed, state.setMobileSidebarCollapsed]
  )

  useEffect(() => {
    if (mode === 1) {
      setEditName(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  useEffect(() => {
    if (mode === 0) setName(text)
  }, [text])

  const onChange = () => {
    setLoading(true)

    api.chats
      .renameChat(id, editName)
      .then(() => {
        setName(editName)
        setMode(0)
        setLoading(false)
        addNotification({
          type: 'Success',
          text: 'Chat Rename Success',
        })
      })
      .catch(() => {
        setMode(0)
        setLoading(false)
        addNotification({
          type: 'Fail',
          text: 'Chat Rename Fail',
        })
      })

    setMode(0)
  }

  const onEditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.currentTarget.value)
  }

  const onDelete = () => {
    showConfirm({
      title: 'Delete this chat?',
      confirmText: 'Delete',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setIsConfirming(true)
        api.chats.deleteChat(id).then(() => {
          setChats(chats.filter((chat) => chat.id !== id))
          setIsConfirming(false)
          hideConfirm()
          addNotification({
            type: 'Success',
            text: 'Delete Chat Success',
          })
          router.push(appLinks.agents)
        })
      },
    })
  }

  return isLoading ? (
    <div className="w-full h-[20px] my-2 px-6">
      <Skeleton variant="rectangular" width="full" height="full" isLoading />
    </div>
  ) : (
    <div
      className={classNames(
        'flex items-start cursor-pointer py-1 gap-1 justify-start',
        !isSidebarCollapsed && active
          ? 'bg-gradient-to-r from-startGrey to-endGrey px-6'
          : '',
        !isSidebarCollapsed ? 'px-6' : ''
      )}
      onClick={() => {
        router.push(`${appLinks.chat}/${id}`)
        setMobileSidebarCollapsed(true)
      }}
    >
      {mode === 0 ? (
        <div className="flex flex-1 gap-1 pr-1">
          <span className="flex-1 overflow-hidden text-sm font-medium text-white document-title h-fit">
            {name}
          </span>
          <Avatar
            alt={''}
            src={ImageUrl + '/Default.png'}
            width={25}
            height={25}
            border
            isHuman={false}
          />
        </div>
      ) : (
        <Input value={editName} onChange={onEditName} xs="sm" />
      )}
      {/* <Badge value={messages} /> */}
      {active &&
        (mode === 0 ? (
          <Fragment>
            <Button
              text=""
              icon={
                <div className="text-white hover:text-neon-100">
                  <SidebarEdit />
                </div>
              }
              variant="text"
              size="xs"
              onClick={() => {
                setMode(1)
              }}
            />
            <Button
              text=""
              icon={
                <div className="text-white hover:text-neon-100">
                  <SidebarTrash />
                </div>
              }
              variant="text"
              size="xs"
              onClick={onDelete}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Button
              text=""
              icon={<Tick />}
              variant="text"
              size="xs"
              onClick={onChange}
            />
            <Button
              text=""
              icon={<Close />}
              variant="text"
              size="xs"
              onClick={() => {
                setMode(0)
              }}
            />
          </Fragment>
        ))}
    </div>
  )
}

export default ChatItem
