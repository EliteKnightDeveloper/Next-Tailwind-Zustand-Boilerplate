import moment from 'moment-timezone'

export const getAllTimezonesFormatted = (): string[] => {
  const timezones: string[] = moment.tz.names()
  const formattedTimezones: string[] = timezones.map((timezone) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      timeZoneName: 'short',
    })

    const timeZoneName =
      formatter.formatToParts().find((part) => part.type === 'timeZoneName')
        ?.value || ''

    return `${timeZoneName} ${timezone}`
  })

  return formattedTimezones
}

export const getTimezone = (index: number) => {
  const timeZones = getAllTimezonesFormatted()
  return timeZones[index]
}
