import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';
import { propOr, propEq } from 'ramda';
import { LOCATION_CHANGE } from 'react-router-redux';
import { StartupTypes } from '../startup';

const MAX_ATTEMPTS = 5;
export const BLOCKED_ACCOUNT = 'USER_ACCOUNT_IS_BLOCKED';

export const { Types: UserAuthTypes, Creators: UserAuthActions } = createActions({
  register: ['email', 'password'],
  login: ['email', 'password'],
  loginSuccess: [],
  loginFailure: ['data'],
  authStateChanged: ['isAuthenticated', 'jwt', 'user'],
  confirmEmail: ['uid', 'emailToken'],
  recoverPassword: ['email'],
  recoverPasswordSuccess: [],
  resetPassword: ['password', 'user', 'token'],
  logout: [],
  resendActivation: [],
  resendActivationSuccess: [],
  resendActivationFailure: [],
}, { prefix: 'USER_AUTH_' });

export const UserAuthRecord = new Record({
  token: null,
  isAuthenticated: false,
  remainingLoginAttempts: MAX_ATTEMPTS,
  hasLoggedInOnce: false,
  accountBlocked: false,
  isResendingActivation: false,
  recoverPasswordSuccess: false,
}, 'userAuth');

export const INITIAL_STATE = new UserAuthRecord({});

const authStateChanged = (state, { isAuthenticated, jwt }) => state
  .set('isAuthenticated', isAuthenticated)
  .set('token', jwt);

const loginFailure = (state = INITIAL_STATE, { data }) => {
  return state.merge({
    remainingLoginAttempts: propOr(0, 'loginAttemptsLeft')(data),
    accountBlocked: propEq('error', BLOCKED_ACCOUNT)(data),
  });
};

const loginSuccess = (state = INITIAL_STATE) => state.set('hasLoggedInOnce', true);

const resendActivation = (state = INITIAL_STATE) => state.set('isResendingActivation', true);

const resetIsResendingActivation = (state = INITIAL_STATE) => state.set('isResendingActivation', false);

const recoverPasswordSuccess = (state = INITIAL_STATE) => state.set('recoverPasswordSuccess', true);

const clearRecoverPassword = (state = INITIAL_STATE) => state.set('recoverPasswordSuccess', false);

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.AUTH_STATE_CHANGED]: authStateChanged,
  [UserAuthTypes.LOGIN_FAILURE]: loginFailure,
  [UserAuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [UserAuthTypes.RESEND_ACTIVATION]: resendActivation,
  [UserAuthTypes.RESEND_ACTIVATION_SUCCESS]: resetIsResendingActivation,
  [UserAuthTypes.RESEND_ACTIVATION_FAILURE]: resetIsResendingActivation,
  [StartupTypes.STARTUP]: resetIsResendingActivation,
  [UserAuthTypes.RECOVER_PASSWORD_SUCCESS]: recoverPasswordSuccess,
  [LOCATION_CHANGE]: clearRecoverPassword,
});
