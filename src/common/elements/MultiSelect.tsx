import { FC, ReactNode } from 'react'
import Select, { StylesConfig } from 'react-select'

const customStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    background: 'rgb(32,34,37)',
    position: 'relative',
    border: 'none',
    paddingTop: '0.3rem',
    paddingBottom: '0.3rem',
    borderRadius: '0.75rem',
    boxShadow: 'none',
    outline: 'none',
    '&:before': {
      content: '" "',
      position: 'absolute',
      inset: 0,
      transition: 'all 0.8s',
      padding: 1,
      background: `conic-gradient(
        from 180deg at 51.95% 52.81%,
        rgba(0, 0, 0, 0.105455) -2.11deg,
        rgba(51, 66, 255, 0) 108.45deg,
        #37f4f4 175.58deg,
        rgba(51, 66, 255, 0) 252.32deg,
        rgba(0, 0, 0, 0.0885149) 310.85deg,
        rgba(0, 0, 0, 0.105455) 357.89deg,
        rgba(51, 66, 255, 0) 491.45deg
      )`,
      mask: `
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0)
      `,
      maskComposite: 'xor',
    },
    '&:active': {
      outline: 'none',
      border: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  placeholder: (base) => {
    return {
      ...base,
      fontSize: '0.875rem',
      color: 'white',
    }
  },
  menu: (base) => ({
    ...base,
    borderRadius: 30,
    marginTop: 4,
  }),
  menuList: (base) => ({
    ...base,
    background: 'rgb(32,34,37)',
    borderRadius: 16,
    overflow: 'hidden',
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      color: 'white',
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: 'rgb(32,34,37)',
      color: '#FFF',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontSize: 13,
      ':active': {
        backgroundColor: 'rgb(32,34,37)',
      },
    }
  },
  indicatorSeparator: () => {
    return {
      display: 'none',
    }
  },
  clearIndicator: () => {
    return {
      display: 'none',
    }
  },
  noOptionsMessage: (base) => {
    return {
      ...base,
      fontSize: 13,
    }
  },
}

export interface MultiSelectOption {
  label: ReactNode
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: MultiSelectOption[]
  placeholder?: string
  onChange?: (values: MultiSelectOption[]) => void
}

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <Select
      options={options}
      isMulti
      value={value}
      styles={customStyles}
      placeholder={placeholder}
      onChange={(e) => {
        onChange && onChange(e as MultiSelectOption[])
      }}
    />
  )
}

export default MultiSelect
