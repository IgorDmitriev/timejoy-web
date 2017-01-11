import React from 'react';

class Events extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchEvents();
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
