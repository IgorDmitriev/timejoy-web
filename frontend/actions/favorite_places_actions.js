import * as FavoritePlacesAPIUtil from '../util/favoritePlacesAPIUtil';
import { receiveFavoritePlaceFormErrors } from './errors_actions';

export const RECEIVE_FAVORITE_PLACES = 'RECEIVE_FAVORITE_PLACES';
export const RECEIVE_FAVORITE_PLACE = 'RECEIVE_FAVORITE_PLACE';
export const REMOVE_FAVORITE_PLACE = 'REMOVE_FAVORITE_PLACE';

//regulat actions

export const receiveFavoritePlaces = favoritePlaces => ({
  type: RECEIVE_FAVORITE_PLACES,
  favoritePlaces
});

export const receiveFavoritePlace = favoritePlace => ({
  type: RECEIVE_FAVORITE_PLACE,
  favoritePlace
});

export const removeFavoritePlace = favoritePlace => ({
  type: REMOVE_FAVORITE_PLACE,
  favoritePlace
});


// thunk action creators

export const fetchFavoritePlaces = () => dispatch => {
  return FavoritePlacesAPIUtil.fetchFavoritePlaces().then(
    favoritePlaces => dispatch(receiveFavoritePlaces(favoritePlaces))
  );
};


export const fetchFavoritePlace = id => dispatch => (
  FavoritePlacesAPIUtil.fetchFavoritePlace(id).then(
    favoritePlace => dispatch(receiveFavoritePlace(favoritePlace))
  )
);

export const createFavoritePlace = favoritePlace => dispatch => (
  FavoritePlacesAPIUtil.createFavoritePlace(favoritePlace).then(
    favoritePlaces => dispatch(receiveFavoritePlaces(favoritePlaces))
  ).fail(
    error => dispatch(receiveFavoritePlaceFormErrors(error.responseJSON))
  )
);

export const updateFavoritePlace = favoritePlace => dispatch => (
  FavoritePlacesAPIUtil.updateFavoritePlace(favoritePlace).then(
    favoritePlaces => dispatch(receiveFavoritePlaces(favoritePlaces))
  ).fail(
    error => dispatch(receiveFavoritePlaceFormErrors(error.responseJSON))
  )
);

export const deleteFavoritePlace = id => dispatch => (
  FavoritePlacesAPIUtil.deleteFavoritePlace(id).then(
    favoritePlaces => dispatch(receiveFavoritePlaces(favoritePlaces))
  ).fail(
    error => dispatch(receiveFavoritePlaceFormErrors(error.responseJSON))
  )
);
