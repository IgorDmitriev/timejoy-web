import { connect } from 'react-redux';
import AuthForm from './auth_form';
import { requestLogin, requestSignup } from '../../actions/auth_actions';

const mapStateToProps = ({ session: { currentUser, errors }}) => {
  let loggedIn = Boolean(currentUser);

  return {
    loggedIn,
    errors
  };
};

const mapDispatchToProps = (dispatch) => ({
    requestLogin: (user) => dispatch(requestLogin(user)),
    requestSignup: (user) => dispatch(requestSignup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
