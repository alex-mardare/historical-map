import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { useParams } from 'react-router'

import { EVENT_NAME } from '../../models/constants/constants'
import { HISTORICAL_EVENTS_SECTION } from '../../models/constants/urls'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { antCardHeaderEvent } from '../../partials/antdCardHeader'
import { useDetailPageHandlers } from '../../partials/handlers/detailsPageHandlers'
import { createSinglePointMapContainer } from '../../partials/leafletMapPartials'
import { DeleteModal, FormModal } from '../../partials/modals'
import { displayBooleanValues } from '../../utils/display/displayBooleanValues'
import {
  displayLatitudeDMS,
  displayLongitudeDMS
} from '../../utils/display/displayCoordinates'
import { useEventCoordinates, useGetEvent } from '../../utils/hooks/eventsHooks'
import { objectDelete } from '../../utils/hooks/generalHooks'
import EventModalForm from './EventModalForm'

import '../../../assets/styling/detailsPage.css'
import '../../../assets/styling/events/eventDetails.css'

export default function EventDetails() {
  const { eventId } = useParams()
  let event = useGetEvent(eventId)

  const detailPageHandlerObj = {
    detailsPageObject: event,
    objectDeleteHook: objectDelete,
    objectTypeName: EVENT_NAME,
    returnPage: HISTORICAL_EVENTS_SECTION
  }
  const {
    closeObjectDeleteModal,
    closeObjectEditModal,
    confirmLoadingDelete,
    confirmLoadingEdit,
    form,
    handleDeleteModalOk,
    handleGoBack,
    isLoadingDeleteButton,
    openObjectEditModal,
    handleEditModalOk,
    onFinishEdit,
    openDelete,
    openEdit,
    openObjectDeleteModal
  } = useDetailPageHandlers(detailPageHandlerObj)

  const coordinates = useEventCoordinates(event)

  //#region DISPLAY FUNCTIONALITY
  const displayCoordinates = (event: HistoricalEvent | null) => {
    if (event?.approximate_location) {
      return (
        displayLatitudeDMS(event.latitude * 1) +
        displayLongitudeDMS(event.longitude * 1)
      )
    } else {
      return <i>Currently no exact location.</i>
    }
  }

  const displayMap = (event: HistoricalEvent | null) => {
    if (event) {
      return createSinglePointMapContainer(
        coordinates,
        event,
        'event-details-map'
      )
    }
  }

  const displayTitleSection = (event: HistoricalEvent | null) => {
    return antCardHeaderEvent(event, handleGoBack)
  }
  //#endregion

  const eventsModalForm = () => {
    return <EventModalForm event={event} form={form} onFinish={onFinishEdit} />
  }

  return (
    <>
      <Card
        actions={[
          <EditOutlined key="edit" onClick={openObjectEditModal} />,
          <DeleteOutlined key="delete" onClick={openObjectDeleteModal} />
        ]}
        id="event-details-card"
        loading={event == null}
        title={displayTitleSection(event)}
      >
        <p>
          <b>Description:</b> {event?.description}
        </p>
        <p>
          <b>Date & Local Time:</b> {event?.date} {event?.time?.toString()}
        </p>
        <p>
          <b>Real Location:</b>{' '}
          {displayBooleanValues(event?.approximate_location)}
        </p>
        <p>
          <b>Coordinates:</b> {displayCoordinates(event)}
        </p>
        <p>
          <b>Event Category:</b> {event?.event_category.name}
        </p>
        <p>
          <b>Present Country:</b> {event?.present_country.name}
        </p>
        <p>
          <b>Historical State:</b> {event?.historical_state.name}
        </p>
      </Card>
      <div className="eventLocation">{displayMap(event)}</div>

      <FormModal
        confirmLoading={confirmLoadingEdit}
        formComponent={eventsModalForm()}
        closeObjectModal={closeObjectEditModal}
        handleModalOk={handleEditModalOk}
        modalTitle="Edit"
        objectName={EVENT_NAME}
        openModal={openEdit}
      />

      <DeleteModal
        confirmLoadingDelete={confirmLoadingDelete}
        closeObjectDeleteModal={closeObjectDeleteModal}
        handleDeleteModalOk={handleDeleteModalOk}
        isLoadingDeleteButton={isLoadingDeleteButton}
        objectName={EVENT_NAME}
        openDelete={openDelete}
      />
    </>
  )
}
