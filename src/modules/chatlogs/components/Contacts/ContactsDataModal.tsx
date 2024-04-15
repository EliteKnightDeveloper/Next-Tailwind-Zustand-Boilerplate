import { FC, useEffect, useState } from 'react'
import { Cross, Upload } from '@/common/components/Icons'
import { Email, Whatsapp, World } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import Input from '@/common/elements/Input'
import Modal, { ModalProps } from '@/common/elements/Modal'
import { IAgent, IContact, IMessage } from '@/interfaces'
import Message from '@/modules/chats/components/ChatPanel/Message'
import Avatar from '@/common/elements/Avatar'
import { ImageUrl } from '@/common/utils/constants'
import { useChatStore } from '@/common/stores/chatStore'
import { exportChatLogs } from '@/common/utils/excel'

interface ContactsDataModalProps extends ModalProps {
  agent: IAgent
  messages: string[]
  data: IContact
}

export const ContactsDataModal: FC<ContactsDataModalProps> = ({
  isOpen,
  onClose,
  agent,
  messages,
  data,
}) => {
  const [msgs, setMsgs] = useState<IMessage[]>([])

  const [contact] = useChatStore((state) => [state.contact])

  const exportChatLog = () => {
    const data = contact
  }

  useEffect(() => {
    setMsgs([
      ...messages.map((message, index) => ({
        isAgent: index % 2 === 1,
        message: message,
        image: agent.image,
        role: agent.role,
        response: message,
        mode: true,
      })),
    ])
  }, [isOpen])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col w-[1020px] p-6 rounded-xl h-[768px] max-sm:w-[350px]">
          <div className="flex flex-row items-center justify-between pb-6 border-b border-b-gray-500 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-normal text-neon-100">
                All Customer Records
              </span>
              <span className="text-xl font-medium text-white ">
                {data.customer_name === 'Unknown'
                  ? 'Customer'
                  : data.customer_name}
              </span>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                text={'Export Chat Log'}
                icon={<Upload />}
                onClick={exportChatLog}
              />
              <div
                onClick={onClose}
                className="text-gray-300 hover:text-neon-100 hover:cursor-pointer"
              >
                <Cross />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 mt-6 max-sm:flex-col">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-8">
                <div className="flex flex-row items-center justify-between">
                  <span className="text-sm font-normal text-gray-100 w-[200px]">
                    Chatroom ID
                  </span>
                  <Input className="w-full" value={data.chat_id} disabled />
                </div>
                {data.channel_type === 'Whatsapp' && (
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-sm font-normal text-gray-100 w-[200px]">
                      Phone Number
                    </span>
                    <Input className="w-full" disabled />
                  </div>
                )}
                {data.channel_type === 'Email' && (
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-sm font-normal text-gray-100 w-[200px]">
                      Email Address
                    </span>
                    <Input className="w-full" disabled />
                  </div>
                )}
                {data.channel_type === 'WebWidget' && (
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-sm font-normal text-gray-100 w-[200px]">
                      Name
                    </span>
                    <Input
                      className="w-full"
                      value={
                        data.customer_name === 'Unknown'
                          ? 'Customer'
                          : data.customer_name
                      }
                      disabled
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-lg font-medium text-white">
                  Activity Log
                </span>
                <div className="flex flex-col">
                  {data.channel_type === 'Whatsapp' && (
                    <div className="flex flex-row justify-between px-2 py-4 border-b border-b-gray-500 hover:cursor-pointer">
                      <div className="flex flex-row items-center gap-2">
                        <Avatar
                          src={ImageUrl! + '/' + agent.image}
                          alt={''}
                          isHuman={false}
                          border
                          height={40}
                          width={40}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white ">
                            {agent.name}
                          </span>
                          <span className="text-xs font-normal text-gray-200">
                            {agent.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 px-2 py-1 form-container bg-startGrey">
                        <Whatsapp />
                        <span className="text-xs font-normal text-white">
                          Whatsapp
                        </span>
                      </div>
                    </div>
                  )}
                  {data.channel_type === 'Email' && (
                    <div className="flex flex-row justify-between px-2 py-4 border-b border-b-gray-500 hover:cursor-pointer">
                      <div className="flex flex-row items-center gap-2">
                        <Avatar
                          src={ImageUrl! + '/' + agent.image}
                          alt={''}
                          isHuman={false}
                          border
                          height={40}
                          width={40}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white ">
                            {agent.name}
                          </span>
                          <span className="text-xs font-normal text-gray-200">
                            {agent.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 px-2 py-1 form-container bg-startGrey">
                        <Email />
                        <span className="text-xs font-normal text-white">
                          Email
                        </span>
                      </div>
                    </div>
                  )}
                  {data.channel_type === 'WebWidget' && (
                    <div className="flex flex-row justify-between px-2 py-4 border-b border-b-gray-500 hover:cursor-pointer">
                      <div className="flex flex-row items-center gap-2">
                        <Avatar
                          src={ImageUrl! + '/' + agent.image}
                          alt={''}
                          isHuman={false}
                          border
                          height={40}
                          width={40}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white ">
                            {agent.name}
                          </span>
                          <span className="text-xs font-normal text-gray-200">
                            {agent.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 px-2 py-1 form-container bg-startGrey">
                        <World />
                        <span className="text-xs font-normal text-white">
                          Web Widget
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-1 gap-4 p-3 bg-gray-500 rounded-xl xl:h-[620px] overflow-y-scroll scrollbar-hide">
              {msgs.map((message, index) => (
                <Message {...message} key={index} mode={true} />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
