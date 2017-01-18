import React from 'react';

const FavoritePlacesTab = ({ children, router }) => (
  <div className="favorite-places-tab">
    <div className="navbar">
      <button onClick={router.push.bind(null, '')}>CLOSE</button>
      <span>Favorite Places</span>
      <div className="create-new fa fa-plus"></div>
    </div>
    { children }
  </div>
);

export default FavoritePlacesTab;
