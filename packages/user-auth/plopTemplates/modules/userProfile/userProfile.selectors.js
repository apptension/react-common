import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectUserProfileDomain = state => state.get('userProfile', fromJS({}));

export const selectUserProfile = createSelector(
  selectUserProfileDomain,
  state => state.get('data')
);

export const selectUserRoles = createSelector(
  selectUserProfileDomain,
  state => state.getIn(['data', 'groups'], null)
);

export const selectUserProfileLoaded = createSelector(
  selectUserProfileDomain,
  state => state.size > 0
);
