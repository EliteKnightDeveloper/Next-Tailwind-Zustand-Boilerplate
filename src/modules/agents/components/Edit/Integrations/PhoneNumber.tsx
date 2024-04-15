import { FC, useEffect, useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { Cross, Minus, Quote } from '@/common/components/Icons'
import Modal, { ModalProps } from '@/common/elements/Modal'
import Button from '@/common/elements/Button'
import { formatPhoneNumber } from '@/common/utils'
import { usePopup } from '@/common/hooks/usePopup'
import parsePhoneNumber from 'libphonenumber-js'
import RadioButton from '@/common/elements/RadioButton'
import Input from '@/common/elements/Input'
import { useNotifications } from '@/hooks/useNotifications'
import Tooltip from '@/common/elements/Tooltip'

const isPhoneValid = (phone: string) => {
  try {
    return parsePhoneNumber(phone)?.isValid()
  } catch (error) {
    return false
  }
}

interface PhoneNumberProps extends ModalProps {
  onSave: (
    agentNumber: string,
    oldAgentNumber: string,
    isPublic: boolean,
    previousPublic: boolean,
    addedAgentNumbers: string[],
    addedCustomerNumbers: string[],
    removedNumbers: string[],
    oldCustomerNames: string[],
    numbers: WhatsAppNumber[]
  ) => void
  isLoading: boolean
  defaultNumbers: WhatsAppNumber[]
}

const PhoneNumber: FC<PhoneNumberProps> = ({
  isOpen,
  onSave,
  onClose,
  isLoading,
  defaultNumbers,
}) => {
  const [phone, setPhone] = useState('12345678910')
  const [agentPhone, setAgentPhone] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [numbers, setNumbers] = useState<string[]>([])
  const [customerNames, setCustomerNames] = useState<string[]>([])
  const isValid = isPhoneValid(phone)
  const [isPublic, setPublic] = useState(true)
  const { showConfirm, hideConfirm } = usePopup()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (defaultNumbers.length > 0) {
      setAgentPhone(defaultNumbers[0].agent_number)
      setNumbers(
        defaultNumbers
          .filter((number) => number.user_number)
          .map((number) => number.user_number)
      )
      setCustomerNames(
        defaultNumbers
          .filter((number) => number.username)
          .map((number) => number.username)
      )
      setPublic(defaultNumbers.length === 0 || !defaultNumbers[0].user_number)
    }
  }, [defaultNumbers])

  const onClickSubmit = () => {
    if (!isPhoneValid(agentPhone)) {
      addNotification({
        type: 'Fail',
        text: 'Please type valid agent phone number.',
      })
      return
    }
    if (!isPublic && numbers.length === 0) {
      addNotification({
        type: 'Fail',
        text: 'Please add at least one customer number.',
      })
      return
    }

    // formatPhoneNumber(number.user_number).slice(1, formatPhoneNumber(number.user_number).length)

    onSave(
      agentPhone.replace(/\D/g, ''),
      defaultNumbers.length > 0
        ? defaultNumbers[0].agent_number.replace(/\D/g, '')
        : '',
      isPublic,
      defaultNumbers.length === 0 || !defaultNumbers[0].user_number,
      numbers
        .filter(
          (item) =>
            !defaultNumbers.map((number) => number.user_number).includes(item)
        )
        .map((item) => item.replace(/\D/g, '')),
      isPublic
        ? defaultNumbers.map((number) => number.user_number)
        : defaultNumbers
            .map((number) => number.user_number)
            .filter((item) => !numbers.includes(item))
            .map((item) => item.replace(/\D/g, '')),
      customerNames,
      defaultNumbers
        .filter((number) => number.username)
        .map((number) => number.username),
      isPublic
        ? [
            {
              agent_id: '',
              agent_number: agentPhone.replace(/\D/g, ''),
              user_number: '',
              username: '',
              id: '',
              is_active: true,
            },
          ]
        : numbers.map((number, index) => ({
            agent_id: '',
            agent_number: agentPhone.replace(/\D/g, ''),
            user_number: number.replace(/\D/g, ''),
            username: customerNames[index],
            id: '',
            is_active: true,
          }))
    )
  }

  const onAdd = () => {
    const num = phone.replace(/\D/g, '')
    if (numbers.indexOf(num) !== -1) {
      addNotification({
        type: 'Fail',
        text: 'Phone number duplicates.',
      })
      return
    }
    if (!isValid) {
      addNotification({
        type: 'Fail',
        text: 'Please type valid customer phone number.',
      })
    }
    if (!customerName) {
      addNotification({
        type: 'Fail',
        text: 'Please type customer name.',
      })
      return
    }

    setNumbers([...numbers, num])
    setCustomerNames([...customerNames, customerName])

    setCustomerName('')
  }

  const onRemove = (index: number) => {
    showConfirm({
      title: 'Remove this phone number?',
      confirmText: 'Remove',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setNumbers(numbers.filter((_, _index) => _index !== index))
        setCustomerNames(customerNames.filter((_, _index) => _index !== index))
        hideConfirm()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[660px] max-sm:w-full p-6">
        <div className="relative z-10 flex justify-between">
          <span className="text-lg font-semibold text-white">Whatsapp</span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={onClose}
          >
            <Cross />
          </div>
        </div>

        <div className="flex flex-col w-full mt-4 relative z-[2]">
          <h3 className="font-medium text-sm text-white">Agent Phone number</h3>
          <div className="relative mt-2">
            <PhoneInput
              defaultCountry="us"
              value={agentPhone}
              onChange={(p) => {
                setAgentPhone(p)
              }}
            />
          </div>
        </div>
        <div className="mt-2 text-slate-500 text-xs">
          This will be your agents phone number. You will be able to chat with
          your agent using this number
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <RadioButton
            checked={isPublic}
            label="Allow anyone to chat"
            onClick={() => setPublic(true)}
          />
          <div className="flex items-center gap-2">
            <RadioButton
              checked={!isPublic}
              label="Allow Specific Numbers"
              onClick={() => setPublic(false)}
            />
            <Tooltip description="If you need selected numbers to chat with this agent, please add here. If not, leave it empty.">
              <Quote />
            </Tooltip>
          </div>
        </div>

        {!isPublic && (
          <>
            <div className="flex max-md:flex-col w-full gap-4 mt-4">
              <div className="flex flex-col w-full flex-1 z-[2] relative">
                <PhoneInput
                  defaultCountry="us"
                  value={phone}
                  onChange={(phone) => {
                    setPhone(phone)
                  }}
                />
              </div>
              <Input
                className="max-md:w-full"
                value={customerName}
                onChange={(e) => setCustomerName(e.currentTarget.value)}
              />
              <div className="relative z-[3]">
                <Button text="Add" variant="solid" onClick={onAdd} />
              </div>
            </div>
            {numbers.length !== 0 && (
              <div className="mt-4 flex flex-col bg-gray-600 px-2 py-1 rounded-lg relative z-[1] divide-y divide-[#4c535d]">
                {numbers.map((number, index) => (
                  <div
                    className="flex items-center justify-between py-2 text-sm text-white"
                    key={index}
                  >
                    <h3 className="w-[120px] border-r border-slate-400 pr-2">
                      {customerNames[index]}
                    </h3>
                    <h3 className="pl-2">{formatPhoneNumber(number)}</h3>
                    <div
                      className="p-1 bg-gray-500 rounded-full hover:cursor-pointer ml-auto text-white"
                      onClick={() => onRemove(index)}
                    >
                      <Minus />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className="relative z-[1] flex justify-between w-full mt-4">
          <Button text="Cancel" variant="text" onClick={onClose} />
          <Button
            text="Submit"
            type="submit"
            onClick={onClickSubmit}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  )
}

export default PhoneNumber
