import { FC } from 'react'
import BookmarkItem from './components/BookMarkItem'
import { ImageUrl } from '@/common/utils/constants'

const Bookmarks: FC = () => (
  <div className="flex flex-col gap-4 px-6 py-8 overflow-scroll max-sm:px-5 max-sm:py-2 scrollbar-hide md:full-height max-sm:overflow-y-scroll">
    <BookmarkItem
      text="Hi Ben! As the AI Social Media Sentinel, I've reviewed our recent social media campaign, and I'm glad to say it aligns perfectly with our brand guidelines. The content reflects our brand's unique voice and personality while staying current and engaging. Great job!"
      status="Untitled"
      role="Emily, Social Media Manager"
      image={ImageUrl!}
      type="text"
    />
    <BookmarkItem
      text="Hi Ben! As the AI Social Media Sentinel, I've reviewed our recent social media campaign, and I'm glad to say it aligns perfectly with our brand guidelines. The content reflects our brand's unique voice and personality while staying current and engaging. Great job!"
      status="Untitled"
      role="Emily, Social Media Manager"
      image={ImageUrl!}
      type="file"
      name="File.zip"
      size="1.82 MB"
    />
    <BookmarkItem
      text="Hi Ben! As the AI Social Media Sentinel, I've reviewed our recent social media campaign, and I'm glad to say it aligns perfectly with our brand guidelines. The content reflects our brand's unique voice and personality while staying current and engaging. Great job!"
      status="Untitled"
      role="Emily, Social Media Manager"
      image={ImageUrl!}
      type="link"
      link="https://www.abc.com/file/djdhsufhaNdksdsd?"
    />
    <BookmarkItem
      text="Hi Ben! As the AI Social Media Sentinel, I've reviewed our recent social media campaign, and I'm glad to say it aligns perfectly with our brand guidelines. The content reflects our brand's unique voice and personality while staying current and engaging. Great job!"
      status="Untitled"
      role="Emily, Social Media Manager"
      image={ImageUrl!}
      type="link"
      link="https://www.abc.com/file/djdhsufhaNdksdsd?"
    />
  </div>
)

export default Bookmarks
