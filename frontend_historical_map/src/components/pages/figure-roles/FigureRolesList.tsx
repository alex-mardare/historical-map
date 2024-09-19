import { List } from 'antd'
import React, { useState } from 'react'

import { HISTORICAL_FIGURE_ROLE_NAME } from '../../models/constants/constants'
import { CreateButton } from '../../partials/buttons/CreateButton'
import { useModalsHandlers } from '../../partials/handlers/modalsHandlers'
import { SearchBar } from '../../partials/searchBar'
import { useGetFigureRoles } from '../../utils/hooks/figureRolesHooks'
import { searchFiltering } from '../../utils/searchFiltering'
import FigureRoleDetails from './FigureRoleDetails'
import FigureRoleModalForm from './FigureRoleModalForm'

import '../../../assets/styling/listPage.css'

export default function FigureRolesList() {
  const { figureRoles, refreshFunction } = useGetFigureRoles()
  const [searchText, setSearchText] = useState('')

  const useModalsHandlersProps = {
    objectName: HISTORICAL_FIGURE_ROLE_NAME,
    refreshFunction,
    tableObjects: figureRoles
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

  let filteredTableObjectsList = figureRoles?.filter((figureRoles) => {
    return searchFiltering(figureRoles, searchText)
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
            <FigureRoleModalForm
              figureRole={null}
              onFinish={onFormSubmit}
              {...{ form }}
            />
          }
          objectName={HISTORICAL_FIGURE_ROLE_NAME}
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
          renderItem={(figureRole) => <FigureRoleDetails {...{ figureRole }} />}
        />
      </div>
    </div>
  )
}
