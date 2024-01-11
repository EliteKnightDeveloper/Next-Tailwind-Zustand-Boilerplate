import { FC, useEffect, useState } from 'react'
import Button from '@/common/elements/Button'
import Input from '@/common/elements/Input'
import IntegrationCard from './IntegrationCard'
import api from '@/api'
import { IAgent, IIntegration } from '@/interfaces'
import PhoneNumber from './PhoneNumber'
import { Cross, Search } from '@/common/components/Icons'
import WhatsApp from '~/static/icon/WhatsApp.svg'
import Google from '~/static/icon/Google.svg'
import GoogleDrive from '~/static/icon/GoogleDrive.svg'
import Messenger from '~/static/icon/Messenger.svg'
import Zendesk from '~/static/icon/Zendesk.svg'
import Dropbox from '~/static/icon/Dropbox.svg'
import GM from '~/static/icon/GM.svg'
import ELITE from '~/static/icon/ELITE.svg'
import Modal from '@/common/elements/Modal'
import Widget from '../Export/Widget'

import { useRouter } from 'next/router'
import { useNotifications } from '@/hooks/useNotifications'
import { formatPhoneNumber } from '@/common/utils'

const Integrations: FC = () => {
  const router = useRouter()
  const { query } = router
  const [active, setActive] = useState<string[]>(['1'])
  const [showModal, setShowModal] = useState(false)
  const [googleActive, setGoogleActive] = useState(false)
  const [widgetActive, setWidgetActive] = useState(false)
  const [whatsAppActive, setWhatsAppActive] = useState(false)
  const [show, setShow] = useState(false)
  const [agent, setAgent] = useState<IAgent>()
  const [isPinningWW, setPinningWW] = useState(false)
  const [isWWCreated, setWWCreated] = useState(false)
  const [isAddingNumber, setAddingNumber] = useState(false)
  const [numbers, setNumbers] = useState<string[]>([])
  const { addNotification } = useNotifications()

  useEffect(() => {
    api.agents.getAgent(query.id!.toString()).then((response) => {
      setAgent(response)
    })

    api.webwidget.isDeployed(query.id!.toString()).then((deployed) => {
      setWidgetActive(deployed)
      setWWCreated(deployed)
    })

    api.integrations.getWhatsAppNumber(query.id!.toString()).then((res) => {
      if (res.length !== 0) {
        setWhatsAppActive(true)
      }

      setNumbers(res.map((t) => t.number))
    })
  }, [])

  const changeStatus = (indexName: string) => {
    setActive((prevIndexes) =>
      prevIndexes.includes(indexName)
        ? prevIndexes.filter((index: string) => index !== indexName)
        : [...prevIndexes, indexName]
    )
  }

  const integrate = () => {
    if (!whatsAppActive) {
      setShowModal(true)
    } else {
      setShowModal(true)
    }
  }

  const showWidgetModal = () => {
    if (isPinningWW) return
    if (widgetActive) {
      setShow(false)
      setPinningWW(true)
      api.webwidget
        .remove(query.id!.toString())
        .then(() => {
          setWidgetActive(false)
          setPinningWW(false)
        })
        .catch(() => {
          setPinningWW(false)
        })
    } else {
      setShow(true)
      setWidgetActive(true)
    }
  }

  const toggleWidgetModal = () => {
    if (show === false) {
      setShow(true)
    } else {
      setWidgetActive(isWWCreated)
      setShow(false)
    }
  }

  return (
    <div className="flex flex-col mt-4">
      <span className="flex flex-1 text-sm font-normal text-white">
        Unleash your Agent with the power to access real-time information and
        seamlessly operate data.
      </span>
      <div className="flex flex-row justify-between flex-1 gap-8 mt-6 max-sm:flex-col">
        <Input
          placeholder="Search Integrations Library"
          className="w-full"
          icon={<Search />}
          position="start"
        />
        <div className="flex flex-row gap-4 max-sm:justify-between">
          <Button
            key={1}
            text={'All'}
            onClick={() => changeStatus('1')}
            variant={active.includes('1') ? 'gradient' : 'solid'}
          />
          <Button
            key={2}
            text={'APIs'}
            onClick={() => changeStatus('2')}
            variant={active.includes('2') ? 'gradient' : 'solid'}
          />
          <Button
            key={3}
            text={'Models'}
            onClick={() => changeStatus('3')}
            variant={active.includes('3') ? 'gradient' : 'solid'}
          />
          <Button
            key={4}
            text={'3rd Party'}
            onClick={() => changeStatus('4')}
            variant={active.includes('4') ? 'gradient' : 'solid'}
            className="w-max"
          />
        </div>
      </div>
      <div className="grid gap-6 mt-6 xl:grid-cols-3">
        <IntegrationCard
          name={'Web Widget'}
          src={ELITE}
          description={
            'A web widget is a small, self-contained, and often interactive component or application that can be easily embedded within a website or web application to perform a specific function or provide valuable information to users'
          }
          active={widgetActive}
          onToggle={showWidgetModal}
          loading={isPinningWW}
        />
        <IntegrationCard
          name={'Google Mail'}
          src={GM}
          description={
            'Agents will be able to quickly communicate with clients and teams through end-to-end encrypted messaging.'
          }
          active={googleActive}
          onToggle={() => {
            setGoogleActive(!googleActive)
          }}
        />
        <IntegrationCard
          name={'WhatsApp'}
          src={WhatsApp}
          description={
            'Agents will be able to quickly communicate with clients and teams through end-to-end encrypted messaging.'
          }
          active={whatsAppActive}
          onToggle={integrate}
        />
        <IntegrationCard
          name={'Google Search'}
          src={Google}
          description={
            'Agents will be able to search for relevant information, resources, and data online.'
          }
          onToggle={() => {}}
        />
        <IntegrationCard
          name={'Google Drive'}
          src={GoogleDrive}
          description={
            'Agents will be able to store, share, and collaboratively edit documents, spreadsheets, and presentations in real-time.'
          }
          onToggle={() => {}}
        />
        <IntegrationCard
          name={'Messenger'}
          src={Messenger}
          description={
            'Agents will be able to interact with customers, answer inquiries, and provide instant support.'
          }
          onToggle={() => {}}
        />
        <IntegrationCard
          name={'Zendesk'}
          src={Zendesk}
          description={
            'Agents will be able to manage customer support tickets, track interactions.'
          }
          onToggle={() => {}}
        />
        <IntegrationCard
          name={'Dropbox'}
          src={Dropbox}
          description={
            'Agents will be able to safely store, synchronize, and share large files and documents across devices.'
          }
          onToggle={() => {}}
        />
      </div>
      <PhoneNumber
        isOpen={showModal}
        isLoading={isAddingNumber}
        defaultNumbers={numbers.map((number) =>
          formatPhoneNumber(number).slice(1, formatPhoneNumber(number).length)
        )}
        onClose={() => setShowModal(false)}
        onSave={(added, removed, _numbers) => {
          setAddingNumber(true)

          Promise.all([
            api.integrations.saveWhatsAppNumber(
              agent?.id.toString() || '',
              added
            ),
            api.integrations.removeWhatsAppNumber(
              agent?.id.toString() || '',
              removed
            ),
          ])
            .then(() => {
              addNotification({
                type: 'Success',
                text: 'Verified',
              })
              setShowModal(false)
              setAddingNumber(false)
            })
            .catch(() => {
              addNotification({
                type: 'Fail',
                text: 'Failed to Save',
              })
              setShowModal(false)
              setAddingNumber(false)
            })

          setWhatsAppActive(_numbers.length !== 0)
          setNumbers(_numbers)
        }}
      />

      <Modal isOpen={show} onClose={toggleWidgetModal} className="w-[995px]">
        <div className="flex flex-col w-full p-6">
          <div className="flex flex-row justify-between w-full">
            <span className="text-lg font-semibold text-white">
              Export as Web Widget
            </span>
            <div
              className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
              onClick={toggleWidgetModal}
            >
              <Cross />
            </div>
          </div>
          <div className="mt-3 w-[900px]">
            <Widget
              agent={agent}
              onCreate={() => {
                setWWCreated(true)
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Integrations
