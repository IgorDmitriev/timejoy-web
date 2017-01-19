import React from 'react';
import { withRouter } from 'react-router';

class FavoritePlacesNavBar extends React.Component {
  constructor (props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.props.closeTab();
    this.props.router.push('/');
  }

  render () {
    return (
      <div className="navbar">
        <button onClick={this.handleClose}>CLOSE</button>
        <span>Favorite Places</span>
        <div className="create-new fa fa-plus"></div>
      </div>
    );
  }
}

FavoritePlacesNavBar.propTypes = {
  closeTab: React.PropTypes.func
};

export default withRouter(FavoritePlacesNavBar);
