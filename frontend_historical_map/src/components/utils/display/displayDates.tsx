const displayHumanReadableDate = (date: string | null | undefined) => {
  if (date === null || date === undefined) {
    return 'N/A'
  }
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export { displayHumanReadableDate }
