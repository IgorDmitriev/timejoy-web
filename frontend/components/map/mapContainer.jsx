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

  const favoritePlaces = _.values(state.favoritePlaces);

  const { homeAddress, homeLat, homeLng } = state.session.currentUser;
  if (homeAddress) {
    const homeEvent = {
      id: 0,
      address: homeAddress,
      formatted_address: homeAddress,
      lat: homeLat,
      lng: homeLng,
      title: 'Home'
    };
    eventsWithLocation.push(homeEvent);
  }

  return ({
    events: eventsWithLocation,
    allDirections,
    favoritePlaces
  });
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
