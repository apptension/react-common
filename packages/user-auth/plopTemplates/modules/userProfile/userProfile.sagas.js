import { takeLatest, put, select } from 'redux-saga/effects';
import reportError from 'report-error';
import { UNAUTHORIZED } from 'http-status-codes';

import { api } from '../../services/api';
import { UserAuthTypes, selectIsAuthenticated, UserAuthActions } from '../userAuth';
import { UserProfileActions, UserProfileTypes } from './userProfile.redux';

export function* fetchProfile({ isAuthenticated, user }) {
  try {
    if (!isAuthenticated) {
      return yield put(UserProfileActions.setData(null));
    }

    if (!user) {
      const { data } = yield api.get('/auth/profile');
      user = data;
    }

    return yield put(UserProfileActions.setData(user));
  } catch (error) {
    if (error.response && error.response.status === UNAUTHORIZED) {
      return yield put(UserAuthActions.logout());
    }

    /* istanbul ignore next */
    return reportError(error);
  }
}

export function* updateProfile() {
  try {
    const isAuthenticated = yield select(selectIsAuthenticated);
    if (isAuthenticated) {
      yield fetchProfile({ isAuthenticated });
    }
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export function* watchUserProfile() {
  try {
    yield takeLatest(UserAuthTypes.AUTH_STATE_CHANGED, fetchProfile);
    yield takeLatest(UserProfileTypes.UPDATE_PROFILE, updateProfile);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
