import { expect } from 'chai';
import { fromJS } from 'immutable';

import {
  selectUserProfile,
  selectUserRoles,
  selectUserProfileLoaded,
} from '../userProfile.selectors';

describe('UserProfile: selectors', () => {
  const state = fromJS({
    userProfile: {
      data: {
        email: 'some-email@test.com',
        groups: ['SOME_GROUP'],
      },
    },
  });

  describe('selectUserProfile', () => {
    it('should select a domain', () => {
      expect(selectUserProfile(state)).to.equal(state.getIn(['userProfile', 'data']));
    });
  });

  describe('selectUserRoles', () => {
    it('should select a domain', () => {
      expect(selectUserRoles(state)).to.equal(state.getIn(['userProfile', 'data', 'groups']));
    });
  });

  describe('selectUserProfileLoaded', () => {
    it('should select true when not empty', () => {
      expect(selectUserProfileLoaded(state)).to.equal(true);
    });
    it('should select false when empty', () => {
      expect(selectUserProfileLoaded(fromJS({ userProfile: {} }))).to.equal(false);
    });
  });
});
