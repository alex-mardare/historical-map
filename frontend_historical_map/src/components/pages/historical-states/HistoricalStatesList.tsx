import React from 'react'

import { columnsConfig } from '../../config/tables/historicalStatesListColumnsConfig'
import { HISTORICAL_STATE_NAME } from '../../models/constants/constants'
import { useModalsHandlers } from '../../partials/handlers/modalsHandlers'
import TableComponent from '../../partials/TablePage'
import { useGetHistoricalStates } from '../../utils/hooks/historicalStatesHooks'
import HistoricalStateModalForm from './HistoricalStateModalForm'

export default function HistoricalStatesList() {
  const { historicalStates, refreshFunction } = useGetHistoricalStates()

  const modalHandlerObj = {
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
  } = useModalsHandlers(modalHandlerObj)

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
      formComponent={historicalStatesModalForm()}
      objectName={HISTORICAL_STATE_NAME}
      tableObjectsList={historicalStates}
      {...{
        closeObjectModal,
        columnsConfig,
        confirmLoading,
        handleModalOk,
        openModal,
        showModal
      }}
    />
  )
}
