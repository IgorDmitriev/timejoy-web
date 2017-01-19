import { connect } from 'react-redux';

import {
  receiveFavoritePlaces
} from '../../actions/favorite_places_actions';

import FavoritePlacesNavBar from './FavoritePlacesNavBar';


const mapDispatchToProps = (dispatch, ownProps) => ({
  closeTab: () => dispatch(receiveFavoritePlaces({}))
});

export default connect(
  null,
  mapDispatchToProps
)(FavoritePlacesNavBar);
