import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Form, Modal } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import EventModalForm from './EventModalForm'
import { HistoricalEvent } from '../../models/types/historicalEvent'
import { antCardHeaderEvent } from '../../partials/antdCardHeader'
import { createSinglePointMapContainer } from '../../partials/leafletMapPartials'
import { displayBooleanValues } from '../../utils/display/displayBooleanValues'
import { displayLatitudeDMS, displayLongitudeDMS } from '../../utils/display/displayCoordinates'
import { handleFormSubmission } from '../../utils/forms/formSubmission'
import { eventDelete, useEventCoordinates, useEventGet, useEventPut } from '../../utils/hooks/eventsHooks'

import '../../../assets/styling/events/eventDetails.css'
import '../../../assets/styling/detailsPage.css'


export default function EventDetails(){
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false)
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [form] = Form.useForm()
  const { submitData } = useEventPut()
  const navigate = useNavigate()

  const { eventId } = useParams()
  let event = useEventGet(eventId)
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

  //#region HANDLERS PAGE
  const handleGoBack = () => {
    navigate('/events')
  }
  //#endregion


  //#region HANDLERS DELETE
  const handleCancelDelete = () => {
    setOpenDelete(false)
  }

  const handleEventDelete = () => {
    setOpenDelete(true)
  }

  const handleOkDelete = () => {
    try {
      setConfirmLoadingDelete(true)
      eventDelete(event)
      setOpenDelete(false)

      setTimeout(() => {
        handleGoBack()
      }, 1250)
    }
    catch(error) {
      setConfirmLoadingDelete(false)
      setOpenDelete(true)
      console.log(error)
    }
  }
  //#endregion

  //#region HANDLERS EDIT
  const handleCancelEdit = () => {
    setOpenEdit(false)
  }

  const handleEventEdit = () => {
    setOpenEdit(true)
  }

  const handleOkEdit = () => {
    handleFormSubmission(form, onFinishEdit, setConfirmLoadingEdit)
  }

  const onFinishEdit = async (values: any) => {
    try {
      await submitData(values, setConfirmLoadingEdit, setOpenEdit)
      window.location.reload()
    }
    catch(error) {
      console.log(error)
    }
  }
  //#endregion

  return(
    <>
      <Card 
        actions={[
          <EditOutlined key='edit' onClick={handleEventEdit} />,
          <DeleteOutlined key='delete' onClick={handleEventDelete} />
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
      <Modal
        confirmLoading={confirmLoadingEdit}
        okText='Save'
        onCancel={handleCancelEdit}
        onOk={handleOkEdit}
        open={openEdit}
        title='Edit Event'
      >
        <EventModalForm event={event} form={form} onFinish={onFinishEdit} />
      </Modal>
      <Modal
        confirmLoading={confirmLoadingDelete}
        okButtonProps={{danger:true}}
        okText='Delete'
        onCancel={handleCancelDelete}
        onOk={handleOkDelete}
        open={openDelete}
        title='Delete Event'
      >
        <h2>Are you sure you want to remove this historical event?</h2>
      </Modal>
    </>
  )
}