import {
  NEXT_DAY,
  PREVIOUS_DAY
} from '../actions/calendar_date_controller_actions.js';
import {
  LOG_OUT
} from '../actions/auth_actions';

import merge from 'lodash/merge';
import moment from 'moment';

const _currentDate = moment();

const CalendarDateControllerReducer = (state = _currentDate, action) => {
  let newState = state.clone();

  switch (action.type) {
    case NEXT_DAY:
      return newState.add(1, 'd');
    case PREVIOUS_DAY:
      return newState.subtract(1, 'd');

    case LOG_OUT:
      return _currentDate;
    default:
      return state;
  }
};

export default CalendarDateControllerReducer;
