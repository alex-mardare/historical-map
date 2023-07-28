import L, { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

import markerIcon from '../../assets/markerIcon.png';
import markerShadow from '../../assets/markerShadow.png';
import { HistoricalEvent, HistoricalEvents } from '../models/types/historicalEvent';


const mapPopupIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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

export function createMapContainer(idName: string, events: HistoricalEvents, zoomLevel: number) {
  if (events != null && events.length > 0) {
    return (
      <MapContainer
        center={[events[0].latitude, events[0].longitude] as LatLngExpression}
        id={idName} 
        zoom={zoomLevel}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events?.map(event => createMarkerElement(event))}
        <ZoomControl position='topright'/>
      </MapContainer>
    );
  }
}