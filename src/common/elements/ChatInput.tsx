import { FC, useState } from 'react'
import { classNames } from '@/common/utils'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import type { TextareaAutosizeProps } from 'react-textarea-autosize'

export interface InputProps
  extends React.PropsWithoutRef<TextareaAutosizeProps> {
  fullBorder?: boolean
  xs?: 'sm' | 'md' | 'lg'
  icon?: JSX.Element | null
  position?: string
}

const ChatInput: FC<InputProps> = React.forwardRef<
  HTMLTextAreaElement,
  InputProps
>(
  (
    { className, icon, fullBorder = false, xs = 'lg', position, ...props },
    ref
  ) => {
    const [hasFocus, setHasFocus] = useState(false)

    return (
      <div
        className={classNames(
          'flex items-center form-container relative',
          hasFocus ? 'active' : '',
          fullBorder ? 'full-border bg-transparent' : '',
          className ? className : ''
        )}
      >
        {position === 'start' && <div className="ml-2">{icon}</div>}
        <TextareaAutosize
          {...props}
          className={classNames(
            'bg-transparent text-white px-2 relative outline-none text-sm w-full resize-none',
            xs === 'lg' ? 'py-3.5' : '',
            xs === 'md' ? 'py-2.5' : '',
            xs === 'sm' ? 'py-1.5' : ''
          )}
          onFocus={() => {
            setHasFocus(true)
          }}
          onBlur={(e) => {
            setHasFocus(false)
            props.onBlur && props.onBlur(e)
          }}
          minRows={1}
          maxRows={6}
          ref={ref}
          autoComplete="off"
        />
        {position === 'end' && (
          <div className="flex items-center mr-2 ">{icon}</div>
        )}
      </div>
    )
  }
)

export default ChatInput
