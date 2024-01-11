import { FC, useState } from 'react'
import showdown from 'showdown'
import { ArrowDetail, Spread } from '@/common/components/Icons'
import TransitionEffect from '@/common/components/TransitionEffect/TransitionEffect'
import Avatar from '@/common/elements/Avatar'
import { classNames } from '@/common/utils'
import { ImageUrl } from '@/common/utils/constants'
import DropdownMenu from '@/common/components/DropdownMenu'
import Button from '@/common/elements/Button'
import Textarea from '@/common/elements/Textarea'
import Writing from '@/common/elements/Writing'
import { IMessage } from '@/interfaces'

const Message: FC<IMessage> = ({
  isAgent,
  message,
  role,
  image,
  response,
  isStreaming,
  mode,
  testNode,
}) => {
  const [isErrorShown, setErrorShown] = useState(false)
  const converter = new showdown.Converter()
  const [editable, setEditable] = useState(false)
  const [msg, setMsg] = useState(message)

  const editChat = () => {
    setEditable(!editable)
  }

  const changeMessage = (event: any) => {
    setMsg(event.target.value)
  }

  return (
    <TransitionEffect>
      {isAgent && (
        <div
          className={classNames(
            'flex items-end gap-2',
            editable ? 'px-6 py-2 bg-gray-500 rounded-lg' : ''
          )}
        >
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
                <div className="flex flex-row items-start justify-between">
                  {editable ? (
                    <Textarea value={msg} onChange={changeMessage} />
                  ) : (
                    <div
                      className={classNames(
                        'flex-1 w-0 text-base output-container break-word',
                        testNode ? 'testNode' : ''
                      )}
                      dangerouslySetInnerHTML={{
                        __html: converter.makeHtml(
                          message.replace('```html', '').replace('```', '')
                        ),
                      }}
                    />
                  )}
                  {!editable && mode && (
                    <DropdownMenu
                      align="right"
                      options={[
                        {
                          title: 'Edit',
                          action: editChat,
                        },
                        {
                          title: 'Remove',
                          action: () => {},
                          color: 'text-red',
                        },
                      ]}
                      icon={<Spread />}
                    />
                  )}
                </div>
                {mode ||
                  (!editable && (
                    <button
                      className="flex items-center gap-1 mt-2 text-slate-500"
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
                  ))}
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
            {editable && (
              <div className="flex flex-row items-center justify-between">
                <Button text={'Cancel'} variant={'text'} onClick={editChat} />
                <Button text={'Save'} variant={'text'} />
              </div>
            )}
          </div>
        </div>
      )}
      {!isAgent && (
        <div className="flex items-center gap-2 p-3 text-white bg-purple-100 rounded-xl">
          <p className="flex-1 text-base">{message}</p>
        </div>
      )}
    </TransitionEffect>
  )
}

export default Message
