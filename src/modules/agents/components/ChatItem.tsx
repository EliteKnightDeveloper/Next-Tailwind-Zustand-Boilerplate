import { FC, useState } from 'react'
import showdown from 'showdown'
import { ArrowDetail } from '@/common/components/Icons'
import TransitionEffect from '@/common/components/TransitionEffect/TransitionEffect'
import Avatar from '@/common/elements/Avatar'
import { classNames } from '@/common/utils'
import { ImageUrl } from '@/common/utils/constants'
import Writing from '@/common/elements/Writing'
import { IMessage } from '@/interfaces'

const ChatItem: FC<IMessage> = ({
  isAgent,
  message,
  role,
  image,
  response,
  isStreaming,
}) => {
  const [isErrorShown, setErrorShown] = useState(false)
  const converter = new showdown.Converter()

  return (
    <TransitionEffect>
      {isAgent && (
        <div className="flex items-end gap-2">
          <div className="mb-3 min-w-[32px]">
            <Avatar
              src={ImageUrl + '/' + image!}
              alt={''}
              width={32}
              height={32}
              border
              isHuman={false}
              className="w-8 h-8"
            />
          </div>
          <div className="flex flex-col flex-1">
            {isStreaming && <Writing />}
            <div
              className={classNames(
                'bg-gray-600 text-gray-100 rounded-xl p-3 flex gap-2',
                isStreaming ? 'animate-pulse' : ''
              )}
            >
              <div className="items-center flex-1">
                <div className="flex flex-row items-center justify-between">
                  <div
                    className="flex-1 w-0 text-sm output-container break-word"
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(
                        message.replace('```html', '').replace('```', '')
                      ),
                    }}
                  />
                </div>
                <button
                  className="flex items-center gap-1 px-1 mt-2 text-slate-500"
                  onClick={() => {
                    setErrorShown(!isErrorShown)
                  }}
                >
                  <div
                    className={classNames(
                      'transiton-all duration-500',
                      isErrorShown ? 'rotate-90' : ''
                    )}
                  >
                    <ArrowDetail />
                  </div>
                  <span className="text-xs">Detail</span>
                </button>
                {isErrorShown && (
                  <div className="w-full p-2 mt-1 text-xs break-all bg-slate-700 rounded-xl">
                    {response}
                  </div>
                )}
              </div>
            </div>
            <span className="pl-1 mt-1 text-xs font-normal text-gray-300">
              {role}
            </span>
          </div>
        </div>
      )}
      {!isAgent && (
        <div className="flex items-center gap-2 p-3 text-white bg-purple-100 rounded-xl">
          <p className="flex-1 text-sm">{message}</p>
        </div>
      )}
    </TransitionEffect>
  )
}

export default ChatItem
