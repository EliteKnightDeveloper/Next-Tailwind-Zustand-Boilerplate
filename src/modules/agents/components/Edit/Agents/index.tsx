import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Avatar from '@/common/elements/Avatar'
import Input from '@/common/elements/Input'
import Textarea from '@/common/elements/Textarea'
import api from '@/api'
import { IAgent } from '@/interfaces'
import Button from '@/common/elements/Button'
import Loading from '@/common/components/Loading'
import { useNotifications } from '@/hooks/useNotifications'
import { ImageUrl } from '@/common/utils/constants'
import Required from '@/common/elements/Required'
import { useAgents } from '@/hooks/useAgents'

interface AgentProps {
  isLoading: boolean
  agent?: IAgent
}

const Agent: FC<AgentProps> = ({ agent, isLoading }) => {
  const router = useRouter()
  const { query } = router
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [isUpdating, setUpdating] = useState(false)
  const { addNotification } = useNotifications()
  const { register, handleSubmit, setValue } = useForm<IAgent>({
    mode: 'all',
  })
  const [file, setFile] = useState<File>()
  const { updateAgent } = useAgents()

  const setValues = (data: IAgent) => {
    setSelectedImage(ImageUrl + '/' + data.image)
    setValue('name', data.name)
    setValue(
      'welcome',
      data.welcome.length > 0
        ? data.welcome
        : 'Hello and welcome! My name is ' +
            data.name +
            ' and I am here to assist you. If you have any questions or concerns, please share them with me. How can I help you today?'
    )
    setValue('role', data.role)
    setValue('objective', data.objective)
    setValue('tone', data.tone)
    setValue('examples', data.examples)
  }

  useEffect(
    () => {
      if (agent) setValues(agent)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [agent]
  )

  const onSubmit = (register: IAgent) => {
    register.objective = encodeURIComponent(register.objective)
    register.examples = encodeURIComponent(register.examples)

    setUpdating(true)

    updateAgent(query.id!.toString(), register, file)
      .then((response) => {
        setValues(response)
        setUpdating(false)
        addNotification({
          type: 'Success',
          text: 'Agent Update Success',
        })
      })
      .catch(() => {
        setUpdating(false)
        addNotification({
          type: 'Fail',
          text: 'Agent Update Fail',
        })
      })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setSelectedImage(base64String!.toString())
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative mt-4">
      <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
        <span className="flex font-medium text-gray-100 text-sm w-[190px]">
          Agent avatar
        </span>
        <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
          <Avatar
            src={selectedImage}
            height={120}
            width={120}
            alt={''}
            badgeIcon="icon"
            border
            isHuman={false}
            onClickBadge={handleImageChange}
            badgeHeight={8}
            badgeWidth={8}
            className="w-[120px] h-[120px]"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 mt-8 max-sm:gap-6 max-sm:mt-6">
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Agent name <Required />
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Input {...register('name')} type="text" className="w-full" />
              <span className="flex text-sm font-medium text-gray-400">
                What is the name of your AI agent ?
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Welcome message
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Textarea {...register('welcome')} className="w-full" />
              <span className="flex text-sm font-medium text-gray-400">
                How would you like your agent to greet you when you start the
                conversation?
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Role <Required />
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Input type="text" {...register('role')} className="w-full" />
              <span className="flex text-sm font-medium text-gray-400">
                What assumed role do you want your agent to be?
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Objectives
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Textarea
                {...register('objective')}
                className="w-full"
                rows={8}
              />
              <span className="flex text-sm font-medium text-gray-400">
                What are the main objectives of your agent? Give a short
                description of responsibilities, how the agent should respond
                and what the agent should not do.
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Communication Tone
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Textarea {...register('tone')} className="w-full" rows={8} />
              <span className="flex text-sm font-medium text-gray-400">
                What's the personality of your AI agent?
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Examples
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Textarea {...register('examples')} className="w-full" rows={8} />
              <span className="flex text-sm font-medium text-gray-400">
                What are some examples of how the agent should respond to
                questions?
              </span>
            </div>
          </div>
          <div className="flex justify-end max-sm:flex-col max-sm:gap-3 max-sm:items-end">
            <Button
              text="Update Agent"
              variant="gradient"
              type="submit"
              isLoading={isUpdating}
            />
          </div>
        </div>
      </form>
      {isLoading && (
        <div className="absolute -top-[calc(50%)] bottom-0 left-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default Agent
