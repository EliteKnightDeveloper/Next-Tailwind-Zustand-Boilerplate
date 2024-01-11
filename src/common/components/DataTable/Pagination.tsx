import { FC, useMemo, Fragment } from 'react'
import { PaginationComponentProps } from 'react-data-table-component'
import Select, { IOption } from '@/common/elements/Select'
import { paginationOptions } from './types'
import Button from '@/common/elements/Button'
import { classNames } from '@/common/utils'
import { MoreHorz } from '../Icons'

const options: IOption[] = paginationOptions.map((n) => ({
  id: n,
  label: n.toString(),
}))

const Pagination: FC<PaginationComponentProps> = ({
  currentPage,
  onChangePage,
  rowCount,
  rowsPerPage,
  onChangeRowsPerPage,
}) => {
  const [totalPages, range, showLast, showFirst] = useMemo(() => {
    const _totalPages = Math.floor(rowCount / rowsPerPage),
      _pages = [...new Array(_totalPages)].map((_, idx) => ({ id: idx + 1 })),
      _range =
        _totalPages < 6
          ? _pages
          : currentPage < 4
          ? _pages.slice(0, 3)
          : currentPage > _totalPages - 2
          ? _pages.slice(_totalPages - 3)
          : _pages.slice(currentPage - 3, currentPage),
      _showLast = currentPage <= _totalPages - 2
    return [_totalPages, _range, _showLast, !_showLast]
  }, [rowCount, rowsPerPage, currentPage])

  const onPrevious = () => {
    if (currentPage <= 1) return
    onChangePage(currentPage - 1, rowCount)
  }

  const onNext = () => {
    if (currentPage === totalPages) return
    onChangePage(currentPage + 1, rowCount)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 text-xs text-white">
        <Button
          text="<"
          variant="text"
          disabled={currentPage <= 1}
          onClick={onPrevious}
        />
        <div className="flex items-center gap-1">
          {showFirst && totalPages > 5 && (
            <Fragment>
              <button
                onClick={() => {
                  onChangePage(1, rowCount)
                }}
                className={classNames(
                  currentPage === 1 ? 'bg-blue-500 text-white' : '',
                  'h-8 w-8 rounded-md'
                )}
              >
                {1}
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 text-center rounded-md text-slate-700"
                onClick={onPrevious}
              >
                <MoreHorz />
              </button>
            </Fragment>
          )}

          {range?.map(({ id }) => (
            <button
              key={id}
              onClick={() => {
                onChangePage(~~id, rowCount)
              }}
              className={classNames(
                id === currentPage
                  ? 'bg-gradient-to-r from-darkGradientStart to-darkGradientEnd'
                  : '',
                'h-8 w-8 rounded-md'
              )}
            >
              {id}
            </button>
          ))}

          {showLast && totalPages > 5 && (
            <Fragment>
              <button
                className="flex items-center justify-center w-8 h-8 text-center rounded-md text-slate-700"
                onClick={() => {
                  onChangePage(currentPage + 1, rowCount)
                }}
              >
                <MoreHorz />
              </button>
              <button
                onClick={() => {
                  onChangePage(totalPages, rowCount)
                }}
                className={classNames(
                  totalPages === currentPage ? 'bg-slate-100' : '',
                  'h-8 w-8  rounded-md'
                )}
              >
                {totalPages}
              </button>
            </Fragment>
          )}
          <Button
            text=">"
            variant="text"
            disabled={currentPage >= totalPages}
            onClick={onNext}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-[#475064] text-xs">
        Rows per page
        <Select
          options={options}
          value={options.find((option) => option.id === rowsPerPage)!}
          onChange={(val) => {
            onChangeRowsPerPage(~~val.id, currentPage)
          }}
          size="small"
        />
      </div>
    </div>
  )
}

export default Pagination
