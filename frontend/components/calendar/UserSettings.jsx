import React from 'react';
import ReactDOM from 'react-dom';

class UserSettings extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.props.currentUser;

    this.updateAddress = this.updateAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.initAutocomplete();
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
    const homeAddress = place.formatted_address;
    const homeLat = place.geometry.location.lat();
    const homeLng = place.geometry.location.lng();

    this.setState({
      homeAddress,
      homeLat,
      homeLng
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.update(this.state)
      .then(this.props.onSave)
      .then(this.props.requestUpdate);
  }

  handleInput (field) {
    return (e) => {
      const value = e.currentTarget.value;

      this.setState({
        [field]: value
      });
    };
  }

  handleTravelMode (defaultTravelMode, e) {
    e.preventDefault();
    this.setState({
      defaultTravelMode
    });
  }

  render () {
    const { email, homeAddress, defaultTravelMode } = this.state;
    const drivingClass = this.state.defaultTravelMode === 'driving' ? 'driving selected' : 'driving';
    const walkingClass = this.state.defaultTravelMode === 'walking' ? 'walking selected' : 'walking';
    const transitClass = this.state.defaultTravelMode === 'transit' ? 'transit selected' : 'transit';
    const bicyclingClass = this.state.defaultTravelMode === 'bicycling' ? 'bicycling selected' : 'bicycling';
    return (
      <form className="user-settings">
        <div className="email">
          <label>Email</label>
          <span>{ email }</span>
        </div>
        <div className="home-address">
          <label>Home Address</label>
          <input
            type="text"
            ref="addressAutocomplete"
            value={ homeAddress || '' }
            onChange={ this.handleInput('homeAddress') } />
        </div>
        <div className="travel-mode">
          <div
            className={drivingClass}
            onClick={ this.handleTravelMode.bind(this, 'driving') }>
            <img src="https://res.cloudinary.com/b4rtok/image/upload/v1484869506/driving_zz6d4g.svg" />
            <label>Driving</label>
          </div>
          <div
            className={transitClass}
            onClick={ this.handleTravelMode.bind(this, 'transit') }>
            <img src="https://res.cloudinary.com/b4rtok/image/upload/v1484869506/transit_psyen8.svg" />
            <label>Transit</label>
          </div>
          <div
            className={bicyclingClass}
            onClick={ this.handleTravelMode.bind(this, 'bicycling') }>
            <img src="https://res.cloudinary.com/b4rtok/image/upload/v1484869506/cycling_xfcdwk.svg" />
            <label>Bicycling</label>
          </div>
          <div
            className={walkingClass}
            onClick={ this.handleTravelMode.bind(this, 'walking') }>
            <img src="https://res.cloudinary.com/b4rtok/image/upload/v1484869506/walking_lds9u0.svg" />
            <label>Walking</label>
          </div>
        </div>
        <div className="submit-button">
          <button onClick={this.handleSubmit}>SAVE</button>
        </div>
      </form>
    );
  }
}

UserSettings.PropTypes = {
  currentUser: React.PropTypes.shape({
    id: React.PropTypes.number,
    email: React.PropTypes.string,
    defaultTravelMode: React.PropTypes.string,
    homeAddress: React.PropTypes.string,
    homeLat: React.PropTypes.number,
    homeLng: React.PropTypes.number
  })
};

export default UserSettings;
