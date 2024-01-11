import { FC } from "react";
import Image from 'next/image';
import ThinkingGif from '~/static/gif/Thinking.gif';
import Avatar from '@/common/elements/Avatar'
import { ImageUrl } from '@/common/utils/constants'

interface ThinkingProps {
  image: string
}

const Thinking: FC<ThinkingProps> = ({
  image
}) => (
  <div className="flex items-center gap-2">
    <Avatar
      src={ImageUrl + '/' + image}
      alt="Agent"
      width={32}
      height={32}
      border
      isHuman={false}
      className="w-[32px] h-[32px]"
    />
    <div className="flex items-center gap-2 px-2 pt-1">
      <Image src={ThinkingGif} alt='thinking' width={20} />
      <h3 className="text-neon-100 text-sm font-semibold">Thinking</h3>
    </div>
  </div>
);

export default Thinking;
