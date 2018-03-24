import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'resetPassword.title',
    defaultMessage: 'Reset Password',
  },
  passwordLabel: {
    id: 'resetPassword.fields.password.label',
    defaultMessage: 'Password',
  },
  passwordPresenceError: {
    id: 'resetPassword.fields.password.error.presence',
    defaultMessage: 'Password cannot be blank',
  },
  passwordLengthTooShortError: {
    id: 'resetPassword.fields.password.error.lengthTooShort',
    defaultMessage: 'Password should have at least 8 characters',
  },
  passwordLengthTooLongError: {
    id: 'resetPassword.fields.password.error.lengthTooLong',
    defaultMessage: 'Password should be no longer than 32 characters',
  },
  passwordTooCommonError: {
    id: 'resetPassword.fields.password.error.tooCommon',
    defaultMessage: 'Password has been found in a common passwords database. Please, choose a different one.',
  },
  passwordIsTooSimilarToUsernameError: {
    id: 'resetPassword.fields.password.error.tooSimilar',
    defaultMessage: 'This password is too similar to your username. Please, pick a different password.',
  },
  submit: {
    id: 'resetPassword.submit',
    defaultMessage: 'Reset Password',
  },
  cancel: {
    id: 'resetPassword.back',
    defaultMessage: 'Cancel',
  },
});
