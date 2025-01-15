import Search from 'antd/es/input/Search'
import React from 'react'

type propType = {
  handleSearch: (value: string) => void
}

export default function SearchBar({ handleSearch }: propType) {
  return (
    <Search
      allowClear
      enterButton
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search"
      style={{ maxWidth: 400, paddingRight: '5px' }}
    />
  )
}
