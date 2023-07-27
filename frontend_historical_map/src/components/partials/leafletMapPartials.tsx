import L from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import markerIcon from '../../assets/markerIcon.png';
import markerShadow from '../../assets/markerShadow.png';
import { HistoricalEvent } from '../models/types/historicalEvent';


export const mapPopupIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function createMarkerElement(event: HistoricalEvent): JSX.Element | undefined {
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