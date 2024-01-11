import { FC, useState } from 'react'
import Toggle from '@/common/elements/Toggle'
import Select, { IOption } from '@/common/elements/Select'
import { Models } from '@/common/utils/constants'

const Settings: FC = () => {
  const [formValue, setFormValue] = useState<IOption>(Models[0])

  const changeFormSelect = (value: IOption) => {
    setFormValue(value)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mt-4">
        <span className="text-base font-medium text-gray-100">
          Search the Internet
        </span>
        <Toggle onToggle={() => {}} checked />
      </div>
      <span className="pb-6 mt-3 text-sm font-medium text-gray-400 border-b border-gray-700">
        Enable AI agent to perform web search results through web browsing
      </span>
      <div className="flex items-center justify-between mt-6">
        <span className="text-base font-medium text-gray-100">
          Chat History
        </span>
        <Toggle onToggle={() => {}} checked />
      </div>
      <span className="pb-6 mt-3 text-sm font-medium text-gray-400 border-b border-gray-700">
        Enable AI Agent to have access to conversation history
      </span>
      <div className="flex items-center justify-between mt-6">
        <span className="text-base font-medium text-gray-100">LLM</span>
        <Select
          options={Models}
          value={formValue}
          onChange={(value) => {
            changeFormSelect(value)
          }}
          className="w-[200px]"
        />
      </div>
      <span className="pb-6 mt-3 text-sm font-medium text-gray-400 border-b border-gray-700">
        Enable AI Agent to use selected LLM
      </span>
    </div>
  )
}

export default Settings
