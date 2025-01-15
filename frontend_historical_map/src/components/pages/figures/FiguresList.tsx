import React from 'react'

import { columnsConfig } from '../../config/tables/figuresListColumnsConfig'
import { HISTORICAL_FIGURE_NAME } from '../../models/constants/constants'
import { useModalsHandlers } from '../../partials/handlers/modalsHandlers'
import TableComponent from '../../partials/TablePage'
import { useGetFigures } from '../../utils/hooks/figuresHooks'
import FiguresModalForm from './FiguresModalForm'

export default function FiguresList() {
  const { figures, refreshFunction } = useGetFigures()

  const modalHandlerObj = {
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
  } = useModalsHandlers(modalHandlerObj)

  const figuresModalForm = () => {
    return (
      <FiguresModalForm figure={null} form={form} onFinish={onFormSubmit} />
    )
  }

  return (
    <TableComponent
      formComponent={figuresModalForm()}
      objectName={HISTORICAL_FIGURE_NAME}
      tableObjectsList={figures}
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
