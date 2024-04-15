import { FC, useState } from 'react'
import { classNames } from '@/common/utils'
import React from 'react'

export interface TextAreaProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['textarea']> {}

const Textarea: FC<TextAreaProps> = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, ...props }, ref) => {
  const [hasFocus, setHasFocus] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
    props.onChange && props.onChange(e)
  }

  return (
    <div
      className={classNames(
        'form-container w-full pr-1.5',
        hasFocus ? 'active' : ''
      )}
    >
      <textarea
        {...props}
        className={classNames(
          'bg-transparent text-white px-2 py-3.5 relative outline-none text-sm w-full',
          className ? className : ''
        )}
        onFocus={() => {
          setHasFocus(true)
        }}
        onBlur={() => {
          setHasFocus(false)
        }}
        onChange={handleChange}
        ref={ref}
      />
    </div>
  )
})

export default Textarea
