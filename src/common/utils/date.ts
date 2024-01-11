export const currentDate = () => {
  const currentDate = new Date()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const year = currentDate.getFullYear().toString().slice(-2)
  return `${month}/${day}/${year}`
}

export const periodDate = () => {
  const currentDate = new Date()
  const month = (currentDate.getMonth() + 2).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const year = currentDate.getFullYear().toString().slice(-2)
  return `${month}/${day}/${year}`
}

export const timeDifference = (dateString: string) => {
  const utcDate = new Date(dateString + 'Z')

  const userLocalTime = new Date(utcDate.toLocaleString())

  const differenceInSeconds = Math.abs(
    Math.floor((new Date().getTime() - userLocalTime.getTime()) / 1000)
  )

  const years = Math.floor(differenceInSeconds / (365 * 24 * 3600))
  const months = Math.floor(
    (differenceInSeconds % (365 * 24 * 3600)) / (30 * 24 * 3600)
  )
  const weeks = Math.floor(
    (differenceInSeconds % (30 * 24 * 3600)) / (7 * 24 * 3600)
  )
  const days = Math.floor((differenceInSeconds % (7 * 24 * 3600)) / (24 * 3600))
  const hours = Math.floor((differenceInSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((differenceInSeconds % 3600) / 60)

  let formattedTime = ''

  if (years > 0) {
    formattedTime += `${years} year${years > 1 ? 's ago' : ' ago'}`
  } else if (months > 0) {
    formattedTime += `${months} month${weeks > 1 ? 's ago' : ' ago'}`
  } else if (weeks > 0) {
    formattedTime += `${weeks} week${weeks > 1 ? 's ago' : ' ago'}`
  } else if (days > 0) {
    formattedTime += `${days} day${days > 1 ? 's ago' : ' ago'}`
  } else if (hours > 0) {
    formattedTime += `${hours} hr${hours > 1 ? 's ago' : ' ago'}`
  } else if (minutes > 0) {
    formattedTime += `${minutes} min${minutes > 1 ? 's ago' : 'ago'}`
  } else {
    formattedTime += 'Just now'
  }

  return formattedTime.trim()
}

export const convertString2Date = (dateString: string) => {
  var date = new Date(dateString)
  var formattedDate =
    ('0' + date.getUTCDate()).slice(-2) +
    '/' +
    ('0' + (date.getUTCMonth() + 1)).slice(-2) +
    '/' +
    date.getUTCFullYear() +
    ' - ' +
    ('0' + date.getUTCHours()).slice(-2) +
    ':' +
    ('0' + date.getUTCMinutes()).slice(-2) +
    ':' +
    ('0' + date.getUTCSeconds()).slice(-2)

  return formattedDate
}

export const formatNumber = (num: number) => {
  let result = ''
  if (num > 60)
    result = Math.ceil(num / 60) + ' min ' + Math.ceil(num % 60) + ' s'
  else result = num.toFixed(2) + ' s'
  return result
}

export const getCurrentTimezone = () => {
  const now = new Date()
  const timezoneOffsetMinutes = now.getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(timezoneOffsetMinutes) / 60)
  const offsetMinutes = Math.abs(timezoneOffsetMinutes) % 60
  const timezoneIdentifier = Intl.DateTimeFormat().resolvedOptions().timeZone

  const sign = timezoneOffsetMinutes < 0 ? '+' : '-'
  const formattedOffset = `GMT${sign}${offsetHours
    .toString()
    .padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`
  const result = `${formattedOffset} ${timezoneIdentifier}`

  return result
}

export const getCurrentDateTime = () => {
  const currentDate = new Date()

  const day = String(currentDate.getDate()).padStart(2, '0')
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const year = currentDate.getFullYear()
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')
  const formattedDateTime = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`

  return formattedDateTime
}
