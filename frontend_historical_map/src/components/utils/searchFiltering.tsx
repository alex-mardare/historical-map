const searchFiltering = (object: any, searchText: string) => {
  return Object.values(object).some((value) => {
    if (value === null || value === undefined) {
      return false
    }
    if (typeof value === 'boolean') {
      if (searchText === 'yes') {
        return value
      } else if (searchText === 'no') {
        return !value
      }
      return false
    }
    if (Object.hasOwn(value, 'name')) {
      return (value as any).name
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    }
    return value.toString().toLowerCase().includes(searchText.toLowerCase())
  })
}

export { searchFiltering }
