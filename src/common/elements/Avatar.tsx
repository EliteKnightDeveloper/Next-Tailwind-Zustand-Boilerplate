import { ChangeEvent, FC } from 'react'
import Image, { ImageProps as NextImageProps } from 'next/image'
import { classNames } from '@/common/utils'
import { SidebarEdit } from '../components/Icons'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type AvatarProps = {
  width?: number
  height?: number
  badgeWidth?: number
  badgeHeight?: number
  border?: boolean
  isHuman?: boolean
  src: string | StaticImport
  alt: string
  badgeIcon?: string
  onClickBadge?: (e: ChangeEvent<HTMLInputElement>) => void
} & NextImageProps

const Avatar: FC<AvatarProps> = ({
  height,
  width,
  badgeHeight,
  badgeWidth,
  border,
  isHuman,
  src,
  alt,
  badgeIcon,
  onClickBadge,
  className,
  ...props
}) => {
  const colorClass = isHuman ? 'border-orange' : 'border-neon-100'
  const borderClass = border ? 'border-2' : ''

  return (
    <div className="relative z-10 inline-block h-fit">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        {...props}
        className={classNames(
          'flex items-center justify-center rounded-full',
          colorClass,
          borderClass,
          className ? className : ''
        )}
        priority
      />
      {badgeIcon === 'icon' ? (
        <span
          className={`flex justify-center items-center absolute bottom-0 right-0 h-${badgeHeight} w-${badgeWidth} rounded-full ring-1 ring-[#0C0D10] bg-gray-500 text-white hover:text-neon-100 cursor-pointer`}
        >
          <input
            className="absolute left-0 right-0 opacity-0"
            type="file"
            accept="image/*"
            onChange={onClickBadge}
          />
          <SidebarEdit />
        </span>
      ) : badgeIcon === 'status' ? (
        <span className="absolute bottom-0 right-0 block h-[9px] w-[9px] rounded-full ring-2 ring-[#2D2E31] bg-[#219653]"></span>
      ) : (
        ''
      )}
    </div>
  )
}

export default Avatar
