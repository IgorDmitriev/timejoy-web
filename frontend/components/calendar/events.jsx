import React from 'react';
import Event from './event';

class Events extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.fetchEvents.bind(this)();
  }

  componentDidUpdate (prevProps) {
    if (this.props.currentDate !== prevProps.currentDate) {
      this.fetchEvents.bind(this)();
    }
  }

  fetchEvents () {
    const currentDate = this.props.currentDate.clone();
    const beginnigOfADay = currentDate.clone().startOf('day');
    const endingOfADay = currentDate.clone().endOf('day');

    const startDate = beginnigOfADay.utc().format();
    const endDate = endingOfADay.utc().format();

    this.props.fetchEvents(
      startDate,
      endDate
    );
  }

  render () {
    return (
      <div>
        <ul className="calendar-events-list">
          {
            this.props.events.map( (event, idx) => (
              <Event key={idx} event={event} />
            ))
          }
        </ul>
      </div>
    );
  }
}
// <li key={idx}>{event.title}</li>
export default Events;
