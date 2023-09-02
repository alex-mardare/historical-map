import { EditOutlined } from '@ant-design/icons';
import { Card, Form, Modal } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import EventCreateForm from './EventModalForm';
import { HistoricalEvent } from '../../models/types/historicalEvent';
import { antCardHeaderEvent } from '../../partials/antdCardHeader';
import { createSinglePointMapContainer } from '../../partials/leafletMapPartials';
import { displayBooleanValues } from '../../utils/display/displayBooleanValues';
import { displayLatitudeDMS, displayLongitudeDMS } from '../../utils/display/displayCoordinates';
import { useEventCoordinates, useEventPut, useFetchEvent } from '../../utils/hooks/eventsHooks';

import '../../../assets/styling/events/eventDetails.css';


export default function EventDetails(){
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();
  const { submitData } = useEventPut();
  const navigate = useNavigate();

  const { eventId } = useParams();
  let event = useFetchEvent(eventId);
  const coordinates = useEventCoordinates(event);


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
      return (createSinglePointMapContainer(coordinates, event, 'eventDetailsMap'));
    }
  }

  const displayTitleSection = (event: HistoricalEvent | null) => {
    return antCardHeaderEvent(event, handleGoBack);
  }
  //#endregion


  //#region HANDLERS
  const handleCancel = () => {
    setOpen(false);
  }

  const handleEditEvent = () => {
    setOpen(true);
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields()
      .then((values) => {
        form.resetFields();
        onFinish(values);
      })
  }

  const onFinish = async (values: any) => {
    try {
      await submitData(values, setConfirmLoading, setOpen);
      window.location.reload()
    }
    catch(error) {
      console.log(error);
    }
  }
  //#endregion

  return(
    <>
      <Card 
        actions={[<EditOutlined key='edit' onClick={handleEditEvent} />]} 
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
        confirmLoading={confirmLoading}
        okText='Save'
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        title='Edit Historical Event'
      >
        <EventCreateForm event={event} form={form} onFinish={onFinish} />
      </Modal>
    </>
  )
}