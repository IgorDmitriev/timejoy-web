import React from 'react';
import { withRouter } from 'react-router';

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
      <div>
        Email: {email}
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default withRouter(NavBar);
