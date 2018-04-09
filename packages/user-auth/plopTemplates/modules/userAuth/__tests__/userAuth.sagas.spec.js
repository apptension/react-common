import SagaTester from 'redux-saga-tester';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { stopSubmit, reset, actionTypes as RFTypes } from 'redux-form';
import { decamelizeKeys } from 'humps';
import { replace, CALL_HISTORY_METHOD } from 'react-router-redux';
import { UNAUTHORIZED, OK, BAD_REQUEST, NO_CONTENT } from 'http-status-codes';

import mockApi from '../../../utils/mockApi';
import { StartupActions } from '../../startup';
import { watchUserAuth } from '../userAuth.sagas';
import {
  LOGIN_FORM,
  RECOVER_PASSWORD_FORM,
  RESET_PASSWORD_FORM,
  REGISTER_FORM,
} from '../userAuth.constants';
import { UserAuthActions, UserAuthTypes } from '../userAuth.redux';

describe('UserAuth: sagas', () => {
  const defaultState = fromJS({
    userAuth: {
      isAuthenticated: false,
      token: null,
      accountBlocked: false,
      remainingLoginAttempts: 2,
      hasLoggedInOnce: false,
    },
  });

  const getSagaTester = (initialState = {}) => {
    const sagaTester = new SagaTester({
      initialState: defaultState.mergeDeep(initialState),
    });
    sagaTester.start(watchUserAuth);
    return sagaTester;
  };

  describe('startup', () => {
    it('should dispatch USER_AUTH/AUTH_STATE_CHANGED action for unauthenticated user', async () => {
      const sagaTester = getSagaTester({
        userAuth: {
          isAuthenticated: false,
        },
      });

      sagaTester.dispatch(StartupActions.startup());
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.AUTH_STATE_CHANGED);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.authStateChanged(false, null, null));
    });

    it('should dispatch USER_AUTH/AUTH_STATE_CHANGED action for authenticated user', async () => {
      const sagaTester = getSagaTester({
        userAuth: {
          isAuthenticated: true,
          token: 'jwt-token',
        },
      });

      sagaTester.dispatch(StartupActions.startup());
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.AUTH_STATE_CHANGED);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.authStateChanged(true, 'jwt-token', null));
    });
  });

  describe('successful registration', () => {
    const email = 'tstark@apptension.com';
    const password = 'passw0rd';
    const token = 'jwt-token-1';

    const response = {
      token,
    };

    beforeEach(() => {
      mockApi.post('/auth/signup/', decamelizeKeys({
        email, password,
      })).reply(OK, response);
    });

    it('should dispatch USER_AUTH/AUTH_STATE_CHANGED action', async () => {
      const sagaTester = getSagaTester();

      sagaTester.dispatch(UserAuthActions.register(email, password));
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.AUTH_STATE_CHANGED);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.authStateChanged(true, token, email));
    });

    it('should dispatch STOP_SUBMIT action for registration form', async () => {
      const sagaTester = getSagaTester();

      sagaTester.dispatch(UserAuthActions.register(email, password));

      const dispatchedAction = await sagaTester.waitFor(RFTypes.STOP_SUBMIT);
      expect(dispatchedAction).to.deep.equal(stopSubmit(REGISTER_FORM));
    });

    it('should dispatch LOGIN_SUCCESS action for authenticated user', async () => {
      const sagaTester = getSagaTester();
      sagaTester.dispatch(UserAuthActions.register(email, password));

      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.LOGIN_SUCCESS);
      expect(dispatchedAction).to.deep.equal(UserAuthActions.loginSuccess());
    });
  });

  describe('error during registration', () => {
    const email = 'tstark@apptension.com';
    const password = 'passw0rd';

    it('should dispatch a STOP_SUBMIT action for registration form with field errors', async () => {
      const sagaTester = getSagaTester();

      mockApi.post('/auth/signup/', decamelizeKeys({
        email, password,
      })).reply(BAD_REQUEST, {
        password: ['PASSWORD_TOO_COMMON_ERROR'],
      });

      sagaTester.dispatch(UserAuthActions.register(email, password));

      const dispatchedAction = await sagaTester.waitFor(RFTypes.STOP_SUBMIT);
      expect(dispatchedAction).to.deep.equal(stopSubmit(REGISTER_FORM, { password: ['passwordTooCommonError'] }));
    });
  });

  describe('successful login', () => {
    const email = 'tstark@apptension.com';
    const password = 'passw0rd';
    const token = 'jwt-token-1';

    const response = {
      token,
    };

    beforeEach(() => {
      mockApi.post('/auth/token/', { email, password }).reply(OK, response);
    });

    it('should dispatch USER_AUTH/AUTH_STATE_CHANGED action', async () => {
      const sagaTester = getSagaTester();

      sagaTester.dispatch(UserAuthActions.login(email, password));
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.AUTH_STATE_CHANGED);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.authStateChanged(true, token, email));
    });

    it('should dispatch LOGIN_SUCCESS action', async () => {
      const sagaTester = getSagaTester();

      sagaTester.dispatch(UserAuthActions.login(email, password));
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.LOGIN_SUCCESS);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.loginSuccess());
    });
  });

  describe('error during login', () => {
    const email = 'tstark@apptension.com';
    const password = 'passw0rd';

    it('should dispatch a STOP_SUBMIT action for login form with field errors', async () => {
      const sagaTester = getSagaTester();

      mockApi.post('/auth/token/', { email, password }).reply(UNAUTHORIZED);

      sagaTester.dispatch(UserAuthActions.login(email, password));

      const dispatchedAction = await sagaTester.waitFor(RFTypes.STOP_SUBMIT);
      expect(dispatchedAction).to.deep.equal(stopSubmit(LOGIN_FORM, { password: ['passwordWrongError'] }));
    });

    it('should dispatch a LOGIN_FAILURE action for login form with field errors', async () => {
      const sagaTester = getSagaTester();

      mockApi.post('/auth/token/', { email, password }).reply(UNAUTHORIZED, { error: [], 'login_attempts_left': 4 });

      sagaTester.dispatch(UserAuthActions.login(email, password));

      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.LOGIN_FAILURE);
      expect(dispatchedAction).to.deep.equal(UserAuthActions.loginFailure({ error: [], loginAttemptsLeft: 4 }));
    });
  });

  describe('logout', () => {
    it('should dispatch USER_AUTH/AUTH_STATE_CHANGED action', async () => {
      const sagaTester = getSagaTester();

      sagaTester.dispatch(UserAuthActions.logout());
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.AUTH_STATE_CHANGED);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.authStateChanged(false, null, null));
    });
  });

  describe('confirm email success', () => {
    const uid = 'fakeUid';
    const emailToken = 'fakeEmailToken';
    const token = 'fakeToken';
    const email = 'fake@mail.com';

    const response = {
      token,
      user: {
        email: email,
      },
    };

    it('should dispatch USER_AUTH/AUTH_STATE_CHANGED action', async () => {
      const sagaTester = getSagaTester();

      mockApi.post(`/auth/activate-account/${uid}/${emailToken}/`).reply(OK, response);

      sagaTester.dispatch(UserAuthActions.confirmEmail(uid, emailToken));
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.AUTH_STATE_CHANGED);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.authStateChanged(true, token, email));
    });

    it('should redirect to root route', async () => {
      const sagaTester = getSagaTester();

      mockApi.post(`/auth/activate-account/${uid}/${emailToken}/`).reply(OK, response);

      sagaTester.dispatch(UserAuthActions.confirmEmail(uid, emailToken));
      const dispatchedAction = await sagaTester.waitFor(CALL_HISTORY_METHOD);

      expect(dispatchedAction).to.deep.equal(replace('/'));
    });
  });

  describe('confirm email error', () => {
    const uid = 'fakeUid';
    const emailToken = 'fakeEmailToken';

    it('should redirect to root route', async () => {
      const sagaTester = getSagaTester();

      mockApi.post(`/auth/activate-account/${uid}/${emailToken}/`).reply(BAD_REQUEST, {
        token: 'ACTIVATION_TOKEN_INVALID',
      });

      sagaTester.dispatch(UserAuthActions.confirmEmail(uid, emailToken));
      const dispatchedAction = await sagaTester.waitFor(CALL_HISTORY_METHOD);

      expect(dispatchedAction).to.deep.equal(replace('/'));
    });
  });

  describe('recover password action', () => {
    it('should dispatch RecoverPasswordSuccess action', async () => {
      const sagaTester = getSagaTester();
      const email = 'test@test.com';

      mockApi.post('/auth/password/reset/', { email }).reply(NO_CONTENT);

      sagaTester.dispatch(UserAuthActions.recoverPassword(email));
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.RECOVER_PASSWORD_SUCCESS);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.recoverPasswordSuccess());
    });

    it('should dispatch stop submit on success', async () => {
      const sagaTester = getSagaTester();
      const email = 'test@test.com';

      mockApi.post('/auth/password/reset/', { email }).reply(NO_CONTENT);

      sagaTester.dispatch(UserAuthActions.recoverPassword(email));

      const dispatchedAction = await sagaTester.waitFor(RFTypes.STOP_SUBMIT);
      expect(dispatchedAction).to.deep.equal(stopSubmit(RECOVER_PASSWORD_FORM));
    });
  });

  describe('recover password success action', () => {
    it('should dispatch reset form', async () => {
      const sagaTester = getSagaTester();

      sagaTester.dispatch(UserAuthActions.recoverPasswordSuccess());

      const dispatchedAction = await sagaTester.waitFor(RFTypes.RESET);
      expect(dispatchedAction).to.deep.equal(reset(RECOVER_PASSWORD_FORM));
    });
  });

  describe('reset password action', () => {
    it('should dispatch replace action with proper param', async () => {
      const sagaTester = getSagaTester();
      const password = 'passw0rd';
      const user = 'fakeUser';
      const token = 'fakeToken';

      mockApi.post('/auth/password/reset/confirm/', { password, user, token }).reply(OK);

      sagaTester.dispatch(UserAuthActions.resetPassword(password, user, token));
      const dispatchedAction = await sagaTester.waitFor(CALL_HISTORY_METHOD);

      expect(dispatchedAction).to.deep.equal(replace('/login'));
    });

    it('should dispatch a STOP_SUBMIT action for registration form with field errors', async () => {
      const sagaTester = getSagaTester();
      const password = 'passw0rd';
      const user = 'fakeUser';
      const token = 'fakeToken';

      mockApi.post('/auth/password/reset/confirm/', { password, user, token }).reply(BAD_REQUEST, {
        password: 'PASSWORD_TOO_COMMON_ERROR',
      });

      sagaTester.dispatch(UserAuthActions.resetPassword(password, user, token));

      const dispatchedAction = await sagaTester.waitFor(RFTypes.STOP_SUBMIT);
      expect(dispatchedAction).to.deep.equal(stopSubmit(RESET_PASSWORD_FORM, { password: 'passwordTooCommonError' }));
    });
  });

  describe('resend activation email action', () => {
    it('should dispatch resend activation success action', async () => {
      const sagaTester = getSagaTester();
      mockApi.post('/auth/activation-link/').reply(NO_CONTENT);

      sagaTester.dispatch(UserAuthActions.resendActivation());
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.RESEND_ACTIVATION_SUCCESS);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.resendActivationSuccess());
    });

    it('should dispatch resend activation failure action', async () => {
      const sagaTester = getSagaTester();
      mockApi.post('/auth/activation-link/').reply(BAD_REQUEST);

      sagaTester.dispatch(UserAuthActions.resendActivation());
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.RESEND_ACTIVATION_FAILURE);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.resendActivationFailure());
    });
  });
});
