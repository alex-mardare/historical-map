import Search from 'antd/es/input/Search'
import React from 'react'

interface SearchBarProps {
  handleSearch: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
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

export { SearchBar }
