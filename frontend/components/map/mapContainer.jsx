import { connect } from 'react-redux';
import _ from 'lodash';

import Map from './map';

const mapStateToProps = state => {
  const events = _.values(state.events);
  const eventsWithLocation = events.filter(
    event => event.lat && event.lng
  );

  const allDirections = [];
  eventsWithLocation.forEach( (event, idx) => {
    if (event.direction) allDirections.push(event.direction);
  });

  return ({
    events: eventsWithLocation,
    allDirections
  });
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
