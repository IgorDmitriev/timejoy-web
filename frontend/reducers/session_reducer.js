  import {
    RECEIVE_ERRORS,
    RECEIVE_CURRENT_USER
  } from '../actions/auth_actions.js';
  import deepFreeze from 'deep-freeze';
  import merge from 'lodash/merge';

  const _nullUser = {
    currentUser: null,
    errors: []
  };

  const SessionReducer = (state = _nullUser, action) => {
    deepFreeze(state);
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return merge(
          {},
          state,
          {
            currentUser: action.currentUser
          }
        );

      case RECEIVE_ERRORS:
        return merge(
          {},
          state,
          {
            errors: action.errors
          }
        );

      default:
        return state;
    }
  };

  export default SessionReducer;
