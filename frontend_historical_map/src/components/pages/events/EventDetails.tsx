import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { antCardHeader } from '../../partials/antdCardHeader';
import { createMapContainer } from '../../partials/leafletMapPartials';
import { HistoricalEvent, HistoricalEvents } from '../../models/types/historicalEvent';
import { displayBooleanValues } from '../../utils/display/displayBooleanValues';
import { displayLatitudeDMS, displayLongitudeDMS } from '../../utils/display/displayCoordinates';
import { useFetchEvent } from '../../utils/hooks/eventsHooks';

import '../../../assets/styling/events/eventDetails.css';


export default function EventDetails(){
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = useFetchEvent(eventId);

  const handleGoBack = () => {
    navigate(-1);
  }

  return(
    <>
      <Card 
        actions={[<EditOutlined key="edit"/>]} 
        loading={event == null} 
        title={returnTitleSection(event?.name)}>
          <p><b>Description:</b> {event?.description}</p>
          <p><b>Date & Local Time:</b> {event?.date} {event?.time?.toString()}</p>
          <p><b>Real Location:</b> {displayBooleanValues(event?.approximateRealLocation)}</p>
          <p><b>Coordinates:</b> {displayCoordinates(event)}</p>
          <p><b>Event Category:</b> {event?.eventCategory.name}</p>
          <p><b>Present Country:</b> {event?.presentCountry.name}</p>
          <p><b>Historical State:</b> {event?.historicalState.name}</p>
      </Card>
      <div className="eventLocation">
        {returnMap(event)}
      </div>
    </>
  )

  function displayCoordinates(event: HistoricalEvent | null)
  {
    if (event?.approximateRealLocation)
    {
      return displayLatitudeDMS(event.latitude * 1) + displayLongitudeDMS(event.longitude * 1)
    }
  }

  function returnMap(event: HistoricalEvent | null)
  {
    if (event) {
      const events: HistoricalEvents = [event];
      return (createMapContainer('eventDetailsMap', events, 13));
    }
  }

  function returnTitleSection(eventName: string | undefined)
  {
    return antCardHeader(eventName, handleGoBack);
  }
}