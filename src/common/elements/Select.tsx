import { FC, Fragment, useEffect, useState } from 'react'
import { Transition, Combobox } from '@headlessui/react'
import { classNames } from '../utils'
import { Arrow, Check, Spinner } from '../components/Icons'

export interface IOption {
  id: string | number
  label: string
  value?: number
}

export interface SelectProps {
  options: Array<IOption>
  value: IOption
  onChange: (value: IOption) => void
  className?: string
  isLoading?: boolean
  selectClass?: string
  isSearchable?: boolean
  disabled?: boolean
  size?: 'small' | 'normal'
}

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
  isLoading,
  selectClass,
  isSearchable = false,
  disabled = false,
  size = 'normal',
}) => {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState(options)

  useEffect(() => {
    setFiltered(
      options.filter(
        (option) =>
          option.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    )
  }, [query, options])

  return (
    <Combobox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <Fragment>
          <div
            className={classNames('relative form-container', className || '')}
          >
            {isSearchable ? (
              <>
                <Combobox.Input
                  className={classNames(
                    'relative h-full w-full z-10 cursor-text rounded-xl border px-2 py-3.5 bg-gray-600 focus:outline-none sm:text-sm border-none text-white'
                  )}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                  displayValue={() => value.label}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none">
                  <Arrow />
                </Combobox.Button>
              </>
            ) : (
              <Combobox.Button
                className={classNames(
                  selectClass ||
                    'relative h-full w-full form-container cursor-default rounded-xl px-2 py-3.5 text-left bg-gray-600 text-white text-sm hover:cursor-pointer',
                  size === 'small' ? 'py-1 text-sm' : 'py-2'
                )}
              >
                <span className="block text-left truncate">
                  {isLoading && <Spinner />}
                  {isLoading && (
                    <span className="absolute top-0 bottom-0 left-0 right-0 bg-gray-600 opacity-30" />
                  )}
                  {value.label}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Arrow />
                </span>
              </Combobox.Button>
            )}

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="py-1.5 absolute z-[200] mt-1 max-h-60 w-full overflow-auto rounded-xl bg-gray-600 text-base shadow-lg ring-opacity-5 focus:outline-none hover:cursor-pointer scrollbar-hide">
                {filtered.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'bg-gray-600'
                          : 'text-gray-900 rounded-xl px-3',
                        'relative cursor-pointer select-none py-2 px-3 hover:bg-gray-400'
                      )
                    }
                    value={option}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={classNames(
                          'break-all flex-1 text-sm text-white',
                          size === 'small' ? 'text-xs' : 'text-sm'
                        )}
                      >
                        {option.label}
                      </span>

                      {value.id === option.id && (
                        <span className="flex items-center">
                          <Check />
                        </span>
                      )}
                    </div>
                  </Combobox.Option>
                ))}
                {filtered.length === 0 && (
                  <div className="p-2 text-sm text-white">Nothing found</div>
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Fragment>
      )}
    </Combobox>
  )
}

Select.defaultProps = {
  className: '',
  isLoading: false,
}

export default Select
