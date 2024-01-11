import parsePhoneNumber from 'libphonenumber-js'

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

export const formatPhoneNumber = (phoneNumber: string) => {
  const phoneNumberInst = parsePhoneNumber(`+${phoneNumber}`)
  return phoneNumberInst?.formatInternational() || ''
}
