import React from 'react';
import CustomMarker from './customMarker';

class FavoritePlaceMarker extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.renderOverlayMarker();
  }

  componentWillUnmount () {
    if (this.marker) this.marker.setMap(null);
  }

  componentDidUpdate (prevProps) {
    if (this.props.map !== prevProps.map ||
      this.props.favoritePlace !== prevProps.favoritePlace){
        if (this.marker) this.marker.setMap(null);
        this.renderOverlayMarker();
    }
  }

  renderOverlayMarker () {
    const { id, title, lat, lng } = this.props.favoritePlace;
    const { map } = this.props;
    const position = new google.maps.LatLng(lat, lng);

    this.marker = new CustomMarker({
      id,
      title,
      position,
      map,
      styleClass: 'favorite-place-marker'
    });
  }

  render () {
    return null;
  }
}

FavoritePlaceMarker.propTypes = {
  map: React.PropTypes.object.isRequired,
  favoritePlace: React.PropTypes.object.isRequired
};

export default FavoritePlaceMarker;
