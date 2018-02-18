import { expect } from 'chai';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  reducer as userAuthReducer,
  UserAuthActions,
  BLOCKED_ACCOUNT,
} from '../userAuth.redux';
import { StartupActions } from '../../startup';


describe('UserAuth: redux', () => {
  const state = fromJS({
    isAuthenticated: false,
    token: null,
    remainingLoginAttempts: 5,
    hasLoggedInOnce: false,
    accountBlocked: false,
    isResendingActivation: false,
    recoverPasswordSuccess: false,
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(userAuthReducer(undefined, {}).toJS()).to.deep.equal(state.toJS());
    });

    it('should return state on unknown action', () => {
      expect(userAuthReducer(state, { type: 'unknown-action' }).toJS()).to.deep.equal(state.toJS());
    });

    describe('when USER_AUTH/AUTH_STATE_CHANGED action is received', () => {
      it('should save token and authentication state', () => {
        const action = UserAuthActions.authStateChanged(true, 'some-token');
        expect(userAuthReducer(state, action)).to.deep.equal(state
          .set('isAuthenticated', true)
          .set('token', 'some-token'));
      });
    });

    describe('when LOGIN_FAILURE action is received', () => {
      it('should set login attempts', () => {
        const action = UserAuthActions.loginFailure({ loginAttemptsLeft: 3 });
        expect(userAuthReducer(state, action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 3,
          hasLoggedInOnce: false,
          accountBlocked: false,
          isResendingActivation: false,
          recoverPasswordSuccess: false,
        });
      });

      it('should set account blocked', () => {
        const action = UserAuthActions.loginFailure({ error: BLOCKED_ACCOUNT });
        expect(userAuthReducer(state, action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 0,
          hasLoggedInOnce: false,
          accountBlocked: true,
          isResendingActivation: false,
          recoverPasswordSuccess: false,
        });
      });
    });

    describe('when LOGIN_SUCCESS action is received', () => {
      it('should set the user has logged in at least', () => {
        const action = UserAuthActions.loginSuccess();
        expect(userAuthReducer(state, action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 5,
          hasLoggedInOnce: true,
          accountBlocked: false,
          isResendingActivation: false,
          recoverPasswordSuccess: false,
        });
      });
    });

    describe('when RESEND_ACTIVATION action is received', () => {
      it('should set isResendingActivation to true', () => {
        const action = UserAuthActions.resendActivation();
        expect(userAuthReducer(state, action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 5,
          hasLoggedInOnce: false,
          accountBlocked: false,
          isResendingActivation: true,
          recoverPasswordSuccess: false,
        });
      });
    });

    describe('when RESEND_ACTIVATION_SUCCESS action is received', () => {
      it('should set isResendingActivation to false', () => {
        const action = UserAuthActions.resendActivationSuccess();
        expect(userAuthReducer(state.merge({ isResendingActivation: true }), action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 5,
          hasLoggedInOnce: false,
          accountBlocked: false,
          isResendingActivation: false,
          recoverPasswordSuccess: false,
        });
      });
    });

    describe('when RESEND_ACTIVATION_FAILURE action is received', () => {
      it('should set isResendingActivation to false', () => {
        const error = { error: true };
        const action = UserAuthActions.resendActivationFailure(error);
        expect(userAuthReducer(state.merge({ isResendingActivation: true }), action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 5,
          hasLoggedInOnce: false,
          accountBlocked: false,
          isResendingActivation: false,
          recoverPasswordSuccess: false,
        });
      });
    });

    describe('when STARTUP action is received', () => {
      it('should set isResendingActivation to false', () => {
        const action = StartupActions.startup();
        expect(userAuthReducer(state.merge({ isResendingActivation: true }), action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 5,
          hasLoggedInOnce: false,
          accountBlocked: false,
          isResendingActivation: false,
          recoverPasswordSuccess: false,
        });
      });
    });

    describe('when RECOVER_PASSWORD_SUCCESS action is received', () => {
      it('should set recoverPasswordSuccess to true', () => {
        const action = UserAuthActions.recoverPasswordSuccess();
        expect(userAuthReducer(state, action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 5,
          hasLoggedInOnce: false,
          accountBlocked: false,
          isResendingActivation: false,
          recoverPasswordSuccess: true,
        });
      });
    });

    describe('when LOCATION_CHANGE action is received', () => {
      it('should set recoverPasswordSuccess to false', () => {
        const action = { type: LOCATION_CHANGE };
        expect(userAuthReducer(state.merge({ recoverPasswordSuccess: true }), action).toJS()).to.deep.equal({
          isAuthenticated: false,
          token: null,
          remainingLoginAttempts: 5,
          hasLoggedInOnce: false,
          accountBlocked: false,
          isResendingActivation: false,
          recoverPasswordSuccess: false,
        });
      });
    });
  });
});
