import { connect } from 'react-redux';
import EventForm from './event_form';
import moment from 'moment';

import { createEvent, updateEvent } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => {
  let props = {
    errors: state.errors.eventFormErrors,
    currentDate: state.currentDate
  };

  if (ownProps.params.id) {
    // debugger
    const event = state.events[ownProps.params.id];

    if (event) {
      event.startDate = moment(event.startDate);
      event.endDate = moment(event.endDate);

      props['event'] = event;
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
    formPostAction
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
