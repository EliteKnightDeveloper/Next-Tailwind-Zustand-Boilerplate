import { FC, useState, Fragment } from 'react'
import Avatar from '@/common/elements/Avatar'
import Button from '@/common/elements/Button'
import { Edit } from '@/common/components/Icons'
import { ImageUrl } from '@/common/utils/constants'
import EditCompany from './EditCompany'

const Company: FC = () => {
  const [show, setShow] = useState(false)
  const showModal = () => {
    setShow(!show)
  }

  return (
    <Fragment>
      <div className="flex flex-row justify-between max-sm:flex-col max-sm:gap-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Company Info
          </span>
          <span className="mt-2 text-sm font-normal text-gray-300">
            Providing information about your company will help agents work more
            effectively
          </span>
        </div>
        <div className="flex flex-row gap-3 max-sm:justify-between">
          <Button text="Edit Info" icon={<Edit />} onClick={showModal} />
        </div>
      </div>
      <div className="flex flex-row items-center gap-3 mt-4">
        <Avatar
          src={ImageUrl! + '/Company.png'}
          alt={''}
          isHuman={true}
          border
          height={64}
          width={64}
        />
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-white max-sm:text-sm">
            Blackbox AI
          </span>
          <span className="text-base font-normal text-gray-300 max-sm:text-sm">
            Last Updated 06/12/2023 - 14:08:52
          </span>
        </div>
      </div>
      <EditCompany isOpen={show} onClose={showModal} />
    </Fragment>
  )
}

export default Company
