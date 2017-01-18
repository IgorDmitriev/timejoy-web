import React from 'react';

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
      <div>
        <ul>
          {
            this.props.favoritePlaces.map(
              (favoritePlace, idx) => (
                <li key={idx}>{favoritePlace.title}</li>
              )
            )
          }
        </ul>
      </div>
    );

  }

  render () {
    return <div>{this.renderListItems()}</div>;
  }
}

FavoritePlaceIndex.PropTypes = {
  favoritePlaces: React.PropTypes.arrayOf(React.PropTypes.object),
  fetchFavoritePlaces: React.PropTypes.func
};

export default FavoritePlaceIndex;
