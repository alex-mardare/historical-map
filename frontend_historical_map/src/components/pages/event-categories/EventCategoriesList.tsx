import { Card, List } from 'antd'
import React, { useState } from 'react'
import { EventCategory } from '../../models/types/eventCategory'
import { SearchBar } from '../../partials/searchBar'
import { useGetEventCategories } from '../../utils/hooks/eventPropertiesHooks'
import { searchFiltering } from '../../utils/searchFiltering'

import '../../../assets/styling/listPage.css'

export default function EventCategoriesList() {
  const { eventCategories, refreshFunction } = useGetEventCategories()
  const [searchText, setSearchText] = useState('')
  let filteredTableObjectsList = eventCategories?.filter((eventCategory) => {
    return searchFiltering(eventCategory, searchText)
  })

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const displayEventCategory = (eventCategory: EventCategory) => {
    return (
      <List.Item>
        <Card hoverable={true} title={eventCategory.name} />
      </List.Item>
    )
  }

  return (
    <div className="mainDivListPage">
      <div className="topBarListPage">
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="tableDiv">
        <List
          dataSource={filteredTableObjectsList}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          renderItem={displayEventCategory}
        />
      </div>
    </div>
  )
}
