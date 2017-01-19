import { connect } from 'react-redux';
import _ from 'lodash';

import {
  fetchFavoritePlaces,
  receiveFavoritePlaces,
  createFavoritePlace
} from '../../actions/favorite_places_actions';
import {
  clearFavoritePlaceFormErrors } from '../../actions/errors_actions';

import FavoritePlacesIndex from './favoritePlacesIndex';


const mapStateToProps = (state, ownProps) => {
  const favoritePlaces = _.sortBy(_.values(state.favoritePlaces), 'id');
  const errors = state.errors.favoritePlaceFormErrors;

  return ({
    favoritePlaces,
    errors
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchFavoritePlaces: () => dispatch(fetchFavoritePlaces()),
  closeTab: () => dispatch(receiveFavoritePlaces({})),
  createFavoritePlace: (favoritePlace) =>
    dispatch(createFavoritePlace(favoritePlace)),
  clearErrors: () => dispatch(clearFavoritePlaceFormErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePlacesIndex);
