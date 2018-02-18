import { defineMessages } from 'react-intl';

export default defineMessages({
  emailVerificationSuccess: {
    id: 'emailVerification.success',
    defaultMessage: 'Your email is now confirmed',
  },
  activationTokenAlreadyActivatedError: {
    id: 'emailVerification.tokenAlreadyActivated',
    defaultMessage: 'You have already activated your account!',
  },
  activationTokenExpiredError: {
    id: 'emailVerification.activationTokenExpiredError',
    defaultMessage: 'This activation link has already expired.',
  },
  activationTokenInvalid: {
    id: 'emailVerification.activationTokenInvalid',
    defaultMessage: 'This activation link is invalid!',
  },
  invalidValueError: {
    id: 'emailVerification.invalidValueError',
    defaultMessage: 'This activation link is invalid!',
  },
  remainingAttempts: {
    id: 'login.remainingAttempts',
    defaultMessage: 'You have {attempts} attempts left',
  },
  accountBlocked: {
    id: 'login.accountBlocked',
    defaultMessage: 'Your account is blocked for 5 minutes.',
  },
  resetPasswordSuccess: {
    id: 'login.resetPasswordSuccess',
    defaultMessage: 'Password changed',
  },
  userPasswordResetTokenInvalidError: {
    id: 'passwordReset.userPasswordResetTokenInvalidError',
    defaultMessage: 'This password reset link is invalid.',
  },
  userPasswordResetTokenExpiredError: {
    id: 'passwordReset.userPasswordResetTokenExpiredError',
    defaultMessage: 'This password reset link has expired.',
  },
  activationMessageResent: {
    id: 'activationResend.activationMessageResent',
    defaultMessage: 'Activation message resent.',
  },
  activationMessageResentError: {
    id: 'activationResend.activationMessageResentError',
    defaultMessage: 'There was a problem during message resend. Please try again later.',
  },
});
