import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { UserAuthActions } from '../../../modules/userAuth';
import { ConfirmEmail } from './confirmEmail.component';

const mapStateToProps = createStructuredSelector({});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  confirmEmail: UserAuthActions.confirmEmail,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
