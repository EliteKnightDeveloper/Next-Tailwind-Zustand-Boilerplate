import { FC } from 'react'

interface ToggleProps {
  text?: string
  role?: string
  checked: boolean
  onToggle: () => void
}

const Toggle: FC<ToggleProps> = ({ text, checked = false, onToggle, role }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        className="sr-only peer relative z-[100]"
        onClick={onToggle}
        onChange={() => { }}
        role={role}
      />
      <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-gradient-to-r peer-checked:from-darkGradientStart peer-checked:to-darkGradientEnd"></div>
      <span className="ml-2 text-sm font-medium text-white">
        {text && text}
      </span>
    </label>
  )
}

export default Toggle
