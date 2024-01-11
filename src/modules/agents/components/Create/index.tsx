import { FC, Fragment } from 'react'
import TabWidget from '@/common/elements/TabWidget'
import Agent from './Agent'

const CreateAgent: FC = () => {
  return (
    <Fragment>
      <div className="flex justify-center">
        <div className="flex flex-row items-baseline justify-between w-full px-6 py-3 transition-all">
          <div className="relative w-full">
            <div className="flex flex-col w-full">
              <TabWidget
                tabs={[
                  {
                    title: 'Create Agent',
                    content: <Agent />,
                  },
                ]}
                activeTab={0}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateAgent
