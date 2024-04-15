import { ChangeEvent, FC, useState } from 'react'
import Input from '@/common/elements/Input'
import Button from '@/common/elements/Button'
import { Plus } from '@/common/components/Icons'

const Api: FC = () => {
  const [appID, setAppID] = useState('')
  const [merchantID, setMerchantID] = useState('')
  const [azaraID, setAzaraID] = useState('')

  const changeAppID = (event: ChangeEvent<HTMLInputElement>) => {
    setAppID(event.target.value)
  }

  const changeMerchantID = (event: ChangeEvent<HTMLInputElement>) => {
    setMerchantID(event.target.value)
  }

  const changeAzaraID = (event: ChangeEvent<HTMLInputElement>) => {
    setAzaraID(event.target.value)
  }

  return (
    <div className="flex flex-col mt-3">
      <div className="flex gap-6">
        <span className="w-[166px] text-sm font-medium text-white">APP_ID</span>
        <div className="flex flex-col w-full">
          <Input value={appID} onChange={changeAppID} className="w-full" />
          <span className="mt-3 text-sm font-medium text-gray-400">
            Use App_ID to link an Agent to your application
          </span>
        </div>
      </div>
      <div className="flex gap-6 mt-8">
        <span className="w-[166px] text-sm font-medium text-white">
          Merchant ID
        </span>
        <div className="flex flex-col w-full">
          <Input
            value={merchantID}
            onChange={changeMerchantID}
            className="w-full"
          />
          <span className="mt-3 text-sm font-medium text-gray-400">
            Use MERCHANT_ID to link an Agent to your application
          </span>
        </div>
      </div>
      <div className="flex gap-6 mt-8">
        <span className="w-[166px] text-sm font-medium text-white">
          Azara_ID
        </span>
        <div className="flex flex-col w-full">
          <Input value={azaraID} onChange={changeAzaraID} className="w-full" />
          <span className="mt-3 text-sm font-medium text-gray-400">
            Use App_ID to link an Agent to your application
          </span>
        </div>
      </div>
      <div className="flex mt-3">
        <span className="w-[166px] text-sm font-medium text-white"></span>
        <div className="flex flex-row gap-6">
          <Button icon={<Plus />} text={'Create Secret Key'} variant="solid" />
          <Button text={'Manage'} variant="solid" />
        </div>
      </div>
    </div>
  )
}
export default Api
