import { FC } from 'react'
import PageHeader from '@/common/layouts/PageHeader'
import BreadCrumb from '@/common/elements/BreadCrumb'
import { appLinks } from '@/common/utils/constants'
import PageContent from '@/common/layouts/PageContent'
import AgentChat from '@/modules/chats'

const AgentsEditPage: FC = () => (
  <>
    <PageHeader>
      <BreadCrumb
        crumbs={[
          {
            text: 'Agents',
            link: appLinks.agents,
          },
          {
            text: 'Agent Chat',
            link: '',
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <AgentChat />
    </PageContent>
  </>
)

export default AgentsEditPage
