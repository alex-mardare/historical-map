import { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";

import { HistoricalEvent } from '../config/types/historicalEvent';
import { mapPopupIcon } from '../config/components/mapPopupIcon';

import "leaflet/dist/leaflet.css";


type HistoricalEvents = HistoricalEvent[];
type props = {
  events: HistoricalEvents
}

function Home(props: props) {
  function createMarkerElement(event: HistoricalEvent): JSX.Element | undefined {
    if (event.approximateRealLocation) {
      return (
        <Marker key={event.id} icon={mapPopupIcon} position={[event.latitude, event.longitude]}>
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
            {props.events?.map(event => createMarkerElement(event))}
          <ZoomControl position='topright'/>
        </MapContainer>
    </div>
  );
}

export default Home;
