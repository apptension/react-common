import SagaTester from 'redux-saga-tester';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { UNAUTHORIZED, OK } from 'http-status-codes';

import mockApi from '../../../utils/mockApi';
import { UserAuthActions, UserAuthTypes } from '../../userAuth';
import { watchUserProfile } from '../userProfile.sagas';
import { UserProfileActions, UserProfileTypes } from '../userProfile.redux';


describe('UserProfile: sagas', () => {
  const defaultState = fromJS({});

  const getSagaTester = (initialState = {}) => {
    const sagaTester = new SagaTester({
      initialState: defaultState.mergeDeep(initialState),
    });
    sagaTester.start(watchUserProfile);
    return sagaTester;
  };

  describe('user auth state has changed', () => {
    describe('to not being authenticated', () => {
      it('should dispatch SET_DATA with null value', async () => {
        const sagaTester = getSagaTester();

        sagaTester.dispatch(UserAuthActions.authStateChanged(false, null, null));
        const dispatchedAction = await sagaTester.waitFor(UserProfileTypes.SET_DATA);

        expect(dispatchedAction).to.deep.equal(UserProfileActions.setData(null));
      });
    });

    describe('to being authenticated', () => {
      it('should dispatch SET_DATA with passed user data', async () => {
        const sagaTester = getSagaTester();
        const data = { email: 'tstark@apptension.com', participant: { journeyLog: [] } };

        sagaTester.dispatch(UserAuthActions.authStateChanged(true, 'token', data));
        const dispatchedAction = await sagaTester.waitFor(UserProfileTypes.SET_DATA);

        expect(dispatchedAction).to.deep.equal(UserProfileActions.setData(data));
      });

      it('should fetch profile if unavailable and dispatch SET_DATA action ', async () => {
        const sagaTester = getSagaTester();
        const data = {
          email: 'tstark@apptension.com',
        };

        mockApi.get('/auth/me/').reply(OK, data);

        sagaTester.dispatch(UserAuthActions.authStateChanged(true, 'token', null));
        const dispatchedAction = await sagaTester.waitFor(UserProfileTypes.SET_DATA);

        expect(dispatchedAction).to.deep.equal(UserProfileActions.setData(data));
      });
    });

    it('should dispatch UserAuthActions.logout action if user is unauthorized', async () => {
      const sagaTester = getSagaTester();
      const data = {
        email: 'tstark@apptension.com',
      };

      mockApi.get('/auth/me/').reply(UNAUTHORIZED, data);

      sagaTester.dispatch(UserAuthActions.authStateChanged(true, 'token', null));
      const dispatchedAction = await sagaTester.waitFor(UserAuthTypes.LOGOUT);

      expect(dispatchedAction).to.deep.equal(UserAuthActions.logout());
    });
  });

  describe('update profile', () => {
    describe('to being authenticated', () => {
      it('should dispatch SET_DATA with true value', async () => {
        const sagaTester = getSagaTester({
          userAuth: {
            isAuthenticated: true,
          },
        });

        const data = { email: 'tstark@apptension.com', journeyLog: [] };
        mockApi.get('/auth/me/').reply(OK, data);

        sagaTester.dispatch(UserProfileActions.updateProfile());
        const dispatchedAction = await sagaTester.waitFor(UserProfileTypes.SET_DATA);

        expect(dispatchedAction).to.deep.equal(UserProfileActions.setData(data));
      });
    });
  });
});
