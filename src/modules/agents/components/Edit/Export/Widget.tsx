import { ChangeEvent, FC, useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HexColorPicker } from 'react-colorful'
import Image from 'next/image'
import {
  Cross,
  SidebarEdit,
  Send,
  Link,
  Minus,
  Plus,
} from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import Input from '@/common/elements/Input'
import ChatItem from '../../ChatItem'
import Avatar from '@/common/elements/Avatar'
import Toggle from '@/common/elements/Toggle'
import DataTable from '@/common/components/DataTable'
import { Spread } from '@/common/components/Icons'
import DropdownMenu from '@/common/components/DropdownMenu'
import { usePopup } from '@/common/hooks/usePopup'
import AddEscalation from './AddEscalation'
import EditEscalation from './EditEscalation'
import { IAgent } from '@/interfaces'
import { ImageUrl, Langs } from '@/common/utils/constants'
import MultiSelect, { MultiSelectOption } from '@/common/elements/MultiSelect'
import { useNotifications } from '@/hooks/useNotifications'
import api from '@/api'
import Required from '@/common/elements/Required'
import Textarea from '@/common/elements/Textarea'

interface WidgetProps {
  agent?: IAgent
  onCreate: () => void
}

interface Escalation {
  reason: string
  response: string
  user: string
  escalation: string
}

const SCRIPT_LINK = process.env.NEXT_PUBLIC_WEB_WIDGET_SCRIPT_LINK

const data: Escalation[] = [
  {
    reason: 'Sam',
    response: 'User',
    user: 'User',
    escalation: 'User',
  },
  {
    reason: 'Sam',
    response: 'User',
    user: 'User',
    escalation: 'User',
  },
  {
    reason: 'Sam',
    response: 'Escalation Channel',
    user: 'User',
    escalation: 'User',
  },
]

const Forms = [
  {
    id: 0,
    label: 'Name',
  },
  {
    id: 1,
    label: 'Email',
  },
]

