export const SET_MAP = 'SET_MAP';
export const HOVER_EVENT = 'HOVER_EVENT';
export const HOVER_FAVORITE_PLACE = 'HOVER_FAVORITE_PLACE';


export const setMap = map => ({
  type: SET_MAP,
  map
});

export const hoverEvent = eventId => ({
  type: HOVER_EVENT,
  eventId
});

export const hoverFavoritePlace = favoritePlaceId => ({
  type: HOVER_FAVORITE_PLACE,
  favoritePlaceId
});
