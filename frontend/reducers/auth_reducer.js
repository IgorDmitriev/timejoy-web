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

  const AuthReducer = (state = _nullUser, action) => {
    deepFreeze(state);
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return (
          {
            currentUser: action.currentUser,
            errors: []
          }
        );

      case RECEIVE_ERRORS:
        return (
          {
            currentUser: null,
            errors: action.errors
          }
        );

      default:
        return state;
    }
  };

  export default AuthReducer;
