import React from 'react';
import Calendar from './calendar/calendar';
import Map from './map/mapContainer';
// import EventMarkers from './map/eventMarkersContainer';


const App = ({ children }) => (
  <div className="app">
    <Calendar />
    { children }
    <Map />
  </div>
);

export default App;
