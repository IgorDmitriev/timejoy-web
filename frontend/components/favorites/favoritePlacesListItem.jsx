import React from 'react';

class FavoritePlacesListItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      title, address, id,
      category: {
        iconUrl
      }
    } = this.props.favoritePlace;
    return (
      <li>
        <div className='favorite-places-item'>
          <div className='item-category-icon'>
            <img src={iconUrl} />
          </div>
          <div className='item-body'>
            <span className='item-title'>{title}</span>
            <span className='item-address'>{address}</span>
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
