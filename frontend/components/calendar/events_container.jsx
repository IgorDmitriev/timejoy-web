import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/event_actions';
import values from 'lodash/values';

import Events from './events';

const mapStateToProps = state => {
  let events = values(state.events);

  return {
    events
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
