import { List } from 'antd'
import React, { useState } from 'react'

import { EVENT_CATEGORY_NAME } from '../../models/constants/constants'
import { CreateButton } from '../../partials/buttons/CreateButton'
import { useModalsHandlers } from '../../partials/handlers/modalsHandlers'
import { SearchBar } from '../../partials/searchBar'
import { useGetEventCategories } from '../../utils/hooks/eventCategoriesHooks'
import { searchFiltering } from '../../utils/searchFiltering'
import EventCategoryDetails from './EventCategoryDetails'
import EventCategoryModalForm from './EventCategoryModalForm'

import '../../../assets/styling/listPage.css'

export default function EventCategoriesList() {
  const { eventCategories, refreshFunction } = useGetEventCategories()
  const [searchText, setSearchText] = useState('')

  const useModalsHandlersProps = {
    objectName: EVENT_CATEGORY_NAME,
    refreshFunction,
    tableObjects: eventCategories
  }
  const {
    closeObjectModal,
    confirmLoading,
    form,
    handleModalOk,
    onFormSubmit,
    openModal,
    showModal
  } = useModalsHandlers(useModalsHandlersProps)

  let filteredTableObjectsList = eventCategories?.filter((eventCategory) => {
    return searchFiltering(eventCategory, searchText)
  })

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  return (
    <div className="mainDivListPage">
      <div className="topBarListPage">
        <SearchBar {...{ handleSearch }} />
        <CreateButton
          formComponent={
            <EventCategoryModalForm
              eventCategory={null}
              onFinish={onFormSubmit}
              {...{ form }}
            />
          }
          objectName={EVENT_CATEGORY_NAME}
          {...{
            closeObjectModal,
            confirmLoading,
            handleModalOk,
            openModal,
            showModal
          }}
        />
      </div>
      <div className="tableDiv">
        <List
          dataSource={filteredTableObjectsList}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          pagination={{ defaultPageSize: 18, hideOnSinglePage: true }}
          renderItem={(eventCategory) => (
            <EventCategoryDetails {...{ eventCategory }} />
          )}
        />
      </div>
    </div>
  )
}
