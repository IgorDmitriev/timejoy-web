import { connect } from 'react-redux';
import EventForm from './event_form';
import moment from 'moment';
import merge from 'lodash/merge';

import {
  createEvent,
  updateEvent,
  deleteEvent } from '../../actions/event_actions';
import {
  clearEventFormErrors } from '../../actions/errors_actions';

const mapStateToProps = (state, ownProps) => {
  let props = {
    errors: state.errors.eventFormErrors,
    currentDate: state.currentDate
  };

  if (ownProps.location.query.title &&
      ownProps.location.query.address) {
    props['event'] = {
      title: ownProps.location.query.title,
      address: ownProps.location.query.address
    };
  }

  if (ownProps.params.id) {
    const event = merge(
      {},
      state.events[ownProps.params.id]
    );

    if (event) {
      event['startDate'] = moment(event.startDate);
      event['endDate'] = moment(event.endDate);

      props['event'] = event;
      props['formButtonName'] = 'UPDATE';
    }
  }



  return props;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let formPostAction;
  if (ownProps.params.id) {
    formPostAction = event => dispatch(updateEvent(event));
  } else {
    formPostAction = event => dispatch(createEvent(event));
  }


  return ({
    formPostAction,
    deleteEvent: id => dispatch(deleteEvent(id)),
    clearErrors: () => dispatch(clearEventFormErrors())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
