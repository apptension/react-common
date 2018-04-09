import { reduxForm } from 'redux-form/immutable';
import validate from 'validate.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';

import {
  UserAuthActions,
  REGISTER_FORM,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  PASSWORD_REPEAT_FIELD,
} from '../../../modules/userAuth';
import { Register } from './register.component';
import { selectLocalesLanguage } from '../../../modules/locales/locales.selectors';

const mapStateToProps = createStructuredSelector({
  language: selectLocalesLanguage,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  register: UserAuthActions.register,
}, dispatch);

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: REGISTER_FORM,
    validate: (values) => validate(values.toJS(), {
      [EMAIL_FIELD]: {
        presence: {
          message: '^emailPresenceError',
        },
        email: {
          message: '^emailFormatError',
        },
      },
      [PASSWORD_FIELD]: {
        presence: {
          message: '^passwordPresenceError',
        },
      },
      [PASSWORD_REPEAT_FIELD]: {
        presence: {
          message: '^passwordPresenceError',
        },
        equality: {
          attribute: PASSWORD_FIELD,
          message: '^repeatPasswordEqualityError',
        },
      },
    }),
  }),
)(Register);
