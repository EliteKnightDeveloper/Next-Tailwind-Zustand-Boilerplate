import { FC, Fragment } from 'react'
import PageHeader from '@/common/layouts/PageHeader'
import BreadCrumb from '@/common/elements/BreadCrumb'
import PageContent from '@/common/layouts/PageContent'
import ChatLog from '@/modules/chatlogs'

const AgentChatLogPage: FC = () => {
  return (
    <Fragment>
      <PageHeader>
        <BreadCrumb
          crumbs={[
            {
              text: 'Inbox',
              link: '',
            },
          ]}
        />
      </PageHeader>
      <PageContent>
        <ChatLog />
      </PageContent>
    </Fragment>
  )
}

export default AgentChatLogPage
