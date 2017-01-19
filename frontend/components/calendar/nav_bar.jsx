import React from 'react';
import { withRouter } from 'react-router';

import CalendarDateController from './calendar_date_controller_container';

class NavBar extends React.Component {
  constructor (props) {
    super(props);

    this.logout = this.logout.bind(this);

    this.state = {
      menuToggled: false
    };

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuAutoClose = this.handleMenuAutoClose.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleOpenFavorites = this.handleOpenFavorites.bind(this);
  }

  componentDidUpdate () {
    if (!this.props.currentUser) {
      this.props.router.push('/login');
    }
  }

  handleAddEvent () {
    this.props.router.push('/new-event');
  }

  handleOpenFavorites () {
    this.props.router.push('/favorites');
  }

  handleMenuToggle () {
    this.setState({
      menuToggled: !this.state.menuToggled
    });
  }

  handleMenuAutoClose () {
    if (this.state.menuToggled) {
      this.setState({
        menuToggled: false
      });
    }
  }

  logout (e) {
    e.preventDefault();
    this.props.requestLogout();
  }

  render () {
    const menuClass = this.state.menuToggled ? 'menu-open' : 'menu-close';
    const menuIconClass = this.state.menuToggled ? 'menu-icon fa fa-minus' : 'menu-icon fa fa-bars'

    return (
      <div className="topbar"
        onMouseLeave={this.handleMenuAutoClose}>
        <div className="navbar">
          <div className={ menuIconClass }
            onClick={this.handleMenuToggle}></div>
          <CalendarDateController />
          <div className="create-new fa fa-star"
            onClick={ this.handleOpenFavorites }></div>
          <div className="create-new fa fa-plus"
            onClick={ this.handleAddEvent }></div>
        </div>
        <div className={ menuClass }>
          <button className="menu-settings-option">Settings</button>
          <button className="menu-settings-logout"
            onClick={this.logout}>Log Out</button>
        </div>
        <div className="messages"></div>
      </div>
    );
  }
}

export default withRouter(NavBar);
