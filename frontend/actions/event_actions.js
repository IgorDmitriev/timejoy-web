import * as EventAPIUtil from '../util/api_events';
import { receiveEventFormErrors } from './errors_actions';
//consts
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';

// regular actions

export const receiveEvents = events => ({
  type: RECEIVE_EVENTS,
  events
});

export const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

export const removeEvent = event => ({
  type: REMOVE_EVENT,
  event
});

// thunk action creators

export const fetchEvents = (startDate, endDate) => dispatch => (
  EventAPIUtil.fetchEvents(startDate, endDate).then(
    events => dispatch(receiveEvents(events))
  )
);

export const fetchEvent = id => dispatch => (
  EventAPIUtil.fetchEvent(id).then(
    event => dispatch(receiveEvent(event))
  )
);

export const createEvent = event => dispatch => (
  EventAPIUtil.createEvent(event).then(
    events => dispatch(receiveEvents(events))
  ).fail(
    error => dispatch(receiveEventFormErrors(error.responseJSON))
  )
);

export const updateEvent = event => dispatch => (
  EventAPIUtil.updateEvent(event).then(
    events => dispatch(receiveEvents(events))
  ).fail(
    error => dispatch(receiveEventFormErrors(error.responseJSON))
  )
);

export const deleteEvent = id => dispatch => (
  EventAPIUtil.deleteEvent(id).then(
    events => dispatch(receiveEvents(events))
  ).fail(
    error => dispatch(receiveEventFormErrors(error.responseJSON))
  )
);
