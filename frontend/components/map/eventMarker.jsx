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

    this.marker = new CustomMarker(id, title, position, map);
  }

  renderMarker () {
    const { lat, lng } = this.props.event;
    const eventId = this.props.event.id;
    const map = this.props.map;
    const position = new google.maps.LatLng(lat, lng);
    const title = this.props.event.title;

    this.marker = new google.maps.Marker({
      map,
      position,
      eventId,
      title,
      label: title
    });
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
