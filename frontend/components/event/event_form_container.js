import { connect } from 'react-redux';
import EventForm from './event_form';
import moment from 'moment';

import { createEvent, updateEvent } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => {
  let props = {
    errors: state.errors.eventFormErrors
  };
  if (ownProps.params.id) {
    props['event'] = state.events[ownProps.params.id];
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
