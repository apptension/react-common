import { reduxForm } from 'redux-form/immutable';
import validate from 'validate.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';

import { RESET_PASSWORD_FORM, UserAuthActions, PASSWORD_FIELD } from '../../../modules/userAuth';
import { ResetPassword } from './resetPassword.component';

const mapStateToProps = createStructuredSelector({});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  resetPassword: UserAuthActions.resetPassword,
}, dispatch);

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: RESET_PASSWORD_FORM,
    validate: (values) => validate(values.toJS(), {
      [PASSWORD_FIELD]: {
        presence: {
          message: '^passwordPresenceError',
        },
        length: {
          minimum: 8,
          maximum: 32,
          tooShort: '^passwordLengthTooShortError',
          tooLong: '^passwordLengthTooLongError',
        },
      },
    }),
  }),
)(ResetPassword);
