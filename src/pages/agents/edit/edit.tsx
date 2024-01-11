import { FC, Fragment } from 'react'
import PageHeader from '@/common/layouts/PageHeader'
import EditAgent from '@/modules/agents/components/Edit'
import BreadCrumb from '@/common/elements/BreadCrumb'
import { appLinks } from '@/common/utils/constants'
import PageContent from '@/common/layouts/PageContent'

const AgentsEditPage: FC = () => {
  return (
    <Fragment>
      <PageHeader>
        <BreadCrumb
          crumbs={[
            {
              text: 'Agents',
              link: appLinks.agents,
            },
            {
              text: 'Edit Agent',
              link: '',
            },
          ]}
        />
      </PageHeader>
      <PageContent>
        <EditAgent />
      </PageContent>
    </Fragment>
  )
}

export default AgentsEditPage
