import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { useParams } from 'react-router'

import EventModalForm from './EventModalForm'
import { EVENT_NAME } from '../../models/constants/constants'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { antCardHeaderEvent } from '../../partials/antdCardHeader'
import { useDetailPageHandlers } from '../../partials/detailsPageHandlers'
import { createSinglePointMapContainer } from '../../partials/leafletMapPartials'
import { DeleteModal, FormModal } from '../../partials/modals'
import { displayBooleanValues } from '../../utils/display/displayBooleanValues'
import { displayLatitudeDMS, displayLongitudeDMS } from '../../utils/display/displayCoordinates'
import { eventDelete, useEventCoordinates, useGetEvent, usePutEvent } from '../../utils/hooks/eventsHooks'

import '../../../assets/styling/events/eventDetails.css'
import '../../../assets/styling/detailsPage.css'


export default function EventDetails(){
  const { eventId } = useParams()
  let event = useGetEvent(eventId)

  const useDetailPageHandlersProps = {detailsPageObject: event, objectDeleteHook: eventDelete, objectPutHook: usePutEvent, returnPage: 'events'}
  const { closeObjectDeleteModal, closeObjectEditModal, confirmLoadingDelete, confirmLoadingEdit, form, handleDeleteModalOk, handleGoBack, openObjectEditModal, 
    handleEditModalOk, onFinishEdit, openDelete, openEdit, openObjectDeleteModal } = useDetailPageHandlers(useDetailPageHandlersProps)

  const coordinates = useEventCoordinates(event)

  //#region DISPLAY FUNCTIONALITY
  const displayCoordinates = (event: HistoricalEvent | null) => {
    if (event?.approximateRealLocation) {
      return displayLatitudeDMS(event.latitude * 1) + displayLongitudeDMS(event.longitude * 1)
    }
    else {
      return <i>Currently no exact location.</i>
    }
  }

  const displayMap = (event: HistoricalEvent | null) => {
    if (event) {
      return (createSinglePointMapContainer(coordinates, event, 'eventDetailsMap'))
    }
  }

  const displayTitleSection = (event: HistoricalEvent | null) => {
    return antCardHeaderEvent(event, handleGoBack)
  }
  //#endregion

  const eventsModalForm = () => { return (<EventModalForm event={event} form={form} onFinish={onFinishEdit} />)}

  return(
    <>
      <Card 
        actions={[
          <EditOutlined key='edit' onClick={openObjectEditModal} />,
          <DeleteOutlined key='delete' onClick={openObjectDeleteModal} />
        ]}
        id='eventDetailsCard'
        loading={event == null} 
        title={displayTitleSection(event)}>
          <p><b>Description:</b> {event?.description}</p>
          <p><b>Date & Local Time:</b> {event?.date} {event?.time?.toString()}</p>
          <p><b>Real Location:</b> {displayBooleanValues(event?.approximateRealLocation)}</p>
          <p><b>Coordinates:</b> {displayCoordinates(event)}</p>
          <p><b>Event Category:</b> {event?.eventCategory.name}</p>
          <p><b>Present Country:</b> {event?.presentCountry.name}</p>
          <p><b>Historical State:</b> {event?.historicalState.name}</p>
      </Card>
      <div className="eventLocation">
        {displayMap(event)}
      </div>
      
      <FormModal
        confirmLoadingEdit={confirmLoadingEdit}
        formComponent={eventsModalForm()}
        closeObjectEditModal={closeObjectEditModal}
        handleEditModalOk={handleEditModalOk}
        objectName={EVENT_NAME}
        openEdit={openEdit}
      />

      <DeleteModal
        confirmLoadingDelete={confirmLoadingDelete}
        closeObjectDeleteModal={closeObjectDeleteModal}
        handleDeleteModalOk={handleDeleteModalOk}
        objectName={EVENT_NAME}
        openDelete={openDelete}
      />
    </>
  )
}