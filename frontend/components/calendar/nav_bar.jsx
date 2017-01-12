import React from 'react';
import { withRouter } from 'react-router';

import CalendarDateController from './calendar_date_controller_container';

class NavBar extends React.Component {
  constructor (props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  componentDidUpdate () {
    if (!this.props.currentUser) {
      this.props.router.push('/login');
    }
  }

  logout (e) {
    e.preventDefault();
    this.props.requestLogout();
  }

  render () {
    let email = this.props.currentUser ? this.props.currentUser.email : null;
    return (
      <div className="navbar">
        <div className="menu-icon"></div>
        <CalendarDateController />
        <div className="profile-icon"></div>
      </div>
    );
  }
}

export default withRouter(NavBar);
