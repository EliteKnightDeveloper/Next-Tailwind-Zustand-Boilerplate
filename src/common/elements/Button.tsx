import { FC, MouseEventHandler } from 'react'
import { classNames } from '@/common/utils'
import { Spinner } from '@/common/components/Icons'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  variant?: 'gradient' | 'solid' | 'text' | ''
  width?: 'fit-parent' | 'fit-content'
  isLoading?: boolean
  icon?: JSX.Element | null
  iconPosition?: 'start' | 'end'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Button: FC<ButtonProps> = ({
  color = 'white',
  text,
  variant = 'gradient',
  width = 'fit-content',
  className,
  isLoading = false,
  icon,
  iconPosition = 'start',
  disabled,
  size = 'lg',
  ...props
}) => {
  const widthClass = width === 'fit-content' ? 'w-fit' : 'w-full'
  const iconElem = (
    <span
      className={classNames(
        isLoading ? 'spinner' : '',
        text ? (iconPosition === 'start' ? 'mr-2' : 'ml-2') : ''
      )}
    >
      {isLoading ? <Spinner /> : icon}
    </span>
  )

  const sizeClass = classNames(
    size === 'xs' ? 'px-1 py-1 rounded-sm' : '',
    size === 'sm' ? 'px-2.5 py-1.5 rounded-xl text-sm' : '',
    size === 'md' ? 'px-2.5 py-1.5 rounded-xl' : '',
    size === 'lg' ? 'px-2.5 py-3 rounded-xl' : '',
    size === 'xl' ? 'px-6 py-4 rounded-xl' : ''
  )

  const backgroundClass = classNames(
    variant === 'gradient' ? 'text-white' : '',
    variant === 'solid'
      ? 'text-white bg-gray-500 border border-gray-500 hover:border-neon-100 active:bg-gray-600 active:border-gray-600 disabled:bg-gray-500 disabled:text-gray-100'
      : '',
    variant === 'text'
      ? classNames(
          color === 'white'
            ? 'text-white hover:text-neon-100 active:text-neon-300'
            : '',
          color === 'red'
            ? 'text-[#ED4245] hover:text-[#9b0103] active:text-[#ED4245]'
            : ''
        )
      : ''
  )

  return (
    <button
      {...props}
      className={classNames(
        'flex items-center justify-center font-semibold h-fit cursor-pointer transition-all duration-100 outline-none break-keep disabled:cursor-not-allowed',
        variant,
        widthClass,
        sizeClass,
        backgroundClass,
        className ? className : ''
      )}
      disabled={disabled || isLoading}
    >
      {iconPosition === 'start' && icon && iconElem}
      {isLoading && !icon && (
        <div className="mr-2 spinner">
          <Spinner />
        </div>
      )}
      {text}
      {iconPosition === 'end' && icon && iconElem}
    </button>
  )
}

export default Button
