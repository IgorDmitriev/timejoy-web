import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';

import EventMarker from './eventMarker';
import DirectionsPolyline from './directionsPolyline';
import DirectionsMarker from './directionsMarker';
import FavoritePlaceMarker from './FavoritePlaceMarker';

class Map extends React.Component {
  constructor (props) {
    super (props);

    const { lat, lng } = this.props.mapOptions.center;
    this.defaultCenter = new google.maps.LatLng(lat, lng);

    this.state = {
      currentLocation: {
        lat,
        lng
      }
    };

    this.handleEventMarkerClick = this.handleEventMarkerClick.bind(this);
  }

  componentDidMount () {
    if (google) this.loadMap();
  }

  componentDidUpdate () {
    if (!this.map && google) this.loadMap();
    // if (this.map && this.bounds) this.map.fitBounds(this.bounds);
    if (this.props.events.length === 0) {
      this.map.setCenter(this.defaultCenter);
      this.map.setZoom(11);
    }
    // if (this.props.favoritePlaces.length !== 0) this.animatePanMap(this.map);
    if (this.map.getZoom() > 15) this.map.setZoom(15);
  }

  animatePanMap (map) {
    for (let i = 0; i < 17; i++) {
      setTimeout(() => map.panBy(-10, 0), i*10);
    }
  }

  handleEventMarkerClick (marker) {
    this.props.router.push(`/events/${marker.eventId}/edit`);
  }

  loadMap () {
    const maps = google.maps;

    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    this.map = new maps.Map(node, this.props.mapOptions);
    this.props.setMap(this.map);


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

  handleEventHoverIn (eventId) {
    if (eventId === 0) return null;
    if (this.props.hoveredEventId !== eventId) {
      this.props.hoverEventIn(eventId);
    }
  }

  handleEventHoverOut (eventId) {
    console.log('out2');
    if (eventId === 0) return null;
    if (this.props.hoveredEventId === eventId) {
      this.props.hoverEventOut(eventId);
    }
  }

  renderEventsMarkers () {
    if (!this.map) return null;

    const { events } = this.props,
          map = this.map,
          bounds = this.bounds = new google.maps.LatLngBounds();

    const eventsMarkers = events.map( (event, idx) => {
      const { lat, lng } = event,
            markerPos = new google.maps.LatLng(lat, lng);

      bounds.extend(markerPos);
      return (
        <EventMarker
          key={ idx }
          map={ map }
          event={ event }
          onHoverIn={ this.handleEventHoverIn.bind(this, event.id) }
          onHoverOut={ this.handleEventHoverOut.bind(this, event.id) }
          onClick={ this.handleEventMarkerClick }
          />
      );
    });

    if (map && events.length !== 0) map.fitBounds(bounds);

    return eventsMarkers;
  }

  renderFavoritePlaceMarkers () {
    if (!this.map) return null;

    const { favoritePlaces } = this.props,
          map = this.map,
          bounds = this.bounds;

    const favoritePlacesMarkers = favoritePlaces.map(
      (favoritePlace, idx) => {
        const { lat, lng } = favoritePlace,
              markerPos = new google.maps.LatLng(lat, lng);

        return (
          <FavoritePlaceMarker
            key={ idx }
            map={ map }
            favoritePlace={ favoritePlace }
          />
        );
      }
    );

    return favoritePlacesMarkers;
  }

  renderAllDirections () {
    if (!this.map) return null;

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
        { this.renderFavoritePlaceMarkers() }
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

export default withRouter(Map);

const camelize = str => {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};
