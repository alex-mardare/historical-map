import React from 'react';

import { createMultiMarkerMapContainer } from '../partials/leafletMapPartials';
import { useGetEvents } from '../utils/hooks/eventsHooks';

import "leaflet/dist/leaflet.css";

import "../../assets/styling/home.css";


function Home() {
  const { events } = useGetEvents()

  return (
    <div className="Home">
      {createMultiMarkerMapContainer(events, 'homeMap', 5)}
    </div>
  );
}

export default Home;
