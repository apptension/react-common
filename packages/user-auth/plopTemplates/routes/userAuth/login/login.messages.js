import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'login.title',
    defaultMessage: 'Sign in',
  },
  passwordLabel: {
    id: 'login.fields.password.label',
    defaultMessage: 'Password',
  },
  passwordPresenceError: {
    id: 'login.fields.password.error.presence',
    defaultMessage: 'Password cannot be blank',
  },
  passwordWrongError: {
    id: 'login.fields.password.error.wrong',
    defaultMessage: 'Unable to log in with provided credentials',
  },
  emailLabel: {
    id: 'login.fields.email.label',
    defaultMessage: 'Email',
  },
  emailPresenceError: {
    id: 'login.fields.email.error.presence',
    defaultMessage: 'Email cannot be blank',
  },
  emailFormatError: {
    id: 'login.fields.email.error.email',
    defaultMessage: 'Email is invalid',
  },
  submit: {
    id: 'login.submit',
    defaultMessage: 'Sign in',
  },
  recoverPassword: {
    id: 'login.recoverPassword',
    defaultMessage: 'Forgotten your password?',
  },
  signUp: {
    id: 'login.signUp',
    defaultMessage: 'Register',
  },
});
