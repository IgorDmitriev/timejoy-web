import React from 'react';
import moment from 'moment';
import merge from 'lodash/merge';

class EventForm extends React.Component {
  constructor (props) {
    super(props);
    console.log(props);

    this.state = merge({}, props.event, {
      startDate: props.event.startDate.format('HH:mm'),
      endDate: props.event.endDate.format('HH:mm'),
      duration: 30
    });

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.convertToData = this.convertToData.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate (prevProps, prevState) {

    // Apply Duration if startDate changed and valid
    if (prevState.startDate !== this.state.startDate) {
      let startDate = moment(this.state.startDate, 'HH:mm');

      if (startDate) {
        this.setState({
          endDate: startDate.add(this.state.duration, 'm').format('HH:mm')
        });
      }
    }
  }

  handleInput (field) {
    return (e) => {
      const value = e.currentTarget.value;

      this.setState({
        [field]: value
      });
    };
  }

  convertToData (field) {
    return () => {
      this.setState({
        [field]: moment(this.state[field], 'HH:mm')
      });
    };
  }

  changeDuration (minutes) {
    return () => {
      let startDate = moment(this.state.startDate, 'HH:mm');
      if (startDate) {
        this.setState({
          endDate: startDate.add(minutes, 'm').format('HH:mm'),
          duration: minutes
        });
      }
    };
  }

  handleClose () {
    this.props.router.push('/');
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(this.state);
    const startDate = moment(this.state.startDate, 'HH:mm').utc().format();
    const endDate = moment(this.state.endDate, 'HH:mm').utc().format();

    const event = merge(
      {},
      this.state,
      {
        startDate,
        endDate
      }
    );
    this.props.formPostAction(event);
  }

  render () {
    return (
      <div className="event-form-tab">
        <div className="navbar">
          <button onClick={ this.handleClose }>CLOSE</button>
          <span>Event Form</span>
          <button onClick={ this.handleSubmit }>SAVE</button>
        </div>
        <div className="event-form-errors">
          <ul>
            { this.props.errors.map( (error, idx) => (
              <li key={idx}>{ error }</li>
            )) }
          </ul>
        </div>
        <form className="event-form">
          <div className="event-form-title">
            <label>Title</label>
            <input
              autoFocus
              type="text"
              value={ this.state.title }
              onChange={ this.handleInput('title') }/>
          </div>
          <div className="event-form-address">
            <label>Address</label>
            <input
              type="text"
              value={ this.state.address }
              onChange={ this.handleInput('address') }/>
          </div>
          <div className="event-form-start">
            <label>Start</label>
            <input
              type='time'
              value={ this.state.startDate }
              onChange={ this.handleInput('startDate') } />
          </div>
          <div className="duration-buttons">
            <button onClick={ this.changeDuration(15) }>{'15m'}</button>
            <button onClick={ this.changeDuration(30) }>{'30m'}</button>
            <button onClick={ this.changeDuration(60) }>{'1h'}</button>
            <button onClick={ this.changeDuration(120) }>{'2h'}</button>
          </div>
          <div className="event-form-end">
            <label>End</label>
            <input
              type='time'
              value={ this.state.endDate }
              onChange={ this.handleInput('endDate') } />
          </div>
          <div className="event-form-notes">
            <label>Notes</label>
            <textarea
              value={ this.state.notes }
              onChange={ this.handleInput('notes') }>
            </textarea>
          </div>
        </form>
      </div>)
    ;
  }
}

const roundToInterval = (date, interval = 15) => {
  const remainder = (interval - date.minute()) % interval;
  return date.add("minutes", remainder + interval);
};

EventForm.propTypes = {
  event: React.PropTypes.object,
  formPostAction: React.PropTypes.func.isRequired,
  errors: React.PropTypes.arrayOf(React.PropTypes.string)
};

EventForm.defaultProps = {
  event: {
    title: '',
    notes: '',
    startDate: roundToInterval(moment()),
    endDate: roundToInterval(moment()).add(30, 'm'),
    address: ''
  },
  errors: []
};

export default EventForm;
