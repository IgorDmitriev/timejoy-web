import { connect } from 'react-redux';
import {
  nextDay,
  previousDay } from '../../actions/calendar_date_controller_actions';
import CalendarDateController from './calendar_date_controller';

const mapStateToProps = (state) => ({
  currentDate: state.currentDate
});

const mapDispatchToProps = (dispatch) => ({
  nextDay: () => dispatch(nextDay()),
  previousDay: () => dispatch(previousDay())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDateController);
