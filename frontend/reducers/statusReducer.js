import {
  REQUEST_UPDATE
} from '../actions/statusActions.js';

const StatusReducer = (state = {}, action) => {
  let newState = {...state};

  switch (action.type) {
    case REQUEST_UPDATE:
      newState['requestedUpdate'] = action.requestedUpdate;
      return newState;
    default:
      return state;
  }
};

export default StatusReducer;
