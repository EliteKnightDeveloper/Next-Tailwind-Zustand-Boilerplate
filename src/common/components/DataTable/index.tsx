import { FC } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import Pagination from './Pagination'
import { paginationOptions } from './types'

interface CustomDataTableProps<T, K extends keyof T> {
  data: T[]
  columns: TableColumn<K>[]
  pagination?: boolean
}

const CustomDataTable: FC<CustomDataTableProps<any, any>> = ({
  data,
  columns,
  pagination = false,
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={{
        responsiveWrapper: {
          style: {
            overflow: 'visible'
          }
        },
        table: {
          style: {
            background: 'transparent',
          },
        },
        head: {
          style: {
            borderRadius: 12,
            overflow: 'hidden',
            background: 'transparent',
          },
        },
        headRow: {
          style: {
            background: '#202225',
            fontSize: 14,
          },
        },
        headCells: {
          style: {
            backgroundColor: '#202225',
            color: '#7D828B',
          },
        },
        rows: {
          style: {
            background: 'transparent',
          },
        },
        pagination: {
          style: {
            background: 'transparent',
          },
        },
      }}
      pagination={pagination}
      paginationRowsPerPageOptions={paginationOptions}
      paginationComponent={Pagination}
    />
  )
}

export default CustomDataTable
