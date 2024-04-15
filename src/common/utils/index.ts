import { IDoc } from '@/interfaces'
import parsePhoneNumber from 'libphonenumber-js'

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

export const formatPhoneNumber = (phoneNumber: string) => {
  const phoneNumberInst = parsePhoneNumber(
    `+${
      phoneNumber[0] === '+'
        ? phoneNumber.slice(1, phoneNumber.length)
        : phoneNumber
    }`
  )
  return phoneNumberInst?.formatInternational() || ''
}

export const getUniquedocs = (docs: IDoc[]) => {
  const uniqueDocs: IDoc[] = []

  docs.forEach((doc) => {
    if (uniqueDocs.find((t) => t.filename === doc.filename)) return
    uniqueDocs.push(doc)
  })

  return uniqueDocs
}

export const isValidHttpUrl = (urlString: string) => {
  let url

  try {
    url = new URL(urlString)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
