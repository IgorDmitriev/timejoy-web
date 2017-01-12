import * as AuthAPIUtil from '../util/api_auth';

//consts
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_LOGOUT_SUCCESS = 'RECEIVE_LOGOUT_SUCCESS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOG_OUT = 'LOG_OUT';

//regular actions

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveLogoutSuccess = () => ({
  type: RECEIVE_LOGOUT_SUCCESS
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const receiveLogout = () => ({
  type: LOG_OUT
});

//thunk actions

export const requestLogin = user => dispatch => {
  return AuthAPIUtil.login(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser))
  ).fail(
    error => dispatch(receiveErrors(error.responseJSON))
  );
};

export const requestLogout = () => dispatch => {
  return AuthAPIUtil.logout().then(
    () => dispatch(receiveLogout())
  );
};

export const requestSignup = user => dispatch => {
  return AuthAPIUtil.signup(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser))
  ).fail(
    error => dispatch(receiveErrors(error.responseJSON))
  );
};
