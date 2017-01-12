import * as EventAPIUtil from '../util/api_events';

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

export const fetchEvents = () => dispatch => (
  EventAPIUtil.fetchEvents().then(
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
    newEvent => dispatch(receiveEvent(newEvent))
  )
);

export const updateEvent = event => dispatch => (
  EventAPIUtil.updateEvent(event).then(
    updatedEvent => dispatch(receiveEvent(updatedEvent))
  )
);

export const deleteEvent = id => dispatch => (
  EventAPIUtil.deleteEvent(id).then(
    deletedEvent => dispatch(removeEvent(deletedEvent))
  )
);