const Widget: FC<WidgetProps> = ({ agent, onCreate }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    ImageUrl + '/' + agent?.image || ImageUrl!
  )
  const { addNotification } = useNotifications()
  const { query: queryParam } = useRouter()
  const [sketchPickerBGColor, setSketchPickerBGColor] = useState('#2D334D')
  const [sketchPickerChatColor, setSketchPickerChatColor] = useState('#1B1D39')
  const [show, setShow] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [placeholder, setPlaceholder] = useState('')
  const [editdata, setEditData] = useState<Escalation>()
  const [profileValue, setProfileValue] = useState('Hello :)')
  const [langs, setLangs] = useState<MultiSelectOption[]>([])
  const { showConfirm, hideConfirm } = usePopup()
  const [welcomeMessage, setWelcomeMessage] = useState(agent?.welcome)
  const [link, setLink] = useState('')
  const [forms, setForms] = useState(Forms)
  const [formTitle, setFormTitle] = useState('')
  const [showWelcome, setShowWelcome] = useState(true)
  const [isContactShown, setContactShown] = useState(true)
  const [isBrandShown, setBrandShown] = useState(true)
  const [isSourceShown, setSourceShown] = useState(false)
  const [isChatHistoryShown, setChatHistoryShown] = useState(false)
  const [isCreatingLink, setCreatingLink] = useState(false)
  const [website, setWebsite] = useState('')

  const showChat = () => {
    setShow(!show)
    setShowWelcome(!showWelcome)
  }

  useEffect(() => {
    if (agent) {
      setWelcomeMessage(agent.welcome)
    }
  }, [agent])

  const onGenerateLink = () => {
    if (!link) {
      if (!welcomeMessage) {
        addNotification({
          type: 'Fail',
          text: 'Please type welcome message.',
        })
        return
      }
      if (!website) {
        addNotification({
          type: 'Fail',
          text: 'Please type website link.',
        })
        return
      }

      setCreatingLink(true)
      api.webwidget
        .create({
          agent_id: agent!.id,
          welcome_message: welcomeMessage,
        })
        .then((data) => {
          onCreate()
          setCreatingLink(false)
          setLink(
            `<azara-bot widget-id="${data.id}" agent-id="${queryParam.id}" show-form="${isContactShown}" show-source="${isSourceShown}" show-branding="${isBrandShown}" show-history="${isChatHistoryShown}" show-welcome="${showWelcome}" bg-color="${sketchPickerBGColor}" chat-color="${sketchPickerChatColor}"></azara-bot><script src="${SCRIPT_LINK}"></script>`
          )
        })
      return
    }

    navigator.clipboard.writeText(link).then(() => {
      addNotification({
        type: 'Success',
        text: 'Copied the link to clipboard.',
      })
    })
  }

  const showWelcomePopup = () => {
    setShow(!show)
    setShowWelcome(!showWelcome)
    setLink('')
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      const base40String = reader.result
      setSelectedImage(base40String!.toString())
    }

    reader.readAsDataURL(file)
  }

  const showAddEscalationModal = () => {
    setShowAddModal(!showAddModal)
  }

  const showEditEscalationModal = (data: Escalation) => {
    setEditData(data)
    setShowEditModal(!showEditModal)
  }

  const removeEscalation = () => {
    showConfirm({
      title: 'Delete this data?',
      confirmText: 'Delete',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        hideConfirm()
      },
    })
  }

  const changePlaceholder = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceholder(event.target.value)
  }

  const changeProfilValue = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileValue(event.target.value)
  }

  const onChangeWelcomeMessage = (event: any) => {
    setWelcomeMessage(event.target.value)
  }

  const onChangeLink = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value)
  }

  const onChangeForms = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setForms((prevItems) => {
      prevItems[index] = {
        ...prevItems[index],
        label: event.target.value,
      }
      return [...prevItems]
    })
  }

  const removeForm = (index: number) => {
    setForms(forms.filter((item) => item.id !== index))
  }

  const addForm = () => {
    if (formTitle == '') return
    const newFormItem = {
      id: forms.length,
      label: formTitle,
    }
    const newForms = [...forms, newFormItem]
    setForms(newForms)
    setFormTitle('')
  }

  const onChangeFormTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setFormTitle(event?.target.value)
  }

  return (
    <Fragment>
      <div className="flex flex-row justify-between gap-8 mt-3">
        <div className="flex flex-col flex-1 gap-4">
          <span className="text-xl font-semibold text-white">Settings</span>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-100">
                Widget Open Icon
              </span>
              <div className="relative z-[100] flex justify-center items-center rounded-full mt-4 w-16 h-16">
                <Image
                  src={selectedImage}
                  alt={''}
                  width={64}
                  height={64}
                  className="rounded-full"
                  priority
                />
                <span className="flex justify-center items-center absolute bottom-0 right-0 h-6 w-6 rounded-full ring-1 ring-[#0C0D10] bg-gray-500 text-white hover:text-neon-100 hover:cursor-pointer">
                  <input
                    className="absolute left-0 right-0 opacity-0"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <SidebarEdit />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-gray-100">
                Show Welcome Popup
              </span>
              <Toggle
                onToggle={showWelcomePopup}
                checked={showWelcome}
                role="Welcome popup"
              />
            </div>
          </div>
          <span className="mt-4 font-semibold text-white">Profile Mode</span>
          <div className="flex flex-row justify-between gap-8">
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm font-medium text-gray-100">
                Widget Chat Color
              </span>
              <Input
                value={sketchPickerChatColor.toUpperCase()}
                onChange={(e) =>
                  setSketchPickerChatColor(e.currentTarget.value)
                }
                className="uppercase"
                role="Widget Chat Color"
              />
              <HexColorPicker
                color={sketchPickerChatColor}
                onChange={setSketchPickerChatColor}
                className="mt-3"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm font-medium text-gray-100">
                Widget BG Color
              </span>
              <Input
                value={sketchPickerBGColor.toUpperCase()}
                onChange={(e) => setSketchPickerBGColor(e.currentTarget.value)}
                className="uppercase"
                role="Widget Background Color"
              />
              <HexColorPicker
                color={sketchPickerBGColor}
                onChange={setSketchPickerBGColor}
                className="mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">
              Profile Description
            </span>
            <Input
              value={profileValue}
              onChange={changeProfilValue}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">
              Input Placeholder
            </span>
            <Input
              value={placeholder}
              onChange={changePlaceholder}
              className="w-full"
              placeholder="Chat with your agent."
            />
          </div>
          <span className="mt-4 font-semibold text-white">Chat Mode</span>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">
              Welcome message
              <Required />
            </span>
            <Textarea
              className="w-full"
              value={welcomeMessage}
              onChange={onChangeWelcomeMessage}
              role="Welcome Message"
            />
          </div>
          <div className="flex flex-col gap-3 relative z-[2]">
            <span className="text-sm font-medium text-gray-100">
              Chat Widget Language
            </span>
            <MultiSelect
              options={Langs}
              placeholder="Select language"
              value={langs}
              onChange={(values) => {
                setLangs(values)
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">
              Your website link
              <Required />
            </span>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 z-[1] flex items-center justify-center pl-2 text-sm text-white">
                https://
              </div>
              <Input
                className="w-full pl-[53px]"
                value={website}
                onChange={(e) => setWebsite(e.currentTarget.value)}
                role="Website Link"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white">
              Contact Form Fields
            </span>
            <Toggle
              onToggle={() => {
                setContactShown(!isContactShown)
                setLink('')
              }}
              checked={isContactShown}
              role="Contact Form"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-white">
              Remove Branding
            </span>
            <Toggle
              onToggle={() => {
                setBrandShown(!isBrandShown)
                setLink('')
              }}
              checked={!isBrandShown}
              role="Remove Branding"
            />
          </div>
          <div className="flex">
            <div className="flex flex-col flex-1 gap-3">
              <span className="text-sm font-medium text-white">
                Show Source
              </span>
              <Toggle
                onToggle={() => {
                  setSourceShown(!isSourceShown)
                  setLink('')
                }}
                checked={isSourceShown}
                role="Show Source"
              />
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <span className="text-sm font-medium text-white">
                Show Chat History
              </span>
              <Toggle
                onToggle={() => {
                  setChatHistoryShown(!isChatHistoryShown)
                  setLink('')
                }}
                checked={isChatHistoryShown}
                role="Show Chat History"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 w-full gap-4 rounded-t-xl">
          <span className="text-xl font-semibold text-white">Preview</span>
          <div className="flex flex-col">
            {show && (
              <div className="flex bg-[#111315] pb-3">
                <div
                  className="flex flex-row justify-between gap-2 bubble after:border-x-transparent"
                  style={{
                    backgroundColor: sketchPickerChatColor,
                    borderColor: sketchPickerChatColor,
                  }}
                >
                  <span className="text-sm font-normal text-white">
                    {welcomeMessage}
                  </span>
                  <div
                    className="w-[24px] hover:cursor-pointer text-gray-300 hover:text-neon-100"
                    onClick={showChat}
                  >
                    <Cross />
                  </div>
                </div>
              </div>
            )}
            <div className="flex hover:cursor-pointer" onClick={showChat}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full">
                <Image
                  src={selectedImage}
                  alt={''}
                  width={64}
                  height={64}
                  className="rounded-full"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full roundedn-t-xl">
            <div
              className="flex items-center justify-between w-full px-6 py-2 rounded-t-xl"
              style={{
                backgroundColor: sketchPickerChatColor,
              }}
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold text-white">
                  {agent?.name}
                </span>
                <span className="text-base font-normal text-gray-300">
                  {agent?.role}
                </span>
              </div>
            </div>
            <div
              className="flex flex-col items-center justify-center w-full px-6 py-4"
              style={{ backgroundColor: sketchPickerBGColor }}
            >
              <Avatar
                src={ImageUrl + '/' + agent?.image || ImageUrl!}
                alt={''}
                width={72}
                height={72}
              />
              <span className="mt-2 text-sm font-normal text-center text-white">
                {profileValue}
              </span>
              <div className="flex flex-col items-center justify-center w-full p-3 mt-4 rounded-xl bg-dark">
                <Input
                  placeholder="Have a quick question? Ask me!"
                  className="w-full"
                  icon={
                    <button
                      className="z-10 text-gray-700 cursor-pointer hover:text-neon-100"
                      type="submit"
                    >
                      <Send />
                    </button>
                  }
                  position="end"
                />
                <div className="flex flex-col items-center justify-center mt-3">
                  <Button
                    text="Send message"
                    variant="solid"
                    className="border-none"
                    size="md"
                    style={{
                      backgroundColor: sketchPickerChatColor,
                    }}
                  />
                </div>
              </div>
            </div>
            {isBrandShown && (
              <div
                className="flex flex-col items-center justify-center w-full gap-2 px-6 py-2 rounded-b-xl"
                style={{
                  backgroundColor: sketchPickerChatColor,
                }}
              >
                <span className="text-sm font-normal text-gray-300">
                  Powered By ELITE
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div
              className="flex items-center justify-between px-6 py-2 rounded-t-xl"
              style={{
                backgroundColor: sketchPickerChatColor,
              }}
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold text-white">
                  {agent?.name}
                </span>
                <span className="text-base font-normal text-gray-300">
                  {agent?.role}
                </span>
              </div>
            </div>
            <div
              className="flex flex-col px-6 py-2 "
              style={{ backgroundColor: sketchPickerBGColor }}
            >
              <ChatItem
                message={agent?.welcome!}
                isAgent
                role={agent?.role}
                image={agent?.image}
              />
              <div className="flex justify-end w-full mt-6">
                <div
                  className="w-4/5 p-3 text-sm font-normal leading-5 text-white rounded-xl"
                  style={{ backgroundColor: sketchPickerChatColor }}
                >
                  Thanks for the quick response! Right now, I have accounts on
                  Facebook, Instagram, and Twitter.
                </div>
              </div>
              {isContactShown ? (
                <div className="flex flex-col items-center justify-center p-3 mt-4 rounded-xl bg-dark">
                  <span className="text-sm font-normal text-center text-white">
                    Contact
                  </span>
                  <div className="flex flex-col w-full gap-3 mt-3">
                    {forms.map((form, index) => (
                      <div
                        className="flex flex-row items-center gap-1"
                        key={index}
                      >
                        <Input
                          placeholder={form.label}
                          className="w-full"
                          onChange={(event) => onChangeForms(event, index)}
                        />
                        <div
                          className="p-1 bg-gray-500 rounded-full hover:cursor-pointer"
                          onClick={() => removeForm(index)}
                        >
                          <Minus />
                        </div>
                      </div>
                    ))}
                    <Input
                      placeholder={'Enter a field name'}
                      className="w-full"
                      value={formTitle}
                      onChange={onChangeFormTitle}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between gap-2 mt-3">
                    <Button
                      text="Add a new field"
                      variant="solid"
                      icon={<Plus />}
                      onClick={addForm}
                    />
                    <Button
                      text="Submit"
                      variant="solid"
                      style={{
                        backgroundColor: sketchPickerChatColor,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              className="flex flex-col items-center justify-between gap-2 px-6 py-2 rounded-b-xl"
              style={{
                backgroundColor: sketchPickerChatColor,
              }}
            >
              <Input
                placeholder={placeholder}
                className="w-full mt-2"
                icon={
                  <button
                    className="z-10 text-gray-700 cursor-pointer hover:text-neon-100"
                    type="submit"
                  >
                    <Send />
                  </button>
                }
                position="end"
              />
              {isBrandShown && (
                <span className="text-sm font-normal text-gray-300">
                  Powered By ELITE
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <span className="text-base font-semibold text-white">Escalation</span>
        <span className="text-sm font-medium text-gray-400">
          If the chatbot cannot understand the customer intent for a
          predetermined number of times or customer, the chatbot automatically
          begins the escalation process by sending an email.
        </span>
        <div>
          <Button
            text="Add Escalation"
            variant="solid"
            onClick={showAddEscalationModal}
          />
          <AddEscalation show={showAddModal} showModal={() => {}} />
          <div className="flex flex-col items-center justify-center mt-4 max-sm:overflow-x-scroll scrollbar-hide">
            <DataTable
              data={data}
              columns={[
                {
                  name: 'Reason for Escalation',
                  cell: (row) => (
                    <span className="text-white">{row.reason}</span>
                  ),
                },
                {
                  name: 'Response',
                  cell: (row) => (
                    <span className="text-white">{row.response}</span>
                  ),
                },
                {
                  name: 'User',
                  cell: (row) => <span className="text-white">{row.user}</span>,
                },
                {
                  name: 'Escalation Channel',
                  cell: (row) => (
                    <span className="text-white">{row.escalation}</span>
                  ),
                },
                {
                  name: 'Action',
                  cell: (row) => (
                    <DropdownMenu
                      align="right"
                      options={[
                        {
                          title: 'Edit',
                          action: () => showEditEscalationModal(row),
                        },
                        {
                          title: 'Remove',
                          action: removeEscalation,
                          color: 'text-red',
                        },
                      ]}
                      icon={<Spread />}
                    />
                  ),
                  right: true,
                },
              ]}
            />
          </div>
          <EditEscalation
            show={showEditModal}
            showModal={() => {}}
            data={editdata}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-100">
            Copy script to Install
          </span>
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex flex-row gap-3">
              <Input
                className="w-full"
                value={link}
                onChange={onChangeLink}
                readOnly
              />
              <Button
                icon={<Link />}
                text={link ? 'Copy Link' : 'Create a Link'}
                variant="solid"
                className="whitespace-pre z-[100]"
                isLoading={isCreatingLink}
                disabled={isCreatingLink}
                onClick={onGenerateLink}
                role="Generate Link"
              />
            </div>
            <span className="text-sm font-medium text-gray-400">
              Copy the script to embed your Agent into the HTML of your website
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default Widget
