export const RECEIVE_EVENT_FORM_ERRORS = 'RECEIVE_EVENT_FORM_ERRORS';
export const CLEAR_EVENT_FORM_ERRORS = 'CLEAR_EVENT_FORM_ERRORS';
export const RECEIVE_FAVORITE_PLACE_FORM_ERRORS = 'RECEIVE_FAVORITE_PLACE_FORM_ERRORS';
export const CLEAR_FAVORITE_PLACE_FORM_ERRORS = 'CLEAR_FAVORITE_PLACE_FORM_ERRORS';

export const receiveEventFormErrors = errors => ({
  type: RECEIVE_EVENT_FORM_ERRORS,
  errors
});

export const clearEventFormErrors = errors => ({
  type: CLEAR_EVENT_FORM_ERRORS,
});

export const receiveFavoritePlaceFormErrors = errors => ({
  type: RECEIVE_FAVORITE_PLACE_FORM_ERRORS,
  errors
});

export const clearFavoritePlaceFormErrors = errors => ({
  type: CLEAR_FAVORITE_PLACE_FORM_ERRORS,
});
