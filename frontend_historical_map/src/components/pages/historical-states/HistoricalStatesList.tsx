import React from 'react'

import HistoricalStateModalForm from './HistoricalStateModalForm'
import { columnsConfig } from '../../config/tables/historicalStatesListColumnsConfig'
import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { TableComponent } from '../../partials/tablePage'
import { useTablePadeHandlers } from '../../partials/handlers/tablePageHandlers'
import { useGetHistoricalStates, usePostHistoricalState } from '../../utils/hooks/historicalStatesHooks'


export default function HistoricalStatesList() {
  const { historicalStates, refreshFunction } = useGetHistoricalStates()

  const useTablePadeHandlersProps = {objectPostHook: usePostHistoricalState, refreshFunction, tableObjects: historicalStates}
  const { closeObjectModal, confirmLoading, filteredObjectsArray, form, handleModalOk, handleSearch, onFormSubmit, openModal, showModal } = 
      useTablePadeHandlers(useTablePadeHandlersProps)

  const historicalStatesModalForm = () => { return <HistoricalStateModalForm form={form} historicalState={null} onFinish={onFormSubmit} />}

  return(
    <TableComponent 
      closeObjectModal={closeObjectModal}
      columnsConfig={columnsConfig}
      confirmLoading={confirmLoading}
      filteredObjectsArray={filteredObjectsArray}
      formComponent={historicalStatesModalForm()}
      handleModalOk={handleModalOk}
      handleSearch={handleSearch}
      objectName={HISTORICAL_STATE_NAME}
      openModal={openModal}
      showModal={showModal}
    />
  )
}