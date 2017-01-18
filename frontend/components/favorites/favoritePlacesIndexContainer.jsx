import { connect } from 'react-redux';
import _ from 'lodash';

import {
  fetchFavoritePlaces
} from '../../actions/favorite_places_actions';

import FavoritePlacesIndex from './favoritePlacesIndex';


const mapStateToProps = (state, ownProps) => {
  const favoritePlaces = _.sortBy(_.values(state.favoritePlaces), 'id');

  return ({
    favoritePlaces
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchFavoritePlaces: () => dispatch(fetchFavoritePlaces())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePlacesIndex);
