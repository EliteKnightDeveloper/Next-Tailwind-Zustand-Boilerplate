import { FC } from 'react'
import Avatar from '@/common/elements/Avatar'
import { ImageUrl } from '@/common/utils/constants'

interface ReplyLoadingProps {
  image: string
}

const ReplyLoading: FC<ReplyLoadingProps> = ({ image }) => (
  <div className="flex items-center gap-2">
    <Avatar
      src={ImageUrl + '/' + image}
      alt="Agent"
      width={32}
      height={32}
      border
      isHuman={false}
      className="w-[32px] h-[32px]"
    />
    <div className="bg-gray-600 text-gray-100 rounded-xl p-3 flex px-6">
      <div className="chat-loader" />
    </div>
  </div>
)

export default ReplyLoading
