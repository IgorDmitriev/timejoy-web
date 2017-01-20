import { connect } from 'react-redux';
import { updateUserSettings } from '../../actions/auth_actions';
import { requestUpdate } from '../../actions/statusActions';

import UserSettings from './UserSettings';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  update: settings => dispatch(updateUserSettings(settings)),
  requestUpdate: () => dispatch(requestUpdate(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);
