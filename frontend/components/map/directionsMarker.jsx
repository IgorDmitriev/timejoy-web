import React from 'react';
import CustomMarker from './customMarker';

class DirectionsMarker extends React.Component {
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
        this.props.direction !== prevProps.direction) {
          if (this.marker) this.marker.setMap(null);
          this.renderOverlayMarker();
    }
  }

  renderOverlayMarker () {
    const { eventId,
            durationText,
            encodedPolyline } = this.props.direction;
    const { map } = this.props;
    const decodedPolyline =
      google.maps.geometry.encoding.decodePath(encodedPolyline);
    const midIdx = Math.floor(decodedPolyline.length / 2);
    const position = decodedPolyline[midIdx];
    // debugger
    this.marker = new CustomMarker({
      id: eventId,
      title: durationText,
      position,
      map,
      styleClass: 'directions-marker'
    });
  }

  render () {
    return null;
  }
}

DirectionsMarker.propTypes = {
  map: React.PropTypes.object.isRequired,
  direction: React.PropTypes.object.isRequired
};

export default DirectionsMarker;
