import { connect } from 'react-redux';
import { updateUserSettings } from '../../actions/auth_actions';

import UserSettings from './UserSettings';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  update: settings => dispatch(updateUserSettings(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);
