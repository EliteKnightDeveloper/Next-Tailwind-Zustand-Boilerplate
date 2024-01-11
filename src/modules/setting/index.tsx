import { FC, useState } from 'react'
import { useUserStore } from '@/common/stores/userStore'
import Avatar from '@/common/elements/Avatar'
import { SidebarEdit } from '@/common/components/Icons'
import EditProfile from './components/Profile'
import MembersTable from './components/Member/MembersTable'
import { ImageUrl } from '@/common/utils/constants'
import Company from './components/Company'
import { convertString2Date } from '@/common/utils/date'
import { getCurrentTimezone } from '@/common/utils/date'

const Setting: FC = () => {
  const user = useUserStore((state) => state.user)
  const [showProfile, setShowProfile] = useState(false)

  const loginTime = useUserStore((state) => state.loginTime)

  const showProfileModal = () => {
    setShowProfile(!showProfile)
  }

  return (
    <div className="relative px-6 py-8 max-sm:px-5 max-sm:py-2">
      <div className="relative flex flex-row items-start justify-between p-4 bg-black rounded-xl max-sm:flex-col">
        <div className="flex flex-row items-center gap-3">
          <Avatar
            src={user ? user?.image : ImageUrl! + 'Default.png'}
            alt={''}
            isHuman={true}
            border
            height={64}
            width={64}
          />
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-white max-sm:text-sm">
              {user?.name}
            </span>
            <span className="text-base font-normal text-gray-300 max-sm:text-sm">
              Last Login {convertString2Date(loginTime!.toString())}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-8 max-sm:mt-4">
          <div className="flex flex-col gap-3 mr-8">
            <div className="flex flex-row gap-4">
              <span className="w-[200px] font-normal text-gray-400 max-sm:w-[82px] text-sm">
                User name
              </span>
              <span className="text-sm font-normal text-white">
                {user?.name}
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <span className="w-[200px] font-normal text-gray-400 max-sm:w-[80px] text-sm">
                Email
              </span>
              <span className="text-sm font-normal text-white">
                {user?.email}
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <span className="w-[200px] font-normal text-gray-400 max-sm:w-[80px] text-sm">
                Password
              </span>
              <span className="text-sm font-normal text-white"></span>
            </div>
            <div className="flex flex-row gap-4">
              <span className="w-[200px] font-normal text-gray-400 max-sm:w-[80px] text-sm">
                Timezone
              </span>
              <span className="text-sm font-normal text-white">
                {/* {getTimezone(Number(user?.timezone))} */}
                {getCurrentTimezone()}
              </span>
            </div>
          </div>
          <div
            className="max-sm:absolute max-sm:right-4 max-sm:top-4 flex justify-center items-center rounded-full bg-gray-500 hover:text-neon-100 border border-[#0C0D10] w-8 h-8 text-white hover:cursor-pointer"
            onClick={showProfileModal}
          >
            <SidebarEdit />
          </div>
          <EditProfile
            show={showProfile}
            showModal={showProfileModal}
            data={user!}
          />
        </div>
      </div>
      <div className="flex flex-col mt-8 max-sm:mt-6">
        <Company />
      </div>
      <div className="flex flex-col mt-8 max-sm:mt-6">
        <MembersTable />
      </div>
      {/* <div className="flex flex-col mt-8">
        <APIKeys />
      </div> */}
    </div>
  )
}

export default Setting
