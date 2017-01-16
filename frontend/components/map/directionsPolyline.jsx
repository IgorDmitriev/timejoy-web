import React from 'react';

class DirectionsPolyline extends React.Component {
  constructor (props) {
    super(props);

    this.removeCurrentPolyline = this.removeCurrentPolyline.bind(this);
  }

  componentDidMount () {
    this.renderPolyline();
  }

  componentWillUnmount () {
    this.removeCurrentPolyline();
  }

  componentDidUpdate (prevProps) {
    if (this.props.map !== prevProps.map ||
        this.props.direction !== prevProps.direction) {
          this.removeCurrentPolyline();
          this.renderPolyline();
    }
  }

  removeCurrentPolyline () {
    if (this.polyline) {
      this.polyline.setMap(null);
      this.borderPolyline.setMap(null);
    };
  }

  renderPolyline () {
    const { encodedPolyline } = this.props.direction;
    const { map } = this.props;
    const decodedPolyline =
      google.maps.geometry.encoding.decodePath(encodedPolyline);

    this.polyline = new google.maps.Polyline({
      path: decodedPolyline,
      // geodesic: true,
      strokeColor: '#64B5F6',
      strokeOpacity: 1,
      strokeWeight: 4,
      zIndex: 2
    })

    this.borderPolyline = new google.maps.Polyline({
      path: decodedPolyline,
      // geodesic: true,
      strokeColor: '#304FFE',
      strokeOpacity: 1,
      strokeWeight: 6,
      zIndex: 1
    })

    this.polyline.setMap(map);
    this.borderPolyline.setMap(map);
  }

  render () {
    return this.props.children;
  }
}

DirectionsPolyline.propTypes = {
  map: React.PropTypes.object.isRequired,
  direction: React.PropTypes.object.isRequired
};

export default DirectionsPolyline;
