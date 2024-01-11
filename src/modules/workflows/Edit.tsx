import { FC } from 'react'
import TabWidget from '@/common/elements/TabWidget'
import Workflow from './components/Workflow'
import Escalation from './components/Escalation'

const EditWorkFlow: FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 py-3 max-sm:px-5 max-sm:py-2">
      <TabWidget
        tabs={[
          {
            title: 'Workflow',
            content: <Workflow />,
          },
          {
            title: 'Escalations',
            content: <Escalation />,
          },
        ]}
        activeTab={0}
      />
    </div>
  )
}

export default EditWorkFlow
