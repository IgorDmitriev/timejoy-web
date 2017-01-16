import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import merge from 'lodash/merge';

class EventForm extends React.Component {
  constructor (props) {
    super(props);

    const startDate =
      this.props.event.startDate || this.nearestTimeInInterval();
    const endDate =
      this.props.event.endDate || this.nearestTimeInInterval().add(30, 'm');

    this.state = merge({}, props.event, {
      startDate,
      endDate,
      startDateInput: startDate.format('HH:mm'),
      endDateInput: endDate.format('HH:mm'),
      duration: 30
    });

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
  }

  nearestTimeInInterval (date = this.props.currentDate.clone(), interval = 15) {
    const remainder = interval - date.minute() % interval;

    return date.add(remainder, 'm');
  }

  componentDidMount () {
    this.initAutocomplete();
  }

  componentDidUpdate () {

  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id !== this.state.id
     || nextProps.currentDate !== this.props.currentDate) {

      const startDate =
        nextProps.event.startDate
        || this.nearestTimeInInterval(nextProps.currentDate.clone());
      const endDate =
        nextProps.event.endDate
        || this.nearestTimeInInterval(nextProps.currentDate.clone())
               .add(30, 'm');

      const newState = merge(
        {},
        nextProps.event,
        {
          startDate,
          endDate,
          startDateInput: startDate.format('HH:mm'),
          endDateInput: endDate.format('HH:mm')
        }
      );

      this.setState(newState);
    }
  }

  initAutocomplete () {
    const autoCompleteRef = this.refs.addressAutocomplete;
    const node = ReactDOM.findDOMNode(autoCompleteRef);

    if (google && !this.addressAutocomplete) {
      this.addressAutocomplete = new google.maps.places.Autocomplete(
        node
      );
      this.addressAutocomplete.addListener('place_changed', this.updateAddress);
    }
  }

  updateAddress () {
    const place = this.addressAutocomplete.getPlace();
    const address = place.formatted_address;
    this.setState({
      address
    });
  }

  handleInput (field) {
    return (e) => {
      const value = e.currentTarget.value;

      this.setState({
        [field]: value
      });
    };
  }

  changeDuration (minutes) {
    return (e) => {
      e.preventDefault();
      let startDate = moment(this.state.startDateInput, 'HH:mm');
      if (startDate) {
        this.setState({
          endDateInput: startDate.add(minutes, 'm').format('HH:mm')
        });
      }
    };
  }

  handleClose () {
    this.props.clearErrors();
    this.props.router.push('/');
  }

  handleSubmit (e) {
    e.preventDefault();

    const startDateInput = moment(this.state.startDateInput, 'HH:mm');
    const startHours = startDateInput.get('h');
    const startMinutes = startDateInput.get('m');
    const endDateInput = moment(this.state.endDateInput, 'HH:mm');
    const endHours = endDateInput.get('h');
    const endMinutes = endDateInput.get('m');

    const startDate = this.state.startDate.clone()
      .set('h', startHours)
      .set('m', startMinutes)
      .utc()
      .format();
    const endDate = this.state.endDate.clone()
      .set('h', endHours)
      .set('m', endMinutes)
      .utc()
      .format();

    const event = merge(
      {},
      this.state,
      {
        startDate,
        endDate
      }
    );

    this.props.formPostAction(event).then(this.handleClose);

  }

  handleDelete (e) {
    e.preventDefault();

    this.props.deleteEvent(this.state.id).then(this.handleClose);
  }

  deleteButton() {
    if (!this.state.id) return null;

    return (
      <div className="event-delete">
        <button
          className="event-delete-button"
          onClick={ this.handleDelete }>
          DELETE
        </button>
      </div>
    );
  }

  render () {
    return (
      <div className="event-form-tab">
        <div>
          <div className="navbar">
            <button onClick={ this.handleClose }>CLOSE</button>
            <span>Event</span>
            <button onClick={ this.handleSubmit }>
              { this.props.formButtonName }
            </button>
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
                ref="addressAutocomplete"
                value={ this.state.address }
                onChange={ this.handleInput('address') }/>
            </div>
            <div className="event-form-start">
              <label>Start</label>
              <input
                type='time'
                value={ this.state.startDateInput }
                onChange={ this.handleInput('startDateInput') } />
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
                value={ this.state.endDateInput }
                onChange={ this.handleInput('endDateInput') } />
            </div>
            <div className="event-form-notes">
              <label>Notes</label>
              <textarea
                value={ this.state.notes || '' }
                onChange={ this.handleInput('notes') }>
              </textarea>
            </div>
          </form>
        </div>
        { this.deleteButton() }
      </div>)
    ;
  }
}


EventForm.propTypes = {
  event: React.PropTypes.object,
  formPostAction: React.PropTypes.func.isRequired,
  formButtonName: React.PropTypes.string,
  errors: React.PropTypes.arrayOf(React.PropTypes.string),
  currentDate: React.PropTypes.object
};

EventForm.defaultProps = {
  event: {
    title: '',
    notes: '',
    address: ''
  },
  formButtonName: 'CREATE',
  errors: []
};

export default EventForm;
