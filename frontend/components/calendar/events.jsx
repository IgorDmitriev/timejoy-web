import React from 'react';

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

    console.log('Current Date', this.props.currentDate);
    console.log('Start of day:', startDate);
    console.log('End of day:', endDate);

    this.props.fetchEvents(
      startDate,
      endDate
    );
  }

  render () {
    return (
      <div>
        <ul>
          {
            this.props.events.map( (event, idx) => (
              <li key={idx}>{event.title}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Events;
