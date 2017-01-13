import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/event_actions';
import values from 'lodash/values';
import sortBy from 'lodash.sortby';

import Events from './events';

const mapStateToProps = state => {
  let events = sortBy(values(state.events), 'start_date');
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
