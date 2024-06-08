import React from 'react'

import FiguresModalForm from './FiguresModalForm'
import { columnsConfig } from '../../config/tables/figuresListColumnsConfig'
import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { TableComponent } from '../../partials/tablePage'
import { useTablePadeHandlers } from '../../partials/handlers/tablePageHandlers'
import { useGetFigures, usePostFigure } from '../../utils/hooks/figuresHooks'


export default function FiguresList() {
    const { figures, refreshFunction } = useGetFigures()

    const useTablePadeHandlersProps = {objectPostHook: usePostFigure, refreshFunction, tableObjects: figures}
    const { closeObjectModal, confirmLoading, filteredObjectsArray, form, handleModalOk, handleSearch, onFormSubmit, openModal, showModal } = 
        useTablePadeHandlers(useTablePadeHandlersProps)

    const figuresModalForm = () => { return <FiguresModalForm figure={null} form={form} onFinish={onFormSubmit} />}

    return(
        <TableComponent 
          closeObjectModal={closeObjectModal}
          columnsConfig={columnsConfig}
          confirmLoading={confirmLoading}
          filteredObjectsArray={filteredObjectsArray}
          formComponent={figuresModalForm()}
          handleModalOk={handleModalOk}
          handleSearch={handleSearch}
          objectName={HISTORICAL_FIGURE_NAME}
          openModal={openModal}
          showModal={showModal}
        />
    )
}