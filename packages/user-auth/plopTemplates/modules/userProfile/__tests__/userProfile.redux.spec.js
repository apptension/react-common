import { expect } from 'chai';
import { fromJS } from 'immutable';

import {
  reducer as userProfileReducer,
  UserProfileActions,
} from '../userProfile.redux';


describe('UserProfile: redux', () => {
  const state = fromJS({
    data: {},
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(userProfileReducer(undefined, {}).toJS()).to.deep.equal(state.toJS());
    });

    it('should return state on unknown action', () => {
      expect(userProfileReducer(state, { type: 'unknown-action' }).toJS()).to.deep.equal(state.toJS());
    });

    it('should set data if USER_PROFILE/SET_DATA action is received', () => {
      const data = { name: 'Some name' };
      expect(userProfileReducer(state, UserProfileActions.setData(data)).toJS())
        .to.deep.equal(state.set('data', fromJS(data)).toJS());
    });
  });
});
