import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/event_actions';
import _ from 'lodash';

import Events from './events';

const mapStateToProps = state => {
  let events = _.sortBy(_.values(state.events), 'startDate');
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
