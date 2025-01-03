import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { ReactElement, useState } from 'react'

import useStore from '../../config/globalStore'
import { searchFiltering } from '../utils/searchFiltering'
import { CreateButton } from './buttons/CreateButton'
import { SearchBar } from './searchBar'

import '../../assets/styling/listPage.css'
import '../../assets/styling/tablePage.css'

interface TablePageProps {
  closeObjectModal: () => void
  columnsConfig: ColumnsType<any>
  confirmLoading: boolean
  formComponent: ReactElement
  handleModalOk: () => void
  objectName: string
  openModal: boolean
  showModal: () => void
  tableObjectsList: any[] | undefined
}

const TableComponent: React.FC<TablePageProps> = ({
  closeObjectModal,
  columnsConfig,
  confirmLoading,
  tableObjectsList,
  formComponent,
  handleModalOk,
  objectName,
  openModal,
  showModal
}) => {
  const { isAuthenticated } = useStore()

  const [searchText, setSearchText] = useState('')
  let filteredTableObjectsList = tableObjectsList?.filter((object) => {
    return searchFiltering(object, searchText)
  })

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  return (
    <div className="main-div-list-page">
      <div className="top-bar-list-page">
        <SearchBar {...{ handleSearch }} />
        {isAuthenticated && (
          <CreateButton
            {...{
              closeObjectModal,
              confirmLoading,
              formComponent,
              handleModalOk,
              objectName,
              openModal,
              showModal
            }}
          />
        )}
      </div>
      <div className="table-div">
        <Table
          columns={columnsConfig}
          dataSource={filteredTableObjectsList}
          pagination={{ hideOnSinglePage: true }}
          rowKey={(object) => object.id}
          size="middle"
        />
      </div>
    </div>
  )
}

export { TableComponent }
