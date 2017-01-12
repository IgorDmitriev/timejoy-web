import { combineReducers } from 'redux';
import session from './auth_reducer';
import events from './event_reducer';
import currentDate from './calendar_date_controller_reducer';

export default combineReducers({
  session,
  events,
  currentDate
});
