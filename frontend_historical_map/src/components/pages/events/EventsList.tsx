import React from 'react'

import { columnsConfig } from '../../config/tables/eventsListColumnsConfig'
import { EVENT_NAME } from '../../models/constants/constants'
import { useTablePadeHandlers } from '../../partials/handlers/tablePageHandlers'
import { TableComponent } from '../../partials/tablePage'
import { useGetEvents } from '../../utils/hooks/eventsHooks'
import EventModalForm from './EventModalForm'

export default function EventsList() {
  const { events, refreshFunction } = useGetEvents()

  const useTablePadeHandlersProps = {
    objectName: EVENT_NAME,
    refreshFunction,
    tableObjects: events
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

  const eventsModalForm = () => {
    return <EventModalForm event={null} form={form} onFinish={onFormSubmit} />
  }

  return (
    <TableComponent
      closeObjectModal={closeObjectModal}
      columnsConfig={columnsConfig}
      confirmLoading={confirmLoading}
      formComponent={eventsModalForm()}
      handleModalOk={handleModalOk}
      objectName={EVENT_NAME}
      openModal={openModal}
      showModal={showModal}
      tableObjectsList={events}
    />
  )
}
