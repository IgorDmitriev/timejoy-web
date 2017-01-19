import React from 'react';
import FavoritePlacesItemForm from './FavoritePlacesItemForm';

class FavoritePlacesListItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      editMode: false
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode () {
    this.props.clearErrors();
    this.setState({
      editMode: !this.state.editMode
    });
  }

  renderErrors () {
    return (
      <div className="errors">
        <ul>
          {
            this.props.errors.map( (error, idx) => (
              <li key={ idx }>{ error }</li>
            ))
          }
        </ul>
      </div>
    );
  }

  render () {
    const {
      title, address, id,
      category: {
        iconUrl
      }
    } = this.props.favoritePlace;

    if (this.state.editMode) {
      return (
        <li>
          { this.renderErrors() }
          <FavoritePlacesItemForm
            formPostAction={ this.props.updateFavoritePlace }
            favoritePlace={ this.props.favoritePlace }
            clearErrors={ this.props.clearErrors }
            onSave={ this.toggleEditMode }
            onDelete={ this.props.deleteFavoritePlace }
            />
        </li>
      );
    }

    return (
      <li>
        <div className='favorite-places-item'>
          <div className='item-category-icon'>
            <img src={iconUrl} />
          </div>
          <div className='item-body'>
            <span
              className='item-title'
              onClick={ this.toggleEditMode }>{title}</span>
            <span
              className='item-address'
              onClick={ this.toggleEditMode }>{address}</span>
          </div>
        </div>
      </li>
    );
  }
}

FavoritePlacesListItem.PropTypes = {
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
  })
};

export default FavoritePlacesListItem;
