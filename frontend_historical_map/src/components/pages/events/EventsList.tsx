import React from 'react'

import EventModalForm from './EventModalForm'
import { columnsConfig } from '../../config/tables/eventsListColumnsConfig'
import { EVENT_NAME } from '../../models/constants/constants'
import { TableComponent } from '../../partials/tablePage'
import { useTablePadeHandlers } from '../../partials/handlers/tablePageHandlers'
import { useGetEvents } from '../../utils/hooks/eventsHooks'


export default function EventsList() {
  const { events, refreshFunction } = useGetEvents()

  const useTablePadeHandlersProps = {objectName: EVENT_NAME, refreshFunction, tableObjects: events}
  const { closeObjectModal, confirmLoading, filteredObjectsArray, form, handleModalOk, handleSearch, onFormSubmit, openModal, showModal } = 
    useTablePadeHandlers(useTablePadeHandlersProps)

  const eventsModalForm = () => { return <EventModalForm event={null} form={form} onFinish={onFormSubmit} />}

  return(
    <TableComponent 
      closeObjectModal={closeObjectModal}
      columnsConfig={columnsConfig}
      confirmLoading={confirmLoading}
      filteredObjectsArray={filteredObjectsArray}
      formComponent={eventsModalForm()}
      handleModalOk={handleModalOk}
      handleSearch={handleSearch}
      objectName={EVENT_NAME}
      openModal={openModal}
      showModal={showModal}
    />
  )
}