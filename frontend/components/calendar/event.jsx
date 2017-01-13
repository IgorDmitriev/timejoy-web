import React from 'react';
import moment from 'moment';

const Event = ({ event }) => {
  const startDate = moment(event.start_date).format('h:mma');
  const endDate = moment(event.end_date).format('h:mma');


  return (
    <li className="calendar-event">
      <div className="event-start-trip-message"></div>
      <div className="event-travel-time"></div>
      <div className="event-body">
        <span className="event-title">{ event.title }</span>
        <span className="event-time-range">{ startDate } - { endDate }</span>
        <span className="event-address">{ event.address }</span>
      </div>
    </li>
  );
};

export default Event;
