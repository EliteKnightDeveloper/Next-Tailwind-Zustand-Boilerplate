import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '@/api'
import { ICompany } from '@/interfaces'
import Input from '@/common/elements/Input'
import Avatar from '@/common/elements/Avatar'
import Button from '@/common/elements/Button'
import Textarea from '@/common/elements/Textarea'
import { ImageUrl } from '@/common/utils/constants'
import { useUserStore } from '@/common/stores/userStore'
import { useNotifications } from '@/hooks/useNotifications'

const CompanyInfo: FC = () => {
  const { addNotification } = useNotifications()
  const [selectedImage, setSelectedImage] = useState<string>(
    ImageUrl! + '/Company.png'
  )
  const [isUpdating, setUpdating] = useState(false)
  const { register, handleSubmit, setValue } = useForm<ICompany>({
    mode: 'all',
  })
  const [flag, setFlag] = useState(true)
  const user = useUserStore((state) => state.user)
  const [file, setFile] = useState<File>()
  const [compId, setCompId] = useState('')

  const setValues = (data: ICompany) => {
    setSelectedImage(ImageUrl! + '/' + data.image)
    setValue('name', data.name)
    setValue('overview', data.overview)
    setValue('contacts', data.contacts)
  }

  useEffect(
    () => {
      api.company.getCompany(user!.id.toString()).then((response) => {
        setValues(response)
        if (response.id) {
          setCompId(response.id)
          setFlag(true)
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setSelectedImage(base64String!.toString())
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (register: ICompany) => {
    setUpdating(true)
    if (flag) {
      api.company
        .createCompany(register, file!)
        .then((response) => {
          setValues(response)
          setUpdating(false)
          addNotification({
            type: 'Success',
            text: 'Create Company Success',
          })
        })
        .catch(() => {
          setUpdating(false)
          addNotification({
            type: 'Fail',
            text: 'Create Company Fail',
          })
        })
    } else {
      api.company
        .updateCompany(compId.toString(), register, file!)
        .then((response) => {
          setValues(response)
          setUpdating(false)
          addNotification({
            type: 'Success',
            text: 'Update Company Success',
          })
        })
        .catch(() => {
          setUpdating(false)
          addNotification({
            type: 'Fail',
            text: 'Update Company Fail',
          })
        })
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-start gap-6 max-sm:flex-col max-sm:gap-3">
        <span className="flex font-medium text-gray-100 text-sm w-[250px]">
          Company avatar
        </span>
        <div className="flex flex-col items-start w-full ">
          <Avatar
            src={selectedImage}
            height={120}
            width={120}
            alt={''}
            badgeIcon="icon"
            isHuman={true}
            border
            onClickBadge={handleImageChange}
            badgeHeight={8}
            badgeWidth={8}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-8"
      >
        <div className="flex flex-row justify-start gap-6 max-sm:flex-col max-sm:gap-3">
          <span className="flex font-medium text-gray-100 text-sm w-[250px]">
            Company name
          </span>
          <div className="flex flex-col items-start w-full ">
            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col w-full gap-4 max-sm:gap-2">
                <Input {...register('name')} type="text" className="w-full" />
                <span className="flex text-sm font-medium text-gray-400">
                  What is the name of your company?
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start gap-6 max-sm:flex-col max-sm:gap-3">
          <span className="flex font-medium text-gray-100 text-sm w-[250px]">
            Company Overview
          </span>
          <div className="flex flex-col items-start w-full ">
            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col w-full gap-4 max-sm:gap-2">
                <Textarea {...register('overview')} className="w-full" />
                <span className="flex text-sm font-medium text-gray-400">
                  Company's name, logo, tagline, headquarters location, year of
                  establishment, industry sector, and a brief description of the
                  company.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start gap-6 max-sm:flex-col max-sm:gap-3">
          <span className="flex font-medium text-gray-100 text-sm w-[250px]">
            Contact And Online Presence
          </span>
          <div className="flex flex-col items-start w-full ">
            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col w-full gap-4 max-sm:gap-2">
                <Textarea {...register('contacts')} className="w-full" />
                <span className="flex text-sm font-medium text-gray-400">
                  Company's contact details, phone numbers, email addresses, and
                  physical addresses of key locations or offices, as well as
                  links to the company's website and social media profiles.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            text="Save Company Info"
            variant="gradient"
            type="submit"
            isLoading={isUpdating}
          />
        </div>
      </form>
    </div>
  )
}

export default CompanyInfo
