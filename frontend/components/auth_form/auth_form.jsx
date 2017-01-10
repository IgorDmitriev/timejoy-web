import React from 'react';
import { Link, withRouter } from 'react-router';
import moment from 'moment-timezone';

// Components
import TimeJoyLogo from './timejoy_logo';
import Tagline from './tagline';

class AuthForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      timezone: moment.tz.guess()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.taglineOrErrors = this.taglineOrErrors.bind(this);
  }

  componentDidUpdate () {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn () {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  handleInput (field) {
    return e => this.setState({
            [field]: e.target.value
          });
  }

  handleSubmit (type) {
    const user = this.state;

    return e => {
      e.preventDefault();
      switch (type) {
        case 'signup':
          return this.props.requestSignup(user);
        case 'login':
          return this.props.requestLogin(user);
        default:
          return;
      }
    };
  }

  renderErrors () {
    return (
      <div className="auth-errors">
        <ul>
          {
            this.props.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))
          }
        </ul>
      </div>
    );
  }

  taglineOrErrors () {
    if (this.props.errors.length === 0) return <Tagline />;
    return this.renderErrors();
  }

  render () {
    return (
      <section className="auth-container">
        <div>
          <form className="auth-form">
            <TimeJoyLogo />
            { this.taglineOrErrors() }
            <label className='auth-email-input'>Email
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleInput('email')} />
            </label>
            <label className='auth-password-input'>Password
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleInput('password')} />
            </label>
            <button
              className="auth-button"
              onClick={this.handleSubmit('signup')}>Sign Up</button>
            <button
              className="auth-button"
              onClick={this.handleSubmit('login')}>Log In</button>
            <button
              className="auth-demo-button"
              onClick={this.handleSubmit('demo')}>Demo account</button>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(AuthForm);
