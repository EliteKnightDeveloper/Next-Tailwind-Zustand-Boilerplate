import { FC, useState } from 'react'
import { classNames } from '@/common/utils'
import React from 'react'

export interface InputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  fullBorder?: boolean
  xs?: 'sm' | 'md' | 'lg'
  icon?: JSX.Element | null
  position?: string
  color?: 'dark' | 'light'
}

const Input: FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      icon,
      fullBorder = false,
      xs = 'lg',
      position,
      color = 'dark',
      ...props
    },
    ref
  ) => {
    const [hasFocus, setHasFocus] = useState(false)

    return (
      <div
        className={classNames(
          'flex items-center relative',
          hasFocus ? 'active' : '',
          fullBorder ? 'full-border bg-transparent' : '',
          className ? className : '',
          color === 'dark' ? 'form-container' : 'bg-white rounded-xl'
        )}
      >
        {position === 'start' && <div className="ml-2">{icon}</div>}
        <input
          {...props}
          className={classNames(
            'bg-transparent px-2 relative outline-none  text-sm w-full',
            color === 'dark' ? 'text-white' : 'text-black',
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
