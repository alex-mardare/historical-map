import { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { createMarkerElement } from '../partials/leafletMapPartials';
import { HistoricalEvent } from '../models/types/historicalEvent';

import "leaflet/dist/leaflet.css";


type HistoricalEvents = HistoricalEvent[];
type props = {
  events: HistoricalEvents
}

function Home(props: props) {
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
