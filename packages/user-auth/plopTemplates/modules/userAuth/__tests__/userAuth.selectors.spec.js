import { expect } from 'chai';
import { fromJS } from 'immutable';

import {
  selectIsAuthenticated,
  selectToken,
  selectRemainingAttempts,
  selectAccountBlocked,
  selectIsResendingActivation,
  selectRecoverPasswordSuccess,
} from '../userAuth.selectors';

describe('UserAuth: selectors', () => {
  const state = fromJS({
    userAuth: {
      isAuthenticated: false,
      token: 'jwt-token',
      remainingLoginAttempts: 4,
      accountBlocked: false,
      isResendingActivation: true,
      recoverPasswordSuccess: true,
    },
  });

  describe('selectIsAuthenticated', () => {
    it('should select isAuthenticated', () => {
      expect(selectIsAuthenticated(state)).to.equal(false);
    });
  });

  describe('selectToken', () => {
    it('should select token', () => {
      expect(selectToken(state)).to.equal('jwt-token');
    });
  });

  describe('selectRemainingAttempts', () => {
    it('should select remaining attempts', () => {
      expect(selectRemainingAttempts(state)).to.equal(4);
    });
  });

  describe('selectAccountBlocked', () => {
    it('should select account blocked', () => {
      expect(selectAccountBlocked(state)).to.be.false;
    });
  });

  describe('selectIsReseningActivation', () => {
    it('should select account blocked', () => {
      expect(selectIsResendingActivation(state)).to.be.true;
    });
  });

  describe('selectRecoverPasswordSuccess', () => {
    it('should select recover password success flag', () => {
      expect(selectRecoverPasswordSuccess(state)).to.be.true;
    });
  });
});
