import { ArrowR, Quote } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import { useChatStore } from '@/common/stores/chatStore'
import { classNames } from '@/common/utils'
import { timeDifference } from '@/common/utils/date'
import { IChat } from '@/interfaces'
import { useRouter } from 'next/router'
import { FC } from 'react'

const logs: IChat[] = [
  {
    id: 1,
    name: '',
    user_id: '3',
    primary_agent_id: '1',
    memory_id: '1',
    messages: [
      'What is your role?',
      'As an AI Prompt Engineer, my primary goal is to create prompts that provide clear instructions to the AI while ensuring they align with the specific use case requirements, desired outcomes, and any constraints. I pay meticulous attention to detail to ensure that prompts are optimized for the best possible performance. I also emphasize the importance of asking follow-up questions to refine the AIs understanding and to ensure the generated content meets human expectations.',
    ],
    start_time: '2023-12-04T08:57:24.966762',
    end_time: '2023-12-04T08:57:24.966767',
    channel: 'Whatsapp',
    interaction_time: 12.01,
  },
  {
    id: 1,
    name: '',
    user_id: '3',
    primary_agent_id: '1',
    memory_id: '1',
    messages: [
      'What is your role?',
      'As an AI Prompt Engineer, my primary goal is to create prompts that provide clear instructions to the AI while ensuring they align with the specific use case requirements, desired outcomes, and any constraints. I pay meticulous attention to detail to ensure that prompts are optimized for the best possible performance. I also emphasize the importance of asking follow-up questions to refine the AIs understanding and to ensure the generated content meets human expectations.',
    ],
    start_time: '2023-12-04T08:57:24.966762',
    end_time: '2023-12-04T08:57:24.966767',
    channel: 'Whatsapp',
    interaction_time: 12.01,
  },
  {
    id: 1,
    name: '',
    user_id: '3',
    primary_agent_id: '1',
    memory_id: '1',
    messages: [
      'What is your role?',
      'As an AI Prompt Engineer, my primary goal is to create prompts that provide clear instructions to the AI while ensuring they align with the specific use case requirements, desired outcomes, and any constraints. I pay meticulous attention to detail to ensure that prompts are optimized for the best possible performance. I also emphasize the importance of asking follow-up questions to refine the AIs understanding and to ensure the generated content meets human expectations.',
    ],
    start_time: '2023-12-04T08:57:24.966762',
    end_time: '2023-12-04T08:57:24.966767',
    channel: 'Whatsapp',
    interaction_time: 12.01,
  },
]

const RecentChat: FC = () => {
  const router = useRouter()
  const [setChatroomID] = useChatStore((state) => [state.setChatroomID])
  const goToConversationPage = () => {
    router.push('/conversations/0')
    setChatroomID(0)
  }

  return (
    <div className="flex flex-col w-auto h-full gap-5 p-6 bg-black rounded-xl form-container max-sm:p-3">
      <div className="flex flex-row items-center w-full gap-3">
        <span className="text-xl font-semibold text-white max-sm:text-base">
          Recent Chats
        </span>
        <Quote />
      </div>
      <div
        className={classNames(
          'z-10 flex flex-col  h-full gap-4 overflow-y-scroll scrollbar-hide'
        )}
      >
        {logs.map((log, idx) => {
          return (
            <div
              className="flex flex-col px-2 pt-2 pb-4 border-b border-b-gray-500 hover:bg-gray-500 hover:cursor-pointer hover:rounded-xl"
              key={idx}
            >
              <div className="flex flex-row justify-between gap-4 max-sm:flex-col">
                <div className="flex flex-col max-sm:gap-2">
                  <div className="flex flex-row items-start flex-1 gap-2">
                    <span className="text-sm font-medium text-white  min-w-[80px]">
                      Customer:
                    </span>
                    <span className="text-sm text-gray-700 font-noraml recent-chat">
                      {log.messages[0]}
                    </span>
                  </div>
                  <div className="flex flex-row items-start flex-1 gap-2">
                    <span className="text-sm font-medium text-white  min-w-[80px]">
                      Agent:
                    </span>
                    <span className="text-sm text-gray-700 font-noraml recent-chat">
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
      </div>
      <div className="flex justify-end w-full">
        <Button
          text="See All"
          variant="gradient"
          className="z-10"
          icon={<ArrowR />}
          onClick={goToConversationPage}
        />
      </div>
    </div>
  )
}

export default RecentChat
