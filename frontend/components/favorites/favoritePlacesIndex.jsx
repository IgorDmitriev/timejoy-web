import React from 'react';
import FavoritePlacesNavBar from './FavoritePlacesNavBarContainer';
import FavoritePlacesListItem from './favoritePlacesListItem';
import FavoritePlacesItemForm from './FavoritePlacesItemForm';

class FavoritePlaceIndex extends React.Component {
  constructor (props) {
    super(props);

    this.renderListItems = this.renderListItems.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleNewItemForm = this.toggleNewItemForm.bind(this);

    this.state = {
      newItemFormToggeled: false
    };
  }

  componentDidMount () {
    this.props.fetchFavoritePlaces();
  }

  handleClose () {
    this.props.closeTab();
    this.props.router.push('/');
  }

  toggleNewItemForm () {
    this.setState({
      newItemFormToggeled: !this.state.newItemFormToggeled
    });
  }

  renderListItems () {
    const newItemFormClass =
      this.state.newItemFormToggeled ? 'new-favorite-place-open' : 'new-favorite-place-closed';
    return (
      <div>
        <div className={ newItemFormClass }>
          <FavoritePlacesItemForm
            formPostAction={ this.props.createFavoritePlace }
            clearErrors={ this.props.clearErrors }
            onSave={ this.toggleNewItemForm }/>
        </div>
        <ul className="favorite-places-list">
          {
            this.props.favoritePlaces.map(
              (favoritePlace, idx) => (
                <FavoritePlacesListItem
                  key={idx}
                  favoritePlace={favoritePlace}
                   />
               )
            )
          }
        </ul>
      </div>
    );

  }

  renderNavBar () {
    return (
      <div className="navbar">
        <button onClick={this.handleClose}>CLOSE</button>
        <span>Favorite Places</span>
        <div
          className="create-new fa fa-plus"
          onClick={ this.toggleNewItemForm }></div>
      </div>
    );
  }

  renderErrors () {
    if (this.state.newItemFormToggeled) {
      return (
        <div className="errors">
          <ul>
            {
              this.props.errors.map( (error, idx) => (
                <li key={ idx }>{ error }</li>
              ))
            }
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    return (
      <div className="favorite-places-index">
        { this.renderNavBar() }
        { this.renderErrors() }
        { this.renderListItems() }
      </div>
    );
  }
}

FavoritePlaceIndex.PropTypes = {
  favoritePlaces: React.PropTypes.arrayOf(React.PropTypes.object),
  fetchFavoritePlaces: React.PropTypes.func
};

export default FavoritePlaceIndex;
