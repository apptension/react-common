import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'register.title',
    defaultMessage: 'Sign up',
  },
  passwordLabel: {
    id: 'register.fields.password.label',
    defaultMessage: 'Password',
  },
  passwordRepeatLabel: {
    id: 'register.fields.password.passwordRepeatLabel',
    defaultMessage: 'Repeat password',
  },
  passwordPresenceError: {
    id: 'register.fields.password.error.presence',
    defaultMessage: 'Password cannot be blank',
  },
  repeatPasswordEqualityError: {
    id: 'register.fields.repeatPassword.error.equality',
    defaultMessage: 'This password does not match the one entered above. Please check that you have entered it ' +
    'correctly.',
  },
  emailLabel: {
    id: 'register.fields.email.label',
    defaultMessage: 'Email',
  },
  emailPresenceError: {
    id: 'register.fields.email.error.presence',
    defaultMessage: 'Email cannot be blank',
  },
  emailFormatError: {
    id: 'register.fields.email.error.email',
    defaultMessage: 'Email is invalid',
  },
  submit: {
    id: 'register.submit',
    defaultMessage: 'Sign up',
  },
  signIn: {
    id: 'register.signIn',
    defaultMessage: 'Sign in',
  },
});
