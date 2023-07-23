import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React from 'react';
import { useParams } from 'react-router';

import { useFetchEvent } from '../hooks/useFetchEvents';
import { displayBooleanValues } from '../config/display/displayBooleanValues';
import { displayLatitudeDMS, displayLongitudeDMS } from '../config/display/displayCoordinates';
import { HistoricalEvent } from '../config/types/historicalEvent';


export default function EventDetails(){
  const { eventId } = useParams();
  
  const event = useFetchEvent(eventId);

  return(
    <>
      <Card 
        actions={[<EditOutlined key="edit"/>]} 
        loading={event == null} 
        style={{width: 450}}
        title={event?.name}>
          <p><b>Description:</b> {event?.description}</p>
          <p><b>Date & Local Time:</b> {event?.date} {event?.time?.toString()}</p>
          <p><b>Real Location:</b> {displayBooleanValues(event?.approximateRealLocation)}</p>
          {displayCoordinates(event)}
      </Card>
    </>
  )

  function displayCoordinates(event: HistoricalEvent | null)
  {
    if (event?.approximateRealLocation)
    {
      return <p><b>Coordinates:</b> {displayLatitudeDMS(event.latitude * 1)}, {displayLongitudeDMS(event.longitude * 1)}</p>
    }
  }
}