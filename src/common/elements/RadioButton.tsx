import { FC } from 'react'
import { RatioChecked, RatioUnchecked } from '@/common/components/Icons'
import { classNames } from '../utils'

interface RadioButtonProps {
  checked: boolean
  label: string
  onClick: () => void
}

const RadioButton: FC<RadioButtonProps> = ({ checked, label, onClick }) => (
  <div
    className="flex items-center gap-2 cursor-pointer hover:opacity-90 active:opacity-100"
    onClick={onClick}
  >
    {checked ? <RatioChecked /> : <RatioUnchecked />}
    <h3 className="text-sm text-white">{label}</h3>
  </div>
)

export default RadioButton
