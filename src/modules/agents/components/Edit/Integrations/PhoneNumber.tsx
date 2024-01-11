import { FC, useEffect, useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { Cross, Minus } from '@/common/components/Icons'
import Modal, { ModalProps } from '@/common/elements/Modal'
import Button from '@/common/elements/Button'
import { formatPhoneNumber } from '@/common/utils'
import { usePopup } from '@/common/hooks/usePopup'
import parsePhoneNumber from 'libphonenumber-js'

const isPhoneValid = (phone: string) => {
  try {
    return parsePhoneNumber(phone)?.isValid()
  } catch (error) {
    return false
  }
}

interface PhoneNumberProps extends ModalProps {
  onSave: (
    addedNumbers: string[],
    removedNumbers: string[],
    numbers: string[]
  ) => void
  isLoading: boolean
  defaultNumbers: string[]
}

const PhoneNumber: FC<PhoneNumberProps> = ({
  isOpen,
  onSave,
  onClose,
  isLoading,
  defaultNumbers,
}) => {
  const [phone, setPhone] = useState('12345678910')
  const [numbers, setNumbers] = useState<string[]>([])
  const isValid = isPhoneValid(phone)
  const { showConfirm, hideConfirm } = usePopup()

  useEffect(() => {
    setNumbers(defaultNumbers)
  }, [defaultNumbers])

  const onClickSubmit = () => {
    onSave(
      numbers
        .filter((item) => !defaultNumbers.includes(item))
        .map((item) => item.replace(/\D/g, '')),
      defaultNumbers
        .filter((item) => !numbers.includes(item))
        .map((item) => item.replace(/\D/g, '')),
      numbers.map((item) => item.replace(/\D/g, ''))
    )
  }

  const onAdd = () => {
    const num = formatPhoneNumber(phone.replace(/\D/g, ''))
    if (!isValid) return
    if (numbers.indexOf(num) !== -1) return

    setNumbers([...numbers, num.slice(1, num.length)])
  }

  const onRemove = (index: number) => {
    showConfirm({
      title: 'Remove this phone number?',
      confirmText: 'Remove',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setNumbers(numbers.filter((_, _index) => _index !== index))
        hideConfirm()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[350px] max-sm:w-full p-6">
        <div className="relative z-10 flex justify-between">
          <span className="text-lg font-semibold text-white">Phone number</span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={onClose}
          >
            <Cross />
          </div>
        </div>
        <div className="flex w-full gap-4 mt-4">
          <div className="flex flex-col w-full gap- flex-1 z-[2] relative">
            <PhoneInput
              defaultCountry="us"
              value={phone}
              onChange={(phone) => {
                setPhone(phone)
              }}
            />
            {!isValid && (
              <span className="mt-1 text-sm text-red">
                Please type valid phone number.
              </span>
            )}
          </div>
          <div className="relative z-[3]">
            <Button text="Add" variant="solid" onClick={onAdd} />
          </div>
        </div>
        {numbers.length !== 0 && (
          <div className="mt-4 flex flex-col bg-gray-600 px-2 py-1 rounded-lg relative z-[1] divide-y divide-[#4c535d]">
            {numbers.map((number, index) => (
              <div
                className="flex justify-between py-2 text-sm text-white"
                key={index}
              >
                <h3>{number}</h3>
                <div
                  className="p-1 bg-gray-500 rounded-full hover:cursor-pointer"
                  onClick={() => onRemove(index)}
                >
                  <Minus />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="relative z-[1] flex justify-between w-full mt-4">
          <Button text="Cancel" variant="text" onClick={onClose} />
          <Button
            text="Submit"
            type="submit"
            onClick={onClickSubmit}
            disabled={!isValid || isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  )
}

export default PhoneNumber
