import {
  RECEIVE_EVENT_FORM_ERRORS,
  CLEAR_EVENT_FORM_ERRORS
} from '../actions/errors_actions';
import deepFreeze from 'deep-freeze';
import merge from 'lodash/merge';

const _nullErrors = {
  eventFormErrors: []
};

const ErrorsReducer = (state = _nullErrors, action) => {
  deepFreeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_EVENT_FORM_ERRORS:
      newState.eventFormErrors = action.errors;
      return newState;
    case CLEAR_EVENT_FORM_ERRORS:
      newState.eventFormErrors = [];
      return newState;
    default:
      return state;
  }
};

export default ErrorsReducer;
