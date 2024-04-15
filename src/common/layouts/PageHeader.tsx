import { FC, HtmlHTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { classNames } from '../utils'
import { inDevEnvironment } from '../utils/devenv'
import { useUserStore } from '../stores/userStore'

interface PageHeaderProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

const PageHeader: FC<PageHeaderProps> = ({ children, className }) => {
  const [scrolled, setScrolled] = useState(false)
  const [version, setVersion] = useState()
  const [url, setUrl] = useState<string>()
  const [tenant] = useUserStore((state) => [state.tenant])

  const fetchVersion = async () => {
    try {
      const response = await fetch('/api/version')
      const data = await response.json()
      setVersion(data.version)
    } catch (error) {
      console.error('Error fetching version:', error)
    }
  }

  useEffect(() => {
    fetchVersion()
    setUrl(window.location.origin)
  }, [])

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    const [url, setUrl] = useState<string>()
    const [tenant] = useUserStore((state) => [state.tenant])
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={classNames(
        className ? className : '',
        'flex flex-row w-full items-center justify-between bg-[#11171C80] px-6 py-4 border-b border-gray-500 border-opacity-50 sticky top-0 z-[500] max-sm:top-[75px] max-sm:z-30 max-sm:px-5 max-sm:py-2',
        scrolled
          ? 'max-sm:bg-[#11171C80] max-sm:border-slate-800'
          : 'max-sm:bg-transparent max-sm:border-transparent'
      )}
    >
      {children}
      {inDevEnvironment && (
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-white max-sm:hidden leading-[1]">
            FE: {url} v{version}
          </span>
          <span className="text-[10px] font-medium text-white max-sm:hidden leading-[1]">
            BE: {`https://${tenant}.azara-ai.com`}
          </span>
        </div>
      )}
    </div>
  )
}

export default PageHeader
