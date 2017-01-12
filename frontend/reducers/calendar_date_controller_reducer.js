import {
  NEXT_DAY,
  PREVIOUS_DAY
} from '../actions/calendar_date_controller_actions.js';

import merge from 'lodash/merge';
import moment from 'moment';

const _currentDate = moment();

const CalendarDateControllerReducer = (state = _currentDate, action) => {
  let newState = state.clone();
  console.log(state);
  switch (action.type) {
    case NEXT_DAY:
      return newState.add(1, 'd');
    case PREVIOUS_DAY:
      return newState.subtract(1, 'd');
    default:
      return state;
  }
};

export default CalendarDateControllerReducer;
