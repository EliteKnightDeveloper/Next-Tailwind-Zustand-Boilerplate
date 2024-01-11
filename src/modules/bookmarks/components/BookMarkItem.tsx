import { FC } from 'react'
import Avatar from '@/common/elements/Avatar'
import { File, Dot, Message, Bookmark } from '@/common/components/Icons'

interface BookmarkItemProps {
  text: string
  image?: string
  role?: string
  status: string
  type: string
  name?: string
  size?: string
  link?: string
}

const BookmarkItem: FC<BookmarkItemProps> = ({
  text,
  image,
  role,
  status,
  type,
  name,
  size,
  link,
}) => (
  <div className="flex w-full">
    <div className="z-10 flex items-start gap-2">
      <div className="flex items-end h-full">
        <div className="w-[32px] h-[32px]">
          <Avatar
            src={image!}
            alt={''}
            width={32}
            height={32}
            border
            isHuman={false}
            className="w-8 h-8"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-2 p-3 bg-gray-600 rounded-xl">
          <span className="text-base font-normal text-gray-100">{text}</span>
          <div className="flex h-full">
            <Bookmark />
          </div>
        </div>
        {type === 'file' && (
          <div className="flex flex-row items-center justify-center gap-6 p-3 mt-1 bg-gray-600 rounded-xl w-fit">
            <File />
            <div className="flex flex-col">
              <span className="text-base font-normal text-white hover:cursor-pointer">
                <a>{name}</a>
              </span>
              <span className="text-xs font-normal text-gray-300">{size}</span>
            </div>
          </div>
        )}
        {type === 'link' && (
          <div className="flex flex-row justify-between gap-2 p-3 mt-1 bg-gray-600 rounded-xl w-fit">
            <span className="text-base font-normal text-gray-100 underline break-all">
              <a href={`${link}`}>{link}</a>
            </span>
            <Bookmark />
          </div>
        )}
        <div className="flex flex-row items-center gap-3 mt-2">
          <span className="text-xs font-normal text-gray-300 ">{role}</span>
          <Dot />
          <div className="flex flex-row items-center gap-2 text-white">
            <Message />
            <span className="text-xs font-normal text-gray-300 ">{status}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default BookmarkItem
