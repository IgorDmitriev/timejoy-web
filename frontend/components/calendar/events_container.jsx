import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/event_actions';
import _ from 'lodash';

import Events from './events';

const mapStateToProps = state => {
  const events = _.sortBy(_.values(state.events), 'startDate');
  const currentDate = state.currentDate;
  const requestedUpdate = state.status.requestedUpdate;


  return {
    events,
    currentDate,
    requestedUpdate
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: (startDate, endDate) => dispatch(fetchEvents(startDate, endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
