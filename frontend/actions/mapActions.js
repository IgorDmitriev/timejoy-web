export const SET_MAP = 'SET_MAP';
export const HOVER_EVENT_IN = 'HOVER_EVENT_IN';
export const HOVER_EVENT_OUT = 'HOVER_EVENT_OUT';
export const HOVER_FAVORITE_PLACE = 'HOVER_FAVORITE_PLACE';


export const setMap = map => ({
  type: SET_MAP,
  map
});

export const hoverEventIn = eventId => ({
  type: HOVER_EVENT_IN,
  eventId
});

export const hoverEventOut = eventId => ({
  type: HOVER_EVENT_OUT,
  eventId
});

export const hoverFavoritePlace = favoritePlaceId => ({
  type: HOVER_FAVORITE_PLACE,
  favoritePlaceId
});
