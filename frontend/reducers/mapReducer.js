import {
  SET_MAP,
  HOVER_EVENT,
  HOVER_FAVORITE_PLACE
} from '../actions/mapActions';

const _nullMapState = {
  map: null,
  hoveredEvent: null,
  hoveredFavoritePlace: null
};

const MapReducer = (state = _nullMapState, action) => {
  switch (action.type) {
    case SET_MAP:
      state.map = action.map;
      return state;
    case HOVER_EVENT:
      state.hoveredEvent = action.eventId;
      return state;
    case HOVER_FAVORITE_PLACE:
      state.hoveredFavoritePlace = action.favoritePlaceId;
      return state;
    default:
      return state;
  }
};

export default MapReducer;
