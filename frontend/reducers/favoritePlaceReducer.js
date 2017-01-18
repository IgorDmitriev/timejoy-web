import {
  RECEIVE_FAVORITE_PLACES,
  RECEIVE_FAVORITE_PLACE,
  REMOVE_FAVORITE_PLACE
} from '../actions/favorite_places_actions';
import {
  LOG_OUT
} from '../actions/auth_actions';
import deepFreeze from 'deep-freeze';
import merge from 'lodash/merge';

const FavoritePlacesReducer = (state = {}, action) => {
  deepFreeze(state);

  switch (action.type) {
    case RECEIVE_FAVORITE_PLACES:
      return action.favoritePlaces;
    case RECEIVE_FAVORITE_PLACE:
      return ({
        ...state,
        ...{
          [action.favoritePlace.id]: action.favoritePlace
        }
      });
    case REMOVE_FAVORITE_PLACE:
      let newState = { ...state };
      delete newState[action.favoritePlace.id];
      return newState;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

export default FavoritePlacesReducer;
