import { reduxForm } from 'redux-form/immutable';
import validate from 'validate.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';

import { UserAuthActions, LOGIN_FORM } from '../../../modules/userAuth';
import { Login } from './login.component';
import { selectLocalesLanguage } from '../../../modules/locales/locales.selectors';

const mapStateToProps = createStructuredSelector({
  language: selectLocalesLanguage,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: UserAuthActions.login,
}, dispatch);

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: LOGIN_FORM,
    validate: (values) => validate(values.toJS(), {
      email: {
        presence: {
          message: '^emailPresenceError',
        },
        email: {
          message: '^emailFormatError',
        },
      },
      password: {
        presence: {
          message: '^passwordPresenceError',
        },
      },
    }),
  }),
)(Login);
