import { connect } from 'react-redux';

import {
  updateFavoritePlace,
  deleteFavoritePlace
} from '../../actions/favorite_places_actions';
import {
  clearFavoritePlaceFormErrors } from '../../actions/errors_actions';

import FavoritePlacesListItem from './favoritePlacesListItem';

const mapStateToProps = (state) => ({
  errors: state.errors.favoritePlaceFormErrors
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateFavoritePlace: (favoritePlace) =>
    dispatch(updateFavoritePlace(favoritePlace)),
  deleteFavoritePlace: (id) =>
    dispatch(deleteFavoritePlace(id)),
  clearErrors: () => dispatch(clearFavoritePlaceFormErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePlacesListItem);
