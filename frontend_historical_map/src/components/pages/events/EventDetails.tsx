import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { useParams } from 'react-router';

import { displayBooleanValues } from '../../utils/display/displayBooleanValues';
import { displayLatitudeDMS, displayLongitudeDMS } from '../../utils/display/displayCoordinates';
import { mapPopupIcon } from '../../partials/leafletMapPartials';
import { HistoricalEvent } from '../../models/types/historicalEvent';
import { useFetchEvent } from '../../utils/hooks/useFetchEvents';


export default function EventDetails(){
  const { eventId } = useParams();
  
  const event = useFetchEvent(eventId);

  return(
    <>
      <Card 
        actions={[<EditOutlined key="edit"/>]} 
        loading={event == null} 
        style={{margin: "auto", minWidth: 250}}
        title={event?.name}>
          <p><b>Description:</b> {event?.description}</p>
          <p><b>Date & Local Time:</b> {event?.date} {event?.time?.toString()}</p>
          <p><b>Real Location:</b> {displayBooleanValues(event?.approximateRealLocation)}</p>
          <p><b>Coordinates:</b> {displayCoordinates(event)}</p>
          <p><b>Event Category:</b> {event?.eventCategory.name}</p>
          <p><b>Present Country:</b> {event?.presentCountry.name}</p>
          <p><b>Historical State:</b> {event?.historicalState.name}</p>
      </Card>
      <div>
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
      return (
        <div className="eventLocation">
          <MapContainer 
            center={[event.latitude, event.longitude] as LatLngExpression}
            style={{ height: "52vh"}}
            zoom={13}
            zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker key={event?.id} icon={mapPopupIcon} position={[event.latitude, event.longitude]}>
                <Popup>
                  <b>{event?.name}</b> <br/> {event?.description}
                </Popup>
              </Marker>
            <ZoomControl position='topright'/>
          </MapContainer>
      </div>
      );
    }
  }
}