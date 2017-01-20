import { combineReducers } from 'redux';
import session from './auth_reducer';
import events from './event_reducer';
import currentDate from './calendar_date_controller_reducer';
import errors from './errors_reducer';
import favoritePlaces from './favoritePlaceReducer';
import mapState from './MapReducer';
import status from './StatusReducer';

export default combineReducers({
  session,
  events,
  currentDate,
  errors,
  favoritePlaces,
  mapState,
  status
});
