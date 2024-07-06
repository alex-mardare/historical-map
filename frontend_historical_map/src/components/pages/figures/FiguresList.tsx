import React from 'react'

import { columnsConfig } from '../../config/tables/figuresListColumnsConfig'
import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { useTablePadeHandlers } from '../../partials/handlers/tablePageHandlers'
import { TableComponent } from '../../partials/tablePage'
import { useGetFigures } from '../../utils/hooks/figuresHooks'
import FiguresModalForm from './FiguresModalForm'

export default function FiguresList() {
  const { figures, refreshFunction } = useGetFigures()

  const useTablePadeHandlersProps = {
    objectName: HISTORICAL_FIGURE_NAME,
    refreshFunction: refreshFunction,
    tableObjects: figures
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

  const figuresModalForm = () => {
    return (
      <FiguresModalForm figure={null} form={form} onFinish={onFormSubmit} />
    )
  }

  return (
    <TableComponent
      closeObjectModal={closeObjectModal}
      columnsConfig={columnsConfig}
      confirmLoading={confirmLoading}
      formComponent={figuresModalForm()}
      handleModalOk={handleModalOk}
      objectName={HISTORICAL_FIGURE_NAME}
      openModal={openModal}
      showModal={showModal}
      tableObjectsList={figures}
    />
  )
}
