export const RECEIVE_EVENT_FORM_ERRORS = 'RECEIVE_EVENT_FORM_ERRORS';
export const CLEAR_EVENT_FORM_ERRORS = 'CLEAR_EVENT_FORM_ERRORS';

export const receiveEventFormErrors = errors => ({
  type: RECEIVE_EVENT_FORM_ERRORS,
  errors
});

export const clearEventFormErrors = errors => ({
  type: CLEAR_EVENT_FORM_ERRORS,
});
