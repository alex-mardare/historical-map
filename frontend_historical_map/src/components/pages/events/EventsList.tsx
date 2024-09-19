import React from 'react'

import { columnsConfig } from '../../config/tables/eventsListColumnsConfig'
import { EVENT_NAME } from '../../models/constants/constants'
import { useModalsHandlers } from '../../partials/handlers/modalsHandlers'
import { TableComponent } from '../../partials/TablePage'
import { useGetEvents } from '../../utils/hooks/eventsHooks'
import EventModalForm from './EventModalForm'

export default function EventsList() {
  const { events, refreshFunction } = useGetEvents()

  const useModalsHandlersProps = {
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
  } = useModalsHandlers(useModalsHandlersProps)

  const eventsModalForm = () => {
    return <EventModalForm event={null} onFinish={onFormSubmit} {...{ form }} />
  }

  return (
    <TableComponent
      formComponent={eventsModalForm()}
      objectName={EVENT_NAME}
      tableObjectsList={events}
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
