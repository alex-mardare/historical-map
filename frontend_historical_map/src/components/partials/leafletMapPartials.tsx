import L, { LatLngExpression } from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import React from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl
} from 'react-leaflet'

import markerIcon from '../../assets/markerIcon.png'
import markerShadow from '../../assets/markerShadow.png'
import {
  HistoricalEvent,
  HistoricalEvents
} from '../models/types/historicalEvent'

const mapPopupIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function createMarkerElement(event: HistoricalEvent): JSX.Element | undefined {
  if (event.approximate_location) {
    return (
      <Marker
        key={event.id}
        icon={mapPopupIcon}
        position={[event.latitude, event.longitude]}
      >
        <Popup>
          <b>{event.name}</b> <br />
          {event.description}
        </Popup>
      </Marker>
    )
  }
}

export function createMultiMarkerMapContainer(
  events: HistoricalEvents | null,
  idName: string,
  zoomLevel: number
) {
  if (events && events.length > 0) {
    const event = events[0]

    return (
      <MapContainer
        center={[event.latitude, event.longitude] as LatLngExpression}
        id={idName}
        zoom={zoomLevel}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {events?.map((event) => createMarkerElement(event))}
        <ZoomControl position="topright" />
      </MapContainer>
    )
  }
}

export function createSinglePointMapContainer(
  coordinates: number[] | null,
  event: HistoricalEvent,
  idName: string
) {
  if (coordinates) {
    return (
      <MapContainer
        center={[coordinates[0], coordinates[1]] as LatLngExpression}
        id={idName}
        zoom={event.approximate_location ? 13 : 7}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {event.approximate_location && createMarkerElement(event)}
        <ZoomControl position="topright" />
      </MapContainer>
    )
  } else {
    return <div>Loading...</div>
  }
}

export async function returnMapCoordinatesByPresentCountryName(
  event: HistoricalEvent
) {
  const provider = new OpenStreetMapProvider()
  const mapResult = await provider.search({ query: event.present_country.name })
  return mapResult
}
