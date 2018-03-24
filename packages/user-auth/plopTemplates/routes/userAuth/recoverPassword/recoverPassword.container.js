import { reduxForm } from 'redux-form/immutable';
import validate from 'validate.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';

import { RECOVER_PASSWORD_FORM, UserAuthActions, selectRecoverPasswordSuccess } from '../../../modules/userAuth';
import { RecoverPassword } from './recoverPassword.component';
import { selectLocalesLanguage } from '../../../modules/locales/locales.selectors';

const mapStateToProps = createStructuredSelector({
  recoverPasswordSuccess: selectRecoverPasswordSuccess,
  language: selectLocalesLanguage,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  recoverPassword: UserAuthActions.recoverPassword,
}, dispatch);

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: RECOVER_PASSWORD_FORM,
    validate: (values) => validate(values.toJS(), {
      email: {
        presence: {
          message: '^emailPresenceError',
        },
        email: {
          message: '^emailFormatError',
        },
        length: {
          maximum: 255,
          message: '^emailMaxLengthError',
        },
      },
    }),
  }),
)(RecoverPassword);
