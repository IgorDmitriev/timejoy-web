import React from 'react';
import FavoritePlacesListItem from './favoritePlacesListItem';

class FavoritePlaceIndex extends React.Component {
  constructor (props) {
    super(props);

    this.renderListItems = this.renderListItems.bind(this);
  }

  componentDidMount () {
    this.props.fetchFavoritePlaces();
  }

  renderListItems () {
    return (
      <ul className="favorite-places-list">
        {
          this.props.favoritePlaces.map(
            (favoritePlace, idx) => (
              <FavoritePlacesListItem
                key={idx}
                favoritePlace={favoritePlace}
                 />
             )
          )
        }
      </ul>
    );

  }

  render () {
    return (<div className="favorite-places-index">
      {this.renderListItems()}
    </div>);
  }
}

FavoritePlaceIndex.PropTypes = {
  favoritePlaces: React.PropTypes.arrayOf(React.PropTypes.object),
  fetchFavoritePlaces: React.PropTypes.func
};

export default FavoritePlaceIndex;
