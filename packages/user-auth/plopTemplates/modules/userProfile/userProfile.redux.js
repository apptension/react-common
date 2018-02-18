import { createActions, createReducer } from 'reduxsauce';
import { Record, Map, fromJS } from 'immutable';

export const { Types: UserProfileTypes, Creators: UserProfileActions } = createActions({
  updateProfile: [],
  setData: ['data'],
}, { prefix: 'USER_PROFILE_' });

const UserProfileRecord = new Record({
  data: Map(),
});

export const INITIAL_STATE = new UserProfileRecord({});

const setData = (state, { data }) => state.set('data', fromJS(data));

export const reducer = createReducer(INITIAL_STATE, {
  [UserProfileTypes.SET_DATA]: setData,
});
