import { FC, Fragment, useState } from 'react'
import DataTable from '@/common/components/DataTable'
import Toggle from '@/common/elements/Toggle'

interface APIKeys {
  id: number
  keys: string
  status: boolean
  expire: string
  domain: string
}

const data: APIKeys[] = [
  {
    id: 0,
    keys: '19KDadsfadf2eHHHHadads8eqrwe',
    status: true,
    expire: '04/16/2023',
    domain: 'https://www.azara.ai',
  },
  {
    id: 1,
    keys: '19KDadsfadf2eHHHHadads8eqrwe',
    status: false,
    expire: '04/16/2023',
    domain: 'https://www.azara.ai',
  },
]

const APIKeys: FC = () => {
  const [apis, setAPIS] = useState<APIKeys[]>(data)

  const onToggle = (index: number) => {
    setAPIS((prevItems) => {
      prevItems[index] = {
        ...prevItems[index],
        status: !prevItems[index].status,
      }
      return [...prevItems]
    })
  }

  return (
    <Fragment>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-100 max-sm:text-base">
          API Keys
        </span>
        <span className="mt-2 text-sm font-normal text-gray-300">
          They play a crucial role in securing and controlling access to web
          services, data, or functionalities provided by various online
          platforms, applications, or services.
        </span>
      </div>
      <div className="mt-4 max-sm:overflow-x-scroll scrollbar-hide">
        <DataTable
          data={apis}
          columns={[
            {
              name: 'Keys',
              cell: (row) => (
                <span className="text-sm font-normal text-white w-max">
                  {row.keys}
                </span>
              ),
            },
            {
              name: 'Active',
              cell: (row) => (
                <span className="text-sm font-normal text-white w-max">
                  {row.status && (
                    <div className="flex flex-row items-center gap-4">
                      <Toggle
                        onToggle={() => {
                          onToggle(row.id)
                        }}
                        checked={row.status}
                      />
                      <span>Active</span>
                    </div>
                  )}
                  {!row.status && (
                    <div className="flex flex-row items-center gap-4">
                      <Toggle
                        onToggle={() => {
                          onToggle(row.id)
                        }}
                        checked={row.status}
                      />
                      <span>Inactive</span>
                    </div>
                  )}
                </span>
              ),
            },
            {
              name: 'Expire',
              cell: (row) => (
                <span className="text-sm font-normal text-white">
                  {row.expire}
                </span>
              ),
            },
            {
              name: 'Domain',
              cell: (row) => (
                <span className="text-sm font-semibold text-white">
                  {row.domain}
                </span>
              ),
            },
          ]}
        />
      </div>
    </Fragment>
  )
}

export default APIKeys
