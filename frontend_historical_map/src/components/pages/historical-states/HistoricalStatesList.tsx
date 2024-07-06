import React from 'react'

import { columnsConfig } from '../../config/tables/historicalStatesListColumnsConfig'
import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { useTablePadeHandlers } from '../../partials/handlers/tablePageHandlers'
import { TableComponent } from '../../partials/tablePage'
import { useGetHistoricalStates } from '../../utils/hooks/historicalStatesHooks'
import HistoricalStateModalForm from './HistoricalStateModalForm'

export default function HistoricalStatesList() {
  const { historicalStates, refreshFunction } = useGetHistoricalStates()

  const useTablePadeHandlersProps = {
    objectName: HISTORICAL_STATE_NAME,
    refreshFunction,
    tableObjects: historicalStates
  }
  const {
    closeObjectModal,
    confirmLoading,
    form,
    handleModalOk,
    onFormSubmit,
    openModal,
    showModal
  } = useTablePadeHandlers(useTablePadeHandlersProps)

  const historicalStatesModalForm = () => {
    return (
      <HistoricalStateModalForm
        form={form}
        historicalState={null}
        onFinish={onFormSubmit}
      />
    )
  }

  return (
    <TableComponent
      closeObjectModal={closeObjectModal}
      columnsConfig={columnsConfig}
      confirmLoading={confirmLoading}
      formComponent={historicalStatesModalForm()}
      handleModalOk={handleModalOk}
      objectName={HISTORICAL_STATE_NAME}
      openModal={openModal}
      showModal={showModal}
      tableObjectsList={historicalStates}
    />
  )
}
