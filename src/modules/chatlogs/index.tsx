import { FC, useState, Fragment } from 'react'
import ChatLogs from './components/ChatLogs'
import TabWidget from '@/common/elements/TabWidget'
import Escalations from './components/Escalations'
import ContactsData from './components/Contacts'
import { classNames } from '@/common/utils'
import { useThemeStore } from '@/common/stores/themeStore'
import ChatLogbar from './components/ChatLogBar'
import { Expand, Quote, Upload } from '@/common/components/Icons'
import MobileChatLogBar from './components/MobileChatLogBar'
import Button from '@/common/elements/Button'

const ChatLog: FC = () => {
  const [
    isChatLogBarCollapsed,
    isMobileChatLogBarCollapsed,
    setMobileChatLogBarCollapsed,
  ] = useThemeStore((state) => [
    state.isChatLogBarCollapsed,
    state.isMobileChatLogBarCollapsed,
    state.setMobileChatLogBarCollapsed,
  ])

  const [active, setActive] = useState<number>(0)

  const getTabIndex = (index: number) => {
    setActive(index)
  }

  return (
    <Fragment>
      <div className="flex flex-row justify-center max-sm:flex-col">
        <div
          className={classNames(
            'flex flex-row justify-between items-baseline w-full px-6 py-3 transition-all max-sm:px-5 max-sm:py-2 max-sm:items-start',
            isChatLogBarCollapsed && active === 0
              ? 'pr-[470px] max-2xl:pr-[320px]'
              : '',
            !isChatLogBarCollapsed && active === 0 ? 'pr-[90px]' : ''
          )}
        >
          <div className="w-full sm:relative">
            <div className="flex flex-col justify-between w-full max-sm:mt-4">
              <TabWidget
                tabs={[
                  {
                    title: 'Agent Chat Log',
                    content: <ChatLogs />,
                  },
                  // {
                  //   title: 'Escalations',
                  //   content: <Escalations />,
                  // },
                  {
                    title: 'All Contacts',
                    content: <ContactsData />,
                  },
                ]}
                activeTab={0}
                onTabClick={getTabIndex}
              />
            </div>
          </div>
        </div>
        {active === 0 && (
          <>
            <div
              className={classNames(
                isChatLogBarCollapsed
                  ? 'w-[450px] max-2xl:w-[300px]'
                  : 'w-[80px]',
                '-mr-0 fixed right-0 transition-all max-sm:hidden'
              )}
            >
              <ChatLogbar />
            </div>
            <div
              className={classNames(
                isMobileChatLogBarCollapsed
                  ? 'fixed bottom-0 h-[calc(100%-6.9rem)]'
                  : 'md:hidden flex flex-col fixed bottom-0 right-0 left-0 fit-content  overflow-y-scroll  scrollbar-hide max-sm:h-16 bg-gradient-to-r from-[#46577BCC] to-[#492D4DCC]',
                'flex flex-col justify-center items-center w-full z-[1000]'
              )}
            >
              {!isMobileChatLogBarCollapsed && (
                <div className="flex flex-row items-center justify-between w-full gap-4 px-5">
                  <div>
                    <button
                      className="p-2 text-gray-300 -rotate-90 bg-gray-500 rounded-xl"
                      onClick={() =>
                        setMobileChatLogBarCollapsed(
                          !isMobileChatLogBarCollapsed
                        )
                      }
                    >
                      <Expand />
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-center gap-3">
                      <span className="text-lg font-semibold text-white">
                        Chat History
                      </span>
                      {/* <Quote /> */}
                    </div>
                    <Button
                      text="Export"
                      variant="gradient"
                      icon={<Upload />}
                    />
                  </div>
                </div>
              )}
              {isMobileChatLogBarCollapsed && (
                <div className="flex flex-col items-center justify-between w-full sm:hidden h-[calc(100%)]">
                  <MobileChatLogBar />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Fragment>
  )
}

export default ChatLog
