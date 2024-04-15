import { FC } from 'react'
import Image from 'next/image'
import WritingGif from '~/static/gif/Writing.gif'

const Writing: FC = () => (
  <div className="flex items-center gap-2 py-2" role="Writing">
    <Image src={WritingGif} alt="writing" width={20} />
    <h3 className="text-neon-100 text-sm font-semibold">Writing</h3>
  </div>
)

export default Writing
