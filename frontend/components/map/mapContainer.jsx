import { connect } from 'react-redux';
import _ from 'lodash';

import Map from './map';

const mapStateToProps = state => {
  const events = _.values(state.events);
  const eventsWithLocation = events.filter(
    event => event.lat && event.lng
  );

  return ({
    events: eventsWithLocation
  });
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
