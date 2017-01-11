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
        case 'demo':
          const demo = {
            email: 'demo@timejoy.co',
            password: 'demoaccount'
          };
          return this.props.requestLogin(demo);
        default:
          return;
      }
    };
  }

  renderErrors () {
    return (
      <div className="auth-errors">
        <span className="auth-errors-label">Oops, something goes wrong:</span>
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
        <div className="auth-form">
          <form>
            <TimeJoyLogo />
            { this.taglineOrErrors() }

            <div className="auth-input">
              <span>Email</span>
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleInput('email')} />
            </div>

            <div className="auth-input">
              <span>Password</span>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleInput('password')} />
            </div>


            <div className="auth-buttons">
              <div>
                <span>Very excited to give it a try.</span>
                <button
                  onClick={this.handleSubmit('signup')}>Sign Up</button>
              </div>
              <div>
                <span>I probably already have an account here..</span>
                <button
                  onClick={this.handleSubmit('login')}>Log In</button>
              </div>
            </div>

            <div className="auth-demo-option">
              <div className="auth-or">
                <span>- or -</span>
              </div>
              <div className="auth-demo-description">
                <span>
                  I dont want to create an account, but still
                  interested to see TimeJoy in action.
                </span>
              </div>
              <div className="auth-demo-logo"></div>
              <div className="auth-demo-button-label">Dive in with</div>
              <button className="auth-demo-button"
                onClick={this.handleSubmit('demo')}>Demo account
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(AuthForm);
