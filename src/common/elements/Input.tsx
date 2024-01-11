import { FC, useState } from 'react'
import { classNames } from '@/common/utils'
import React from 'react'

export interface InputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  fullBorder?: boolean
  xs?: 'sm' | 'md' | 'lg'
  icon?: JSX.Element | null
  position?: string
}

const Input: FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
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
        <input
          {...props}
          className={classNames(
            'bg-transparent text-white px-2 relative outline-none  text-sm w-full',
            xs === 'lg' ? 'py-3.5' : '',
            xs === 'md' ? 'py-2.5' : '',
            xs === 'sm' ? 'py-1.5' : ''
          )}
          onFocus={() => {
            setHasFocus(true)
          }}
          onBlur={() => {
            setHasFocus(false)
          }}
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

export default Input
