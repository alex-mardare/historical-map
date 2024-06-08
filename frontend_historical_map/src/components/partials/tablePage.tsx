import { Button, Input, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { ReactElement } from 'react'

import { FormModal } from './modals'

import '../../assets/styling/tablePage.css'


const { Search } = Input

interface TablePageProps {
    closeObjectModal: () => void,
    columnsConfig: ColumnsType<any>,
    confirmLoading: boolean,
    filteredObjectsArray: any[] | undefined,
    formComponent: ReactElement,
    handleModalOk: () => void,
    handleSearch: (value:string) => void,
    objectName: string,
    openModal: boolean,
    showModal: () => void
}

const TableComponent: React.FC<TablePageProps> = ({closeObjectModal, columnsConfig, confirmLoading, filteredObjectsArray, formComponent, handleModalOk, handleSearch, 
    objectName, openModal, showModal}) => {
        return (
            <div className='mainDivTablePage'>
                <div className='topBarTablePage'>
                    <Search
                        allowClear
                        enterButton
                        onChange={(e) => handleSearch(e.target.value)} 
                        placeholder='Search' 
                        style={{ maxWidth: 400, paddingRight: '5px' }}
                        />
                    <Button onClick={showModal} type='primary'>Create</Button>
                    <FormModal
                        closeObjectModal={closeObjectModal}
                        confirmLoading={confirmLoading}
                        formComponent={formComponent}                
                        handleModalOk={handleModalOk}
                        modalTitle='Create'
                        objectName={objectName}
                        openModal={openModal}
                    />
                    </div>
                    <div className='tableDiv'>
                    <Table 
                        columns={columnsConfig}
                        dataSource={filteredObjectsArray}
                        pagination={{ hideOnSinglePage:true }}
                        rowKey={(object) => object.id}
                        size='middle'
                    />
                </div>
            </div>
        )
}

export { TableComponent }