import { connect } from 'react-redux';
import { requestLogout } from '../../actions/auth_actions';

import NavBar from './nav_bar';


const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
