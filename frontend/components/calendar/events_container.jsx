import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/event_actions';
import values from 'lodash/values';

import Events from './events';

const mapStateToProps = state => {
  let events = values(state.events);
  let currentDate = state.currentDate;

  return {
    events,
    currentDate
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: (startDate, endDate) => dispatch(fetchEvents(startDate, endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
