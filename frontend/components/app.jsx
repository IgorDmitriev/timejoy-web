import React from 'react';
import Calendar from './calendar/calendar';
import Map from './map/map.jsx';


const App = ({ children }) => (
  <div className="app">
    <Calendar>
      { children }
    </Calendar>
    <Map />
  </div>
);

export default App;
