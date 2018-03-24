import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'recoverPassword.title',
    defaultMessage: 'Reset password',
  },
  emailLabel: {
    id: 'recoverPassword.fields.email.label',
    defaultMessage: 'Email',
  },
  emailPresenceError: {
    id: 'recoverPassword.fields.email.error.presence',
    defaultMessage: 'Email cannot be blank',
  },
  emailFormatError: {
    id: 'recoverPassword.fields.email.error.format',
    defaultMessage: 'Email is not valid',
  },
  emailMaxLengthError: {
    id: 'recoverPassword.fields.email.error.maxLength',
    defaultMessage: 'Email shouldn\'t be longer than 255 characters',
  },
  submit: {
    id: 'recoverPassword.submit',
    defaultMessage: 'Send',
  },
  sentMessage: {
    id: 'recoverPassword.sentMessage',
    defaultMessage: 'Check your email to get reset password link.',
  },
  resendEmail: {
    id: 'recoverPassword.resendEmail',
    defaultMessage: 'Resend email',
  },
});
