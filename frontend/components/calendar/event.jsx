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

  renderStartTripMessage () {
    const { direction } = this.props.event;
    const { event } = this.props;
    if (!direction) return null;

    const leaveTime = moment(event.startDate).clone().subtract(direction.durationValue, 'seconds').format('h:mma');

    return (
      <div className="event-start-trip-message">
        <span className='leave-time'>{leaveTime}</span>
        <span className='leave-message'>Start your trip</span>
      </div>
    );
  }

  render () {
    const { event } = this.props;
    const startDate = moment(event.startDate).format('h:mma');
    const endDate = moment(event.endDate).format('h:mma');
    let eventClass = 'event-body';
    if (!event.formatted_address) eventClass = eventClass.concat(' grey');
    if (event.hovered) eventClass = eventClass.concat(' hovered');

    return (
      <li className="calendar-event">
        { this.renderStartTripMessage() }
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
