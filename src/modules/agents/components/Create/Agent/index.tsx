import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '@/common/elements/Input'
import Textarea from '@/common/elements/Textarea'
import Button from '@/common/elements/Button'
import { IAgent } from '@/interfaces'
import api from '@/api'
import { useUserStore } from '@/common/stores/userStore'
import { useRouter } from 'next/router'
import { useNotifications } from '@/hooks/useNotifications'
import Loading from '@/common/components/Loading'
import Avatar from '@/common/elements/Avatar'
import { ImageUrl } from '@/common/utils/constants'
import Required from '@/common/elements/Required'

const Agent: FC = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const [isLoading, setLoading] = useState(false)
  const { addNotification } = useNotifications()
  const { register, handleSubmit, setValue } = useForm<IAgent>({
    mode: 'all',
  })
  const [selectedImage, setSelectedImage] = useState<string>(
    ImageUrl + '/Default.png'
  )
  const [file, setFile] = useState<File>()

  const clearValues = () => {
    setValue('name', '')
    setValue('welcome', '')
    setValue('role', '')
    setValue('objective', '')
    setValue('tone', '')
    setValue('examples', '')
  }

  const onSubmit = (register: IAgent) => {
    register.objective = encodeURIComponent(register.objective)

    setLoading(true)
    api.agents
      .getAgentsByOwner()
      .then((response) => {
        const dupicated = response.some((agent) => agent.name === register.name)
        if (!dupicated) {
          api.agents
            .createAgent(user!.id, register, file!)
            .then((data) => {
              setLoading(false)
              router.push(`/agents/edit/${data.id}`)
              addNotification({
                type: 'Success',
                text: 'Agent Create Success',
              })
              clearValues()
            })
            .catch(() => {
              setLoading(false)
              addNotification({
                type: 'Fail',
                text: 'Agent Create Fail',
              })
              clearValues()
            })
        } else {
          setLoading(false)
          addNotification({
            type: 'Fail',
            text: 'Agent Name Duplicated',
          })
        }
      })
      .catch(() => {})
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
    <div className="flex flex-col mt-4">
      <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
        <span className="flex font-medium text-gray-100 text-sm w-[190px]">
          Agent avatar <Required />
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
        <div className="flex flex-col gap-8 mt-8 max-sm:gap-6">
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
                How would you like your agent to greet you? Example: Hello
                @user, nice to meet you!
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
                What's the role of your AI Agent? Example: Social Media Manager,
                etc.
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Objectives
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Textarea {...register('objective')} className="w-full" />
              <span className="flex text-sm font-medium text-gray-400">
                What are the main objectives for the role and agent? Example: As
                a soc med manager, I involve in driving our social media pages.
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Communication Tone
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Textarea
                {...register('tone')}
                id="tone"
                name="tone"
                className="w-full"
              />
              <span className="flex text-sm font-medium text-gray-400">
                What's the personality of your AI agent? Examples include, talk
                like a pirate, only reply in the style of sales person, warm,
                friendly, professional, direct.
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-start max-sm:flex-col max-sm:gap-3">
            <span className="flex font-medium text-gray-100 text-sm w-[190px]">
              Examples
            </span>
            <div className="flex flex-col items-start w-full gap-4 2xl:ml-8 max-sm:gap-2">
              <Textarea {...register('examples')} className="w-full" />
              <span className="flex text-sm font-medium text-gray-400">
                Provide any examples of how you would like your agent to
                respond.
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              text="Save Agent Info"
              variant="gradient"
              type="submit"
              isLoading={isLoading}
            />
          </div>
          {isLoading && (
            <div className="absolute -top-[calc(50%)] bottom-0 left-0 right-0 flex items-center justify-center">
              <Loading />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Agent
