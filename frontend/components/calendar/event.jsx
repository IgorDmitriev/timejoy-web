import React from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';

class Event extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.handleEditEvent = this.handleEditEvent.bind(this);
  }

  handleEditEvent () {
    const { event: { id }} = this.props;
    this.props.router.push(`/events/${id}/edit`);
  }

  renderDirectionsInformation () {
    const { direction } = this.props.event;
    if (!direction) return null;

    return (
      <div className="event-travel-time">
        <span>Travel Time: { direction.durationText }</span>
      </div>
    );
  }

  render () {
    const { event } = this.props;
    const startDate = moment(event.startDate).format('h:mma');
    const endDate = moment(event.endDate).format('h:mma');
    const eventClass = event.formatted_address ? 'event-body' : 'event-body grey';

    return (
      <li className="calendar-event">
        <div className="event-start-trip-message"></div>
        { this.renderDirectionsInformation() }
        <div className={ eventClass }
          onClick={ this.handleEditEvent }>
          <span className="event-title">{ event.title }</span>
          <span className="event-time-range">{ startDate } - { endDate }</span>
          <span className="event-address">{ event.address }</span>
        </div>
      </li>
    );
  }
}

export default withRouter(Event);
