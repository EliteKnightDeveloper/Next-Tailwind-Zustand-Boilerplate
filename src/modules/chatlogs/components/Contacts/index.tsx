import { Search } from '@/common/components/Icons'
import Input from '@/common/elements/Input'
import { FC, Fragment, useEffect, useState } from 'react'
import ContactsCard from './ContactsCard'
import { IContact } from '@/interfaces'
import api from '@/api'

const ContactsData: FC = () => {
  const [contacts, setContacts] = useState<IContact[]>([])

  useEffect(() => {
    api.chatLogs
      .getAllContacts()
      .then((response) => {
        setContacts(response)
      })
      .catch((err) => {})
  }, [])

  return (
    <Fragment>
      <div className="flex flex-col mt-6">
        <Input
          className="w-full"
          icon={<Search />}
          position="start"
          placeholder="Search for contracts"
        />
        <div className="grid gap-6 mt-6 xl:grid-cols-3 2xl:grid-cols-4 max-md:grid-cols-1 lg:grid-cols-3">
          {contacts
            .filter((contact) => contact.messages.length > 0)
            .map((contact, index) => (
              <ContactsCard data={contact} key={index} />
            ))}
        </div>
      </div>
    </Fragment>
  )
}

export default ContactsData
