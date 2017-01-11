import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  REMOVE_EVENT
} from '../actions/event_actions.js';
import deepFreeze from 'deep-freeze';
import merge from 'lodash/merge';

const EventReducer = (state = {}, action) => {
  deepFreeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events;
    case RECEIVE_EVENT:
      newState[action.event.id] = action.event;
      return newState;
    case REMOVE_EVENT:
      delete newState[action.event.id];
      return newState;
    default:
      return state;
  }
};

export default EventReducer;
