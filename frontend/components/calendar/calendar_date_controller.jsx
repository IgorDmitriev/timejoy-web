import React from 'react';

import Previous from './previous';
import Next from './next';
import DateTitle from './date_title';

class CalendarDateController extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="date-controller">
        <Previous action={this.props.previousDay} />
        <DateTitle date={this.props.currentDate} />
        <Next action={this.props.nextDay} />
      </div>
    );
  }
}

export default CalendarDateController;
