import axios from 'axios';
import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";

import { DEV_API_EVENTS_APP_BASE_URL } from '../config/constants/endpoints';
import { eventsLoadingError } from '../config/notifications/events';
import { HistoricalEvent } from '../config/types/historicalEvent';
import { customIcon } from '../elements/customIconLeaflet';

import "leaflet/dist/leaflet.css";


type HistoricalEvents = HistoricalEvent[];



function Home() {
  const [events, setEvents] = useState<HistoricalEvents>([])

  useEffect(() => {
    axios.get(DEV_API_EVENTS_APP_BASE_URL)
        .then(res => setEvents(res.data))
        .catch(() => eventsLoadingError())
  }, []);

  function createMarkerElement(event: HistoricalEvent): JSX.Element | undefined {
    if (event.approximateRealLocation) {
      return (
        <Marker icon={customIcon} position={[event.latitude, event.longitude]}>
          <Popup>
            <b>{event.name}</b> <br/> 
            {event.description}
          </Popup>
        </Marker>
      );
    }
  }

  return (
    <div className="Home">
        <MapContainer 
          center={[51.505, -0.09] as LatLngExpression}
          scrollWheelZoom={true}
          style={{ height: "100vh"}}
          zoom={5}
          zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {events.map(event => createMarkerElement(event))}
          <ZoomControl position='topright'/>
        </MapContainer>
    </div>
  );
}

export default Home;
