import { FC, Fragment } from 'react'
import PageHeader from '@/common/layouts/PageHeader'
import BreadCrumb from '@/common/elements/BreadCrumb'
import { appLinks } from '@/common/utils/constants'
import PageContent from '@/common/layouts/PageContent'
import EditWorkflow from '@/modules/agents/components/Edit/Workflows/Detail'
import { useUserStore } from '@/common/stores/userStore'

const AgentWorkFlowDetailPage: FC = () => {
  const editAgent = useUserStore((state) => state.editAgent)

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
              link: appLinks.edit + `/${editAgent}`,
            },
            {
              text: 'Workflow',
              link: appLinks.edit + `/${editAgent}`,
            },
            {
              text: 'Workflow Detail',
              link: '',
            },
          ]}
        />
      </PageHeader>
      <PageContent>
        <EditWorkflow />
      </PageContent>
    </Fragment>
  )
}

export default AgentWorkFlowDetailPage
