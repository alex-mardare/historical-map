import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { DEV_API_EVENTS_APP_BASE_URL } from '../config/constants/endpoints';
import { eventsLoadingError } from '../config/notifications/events';
import { customIcon } from '../elements/customIconLeaflet';

import "leaflet/dist/leaflet.css";

function Home() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(DEV_API_EVENTS_APP_BASE_URL)
        .then(res => setEvents(res.data))
        .catch(() => eventsLoadingError())
  }, []);

  function createMarkerElement(event) {
    if (event.approximateRealLocation !== undefined) {
      return (
        <Marker icon={customIcon} position={[event.latitude, event.longitude]}>
          <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
        </Marker>
      );
    }
  }

  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events.forEach(event => createMarkerElement(event))}
        </MapContainer>
    </div>
  );
}

export default Home;
