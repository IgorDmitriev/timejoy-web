import React from 'react';
import ReactDOM from 'react-dom';


class FavoritePlacesItemForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      ...props.favoritePlace,
      selectCategory: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleSelectCategory = this.toggleSelectCategory.bind(this);
  }

  componentDidMount () {
    this.initAutocomplete();
  }

  handleSuccessSubmit () {
    this.props.clearErrors();
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

  toggleSelectCategory () {
    this.setState({
      selectCategory: !this.state.selectCategory
    });
  }

  handleDelete (e) {
    e.preventDefault();
    this.props.onDelete(this.state.id);
    this.props.onSave();
  }

  handleClose (e) {
    e.preventDefault();
    this.props.onSave();
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

  renderDeleteButton() {
    if (!this.props.onDelete) return null;

    return (
      <button
        className="delete-button"
        onClick={ this.handleDelete }>
        DELETE
      </button>
    );
  }

  selectCategory (category) {
    this.setState({
      category
    });
    this.toggleSelectCategory();
  }

  renderCategories() {
    if (!this.state.selectCategory) return null;
    const coffee = {
      id: 1,
      iconUrl: 'https://res.cloudinary.com/b4rtok/image/upload/v1484852785/coffee-icon_aidftd.svg',
      title: 'Coffee'
    };
    const lunch = {
      id: 4,
      iconUrl: 'https://res.cloudinary.com/b4rtok/image/upload/v1484852786/food-icon_uck6le.svg',
      title: 'Lunch'
    };
    const gas = {
      id: 5,
      iconUrl: 'https://res.cloudinary.com/b4rtok/image/upload/v1484852785/gas-icon_awsmiq.svg',
      title: 'Gas'
    };
    const shops = {
      id: 6,
      iconUrl: 'https://res.cloudinary.com/b4rtok/image/upload/v1484852785/shop-icon_q2je84.svg',
      title: 'Shops'
    };
    const bars = {
      id: 7,
      iconUrl: 'https://res.cloudinary.com/b4rtok/image/upload/v1484852785/bars-icon_lbx96k.svg',
      title: 'Bars'
    };
    const other = {
      id: 2,
      iconUrl: 'https://res.cloudinary.com/b4rtok/image/upload/v1484790642/favorites_xph8il.svg',
      title: 'Other'
    };


    return (
      <div className="favorite-place-categories">
        <div onClick={ this.selectCategory.bind(this, coffee)}>
          <img src={coffee.iconUrl}/>
          <label>Coffee</label>
        </div>
        <div onClick={ this.selectCategory.bind(this, lunch)}>
          <img src={lunch.iconUrl}/>
          <label>Lunch</label>
        </div>
        <div onClick={ this.selectCategory.bind(this, gas)}>
          <img src={gas.iconUrl}/>
          <label>Gas</label>
        </div>
        <div onClick={ this.selectCategory.bind(this, shops)}>
          <img src={shops.iconUrl}/>
          <label>Shops</label>
        </div>
        <div onClick={ this.selectCategory.bind(this, bars)}>
          <img src={bars.iconUrl}/>
          <label>Bars</label>
        </div>
        <div onClick={ this.selectCategory.bind(this, other)}>
          <img src={other.iconUrl}/>
          <label>Other</label>
        </div>
      </div>
    );
  }

  renderFormBody() {
    if (this.state.selectCategory) return null;
    return (
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
    );
  }

  renderButtons () {
    if (this.state.selectCategory) return null;
    return (
      <div className="submit-button">
        <button onClick={ this.handleClose }>CLOSE</button>
        <button onClick={ this.handleSubmit }>SAVE</button>
        { this.renderDeleteButton() }
      </div>
    );
  }

  render () {
    return (
      <form className="favorite-places-item-form">
        <div>
          <div
            className="item-category-icon"
            onClick={ this.toggleSelectCategory }>
            <img src={ this.state.category.iconUrl } />
          </div>
          { this.renderCategories() }
          { this.renderFormBody() }
        </div>
        { this.renderButtons() }
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
    formatted_address: null,
    lat: null,
    lng: null,
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
