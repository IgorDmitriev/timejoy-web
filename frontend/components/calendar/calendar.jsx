import React from 'react';

import NavBar from './nav_bar_container';
import Events from './events_container';

const Calendar = () => (
  <div className="calendar-tab">
    <NavBar />
    <Events />
  </div>
);

export default Calendar;
