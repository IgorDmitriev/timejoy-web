import React from 'react';
import FavoritePlacesNavBar from './FavoritePlacesNavBarContainer';


class FavoritePlacesTab extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { children, router } = this.props;
    return (
      <div className="favorite-places-tab">
        { children }
      </div>
    );
  }
}

export default FavoritePlacesTab;
