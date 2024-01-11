import Input from '@/common/elements/Input'
import Textarea from '@/common/elements/Textarea'
import { FC } from 'react'

const Escalation: FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-8 mt-4">
        <div className="flex flex-row gap-6">
          <span className="w-[190px] text-gray-100  font-medium text-sm">
            Reason
          </span>
          <div className="w-full">
            <Textarea className="w-full" />
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <span className="w-[190px] text-gray-100  font-medium text-sm">
            Response
          </span>
          <div className="w-full">
            <Textarea className="w-full" />
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <span className="w-[190px] text-gray-100  font-medium text-sm">
            User
          </span>
          <div className="w-full">
            <Input className="w-full" />
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <span className="w-[190px] text-gray-100  font-medium text-sm">
            Escalation channel
          </span>
          <div className="w-full">
            <Input className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Escalation
