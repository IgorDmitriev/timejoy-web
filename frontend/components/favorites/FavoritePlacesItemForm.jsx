import React from 'react';
import ReactDOM from 'react-dom';


class FavoritePlacesItemForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      ...props.favoritePlace
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this);
  }

  componentDidMount () {
    this.initAutocomplete();
  }

  handleSuccessSubmit () {
    this.props.clearErrors();
    console.log(FavoritePlacesItemForm.defaultProps);
    this.setState({ ...FavoritePlacesItemForm.defaultProps.favoritePlace });
    this.props.onSave();
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.formPostAction(this.state).then(this.handleSuccessSubmit);
  }

  handleInput (field) {
    return (e) => {
      const value = e.currentTarget.value;

      this.setState({
        [field]: value
      });
    };
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

  render () {
    return (
      <form className="favorite-places-item-form">
        <div>
          <div className="item-category-icon">
            <img src={ this.state.category.iconUrl } />
          </div>
          <div className="body">
          <div className="title">
            <label>Title</label>
            <input
              autoFocus
              type="text"
              value={ this.state.title }
              onChange={ this.handleInput('title') } />
          </div>
          <div className="address">
            <label>Address</label>
            <input
              type="text"
              ref="addressAutocomplete"
              value={ this.state.address }
              onChange={ this.handleInput('address') } />
          </div>
        </div>
        </div>
        <div className="submit-button">
          <button onClick={ this.handleSubmit }>SAVE</button>
        </div>
      </form>
    );
  }
}

FavoritePlacesItemForm.propTypes = {
  favoritePlace: React.PropTypes.shape({
    title: React.PropTypes.string,
    address: React.PropTypes.string,
    formatted_address: React.PropTypes.string,
    id: React.PropTypes.number,
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
    category: React.PropTypes.shape({
      id: React.PropTypes.number,
      iconUrl: React.PropTypes.string,
      title: React.PropTypes.string
    })
  }),
  formPostAction: React.PropTypes.func.isRequired,
  errors: React.PropTypes.arrayOf(React.PropTypes.string)
};

FavoritePlacesItemForm.defaultProps = {
  favoritePlace: {
    title: '',
    address: '',
    formatted_address: '',
    lat: 0,
    lng: 0,
    id: null,
    category: {
      id: 2,
      iconUrl: "https://res.cloudinary.com/b4rtok/image/upload/v1484790642/favorites_xph8il.svg",
      title: 'Other'
    }
  },
  errors: []
};

export default FavoritePlacesItemForm;
