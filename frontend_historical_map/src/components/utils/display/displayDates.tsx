import { extractDateFromString } from '../../config/tables/dateFunctions'

const displayHumanReadableDate = (date: string | null | undefined) => {
  const dateParts = extractDateFromString(date)

  if (date === null || date === undefined || dateParts === undefined) {
    return 'N/A'
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const formatYear =
    date[0] === '-'
      ? `${Math.abs(Number(dateParts[0]))} BC`
      : `${dateParts[0]} AD`
  const formatMonth = dateParts[1] ? monthNames[Number(dateParts[1]) - 1] : ''
  const formatDay = dateParts[2] ?? ''

  return formatDay + ' ' + formatMonth + ' ' + formatYear
}

export { displayHumanReadableDate }
