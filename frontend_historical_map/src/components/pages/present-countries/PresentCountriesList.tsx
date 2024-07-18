import { List } from 'antd'
import React, { useState } from 'react'

import { SearchBar } from '../../partials/searchBar'
import { useGetPresentCountries } from '../../utils/hooks/presentCountriesHooks'
import { searchFiltering } from '../../utils/searchFiltering'
import PresentCountryDetails from './PresentCountryDetails'

import '../../../assets/styling/listPage.css'

export default function PresentCountriesList() {
  const { presentCountries } = useGetPresentCountries(null)
  const [searchText, setSearchText] = useState('')

  let filteredTableObjectsList = presentCountries?.filter((presentCountry) => {
    return searchFiltering(presentCountry, searchText)
  })

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  return (
    <div className="mainDivListPage">
      <div className="topBarListPage">
        <SearchBar {...{ handleSearch }} />
      </div>
      <div className="tableDiv">
        <List
          dataSource={filteredTableObjectsList}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          pagination={{ defaultPageSize: 18, hideOnSinglePage: true }}
          renderItem={(presentCountry) => (
            <PresentCountryDetails {...{ presentCountry }} />
          )}
        />
      </div>
    </div>
  )
}
