import { combineReducers } from 'redux';
import session from './auth_reducer';
import events from './event_reducer';

export default combineReducers({
  session,
  events
});
