import React from 'react';
import ReactDOM from 'react-dom';

import EventMarker from './eventMarker';
import DirectionsPolyline from './directionsPolyline';
import DirectionsMarker from './directionsMarker';

class Map extends React.Component {
  constructor (props) {
    super (props);
    console.log(props);
    const { lat, lng } = this.props.mapOptions.center;
    this.state = {
      currentLocation: {
        lat,
        lng
      }
    };

    // this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount () {
    if (google) this.loadMap();
  }

  componentDidUpdate () {
    if (!this.map && google) this.loadMap();
    if (this.map.getZoom() > 15) this.map.setZoom(15);
  }

  loadMap () {
    const maps = google.maps;

    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    this.map = new maps.Map(node, this.props.mapOptions);

    // TODO handle events on map
    // const eventsNames = ['click', 'dragend'];
    //
    // eventsNames.forEach(e => {
    //   this.map.addListener(e, this.handleEvent(e));
    // });
  }

  // TODO handle events on map
  // handleEvent(evtName) {
  //   const handlerName = `on${camelize(evtName)}`;
  //
  //   return e => {
  //     if (this.props[handlerName]) {
  //       this.props[handlerName](this.props, this.map, e);
  //     }
  //   };
  // }

  renderEventsMarkers () {
    const { events } = this.props,
          map = this.map,
          bounds = new google.maps.LatLngBounds();

    const eventsMarkers = events.map( (event, idx) => {
      const { lat, lng } = event,
            markerPos = new google.maps.LatLng(lat, lng);

      bounds.extend(markerPos);
      return (
        <EventMarker
          key={ idx }
          map={ map }
          event={ event }
          />
      );
    });

    if (map && events.length !== 0) map.fitBounds(bounds);

    return eventsMarkers;
  }

  renderAllDirections () {
    const { allDirections } = this.props,
          map = this.map;

    const allDirectionsPolylines =
      allDirections.map( (direction, idx) => (
        <DirectionsPolyline
          key={ idx }
          map={ map }
          direction={ direction }
          >
          <DirectionsMarker
            key={ idx }
            map={ map }
            direction={ direction }
            />
        </DirectionsPolyline>
      ));

    return allDirectionsPolylines;
  }

  render () {
    return (
      <div ref='map' id='map'>
        { this.renderEventsMarkers() }
        { this.renderAllDirections() }
      </div>
    );
  }
}

Map.propTypes = {
  events: React.PropTypes.array,
  allDirections: React.PropTypes.array,
  mapOptions: React.PropTypes.object
};

Map.defaultProps = {
  mapOptions: {
    center: { lat: 37.7758, lng: -122.435 }, // this is SF
    zoom: 13,
    styles: [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#333333"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#dedede"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f2f2f2"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#abd5f0"
              },
              {
                  "lightness": 17
              }
          ]
      }
    ],
    scrollwheel: false,
    mapTypeControl: false
  }
};

export default Map;

const camelize = str => {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};
