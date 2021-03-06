import React from 'react';
import CustomMarker from './customMarker';

class EventMarker extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.renderOverlayMarker();
  }

  componentWillUnmount () {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.map !== prevProps.map ||
        this.props.event !== prevProps.event) {
          if (this.marker) {
            this.marker.setMap(null);
          }
          this.renderOverlayMarker();
        }
  }

  renderOverlayMarker () {
    const { id, title, lat, lng } = this.props.event;
    const map = this.props.map;
    const position = new google.maps.LatLng(lat, lng);

    this.marker = new CustomMarker({
      id,
      title,
      position,
      map,
      styleClass: 'event-marker',
      onHoverIn: this.props.onHoverIn,
      onHoverOut: this.props.onHoverOut,
      onClick: this.props.onClick
    });
    const div = this.marker.div_;

  }

  render () {
    return null;
  }
}

EventMarker.propTypes = {
  map: React.PropTypes.object.isRequired,
  event: React.PropTypes.object.isRequired
};

export default EventMarker;
