import React from 'react';

import { createMapContainer } from '../partials/leafletMapPartials';
import { HistoricalEvents } from '../models/types/historicalEvent';

import "leaflet/dist/leaflet.css";

import "../../assets/styling/home.css";


type props = {
  events: HistoricalEvents
}

function Home(props: props) {
  return (
    <div className="Home">
      {createMapContainer('homeMap', props.events, 5)}
    </div>
  );
}

export default Home;
