import { takeLatest, put, select, all } from 'redux-saga/effects';
import reportError from 'report-error';
import { stopSubmit, reset } from 'redux-form';
import { camelizeKeys } from 'humps';
import { replace } from 'react-router-redux';
import { ifElse, prop, always } from 'ramda';
import { BAD_REQUEST } from 'http-status-codes';

import { api, camelizeErrors } from '../../services/api';
import { StartupTypes } from '../startup';
import { UserAuthActions, UserAuthTypes } from './userAuth.redux';
import {
  RESET_PASSWORD_FORM,
  RECOVER_PASSWORD_FORM,
  REGISTER_FORM, LOGIN_FORM,
} from './userAuth.constants';
import {
  selectIsAuthenticated,
  selectToken,
  selectRemainingAttempts,
  selectAccountBlocked,
} from './userAuth.selectors';
import messages from './userAuth.messages';

function* setAuthorizationToken({ isAuthenticated, token }) {
  try {
    api.defaults.headers.common['X-Authorization'] = isAuthenticated ? `JWT ${token}` : null;
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* configure({ isAuthenticated, token, user = null }) {
  try {
    yield setAuthorizationToken({ isAuthenticated, token });
    yield put(UserAuthActions.authStateChanged(isAuthenticated, token, user));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* startup() {
  try {
    const token = yield select(selectToken);
    const isAuthenticated = yield select(selectIsAuthenticated);

    yield configure({ isAuthenticated, token });
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* register({ email, password }) {
  try {
    const {
      data: { jwt: token, user },
    } = yield api.post('/auth/registration', {
      email,
      password,
    });

    yield put(stopSubmit(REGISTER_FORM));
    yield configure({ isAuthenticated: true, token, user });
    yield put(UserAuthActions.loginSuccess());
  } catch (error) {
    if (error.response) {
      yield put(stopSubmit(REGISTER_FORM, camelizeErrors(error.response.data)));
    } else {
      yield put(stopSubmit(REGISTER_FORM));
      /* istanbul ignore next */
      reportError(error);
    }
  }
}

const shouldShowAttemptNotification = (attempts) => attempts <= 2 && attempts > 0;

function* login({ email, password }) {
  try {
    const { data: { jwt: token, user } } = yield api.post('/auth/login', { email, password });
    yield configure({ isAuthenticated: true, token, user });
    yield put(UserAuthActions.loginSuccess());
  } catch (error) {
    if (error.response) {
      const data = camelizeKeys(error.response.data);
      yield put(UserAuthActions.loginFailure(data));

      const accountBlocked = yield select(selectAccountBlocked);

      const values = {
        attempts: yield select(selectRemainingAttempts),
      };

      if (shouldShowAttemptNotification(values.attempts)) {
        // show message messages.remainingAttempts, values
      }

      if (accountBlocked) {
        // show message messages.accountBlocked
      }

      yield put(stopSubmit(LOGIN_FORM, { password: ['passwordWrongError'] }));
    } else {
      yield configure({ isAuthenticated: false, token: null, user: null });
      yield put(stopSubmit(LOGIN_FORM));
      /* istanbul ignore next */
      reportError(error);
    }
  }
}

function* logout() {
  try {
    yield configure({ isAuthenticated: false, token: null });
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* confirmEmail({ uid, emailToken }) {
  try {
    const { data: { jwt: token, user } } = yield api.post(`/auth/activate-account/${uid}/${emailToken}/`);
    yield configure({ isAuthenticated: true, token, user });
    yield all([
      put(replace('/')),
    ]);
  } catch (error) {
    if (error.response && error.response.status === BAD_REQUEST) {
      const { data } = error.response;

      const camelizedError = ifElse(prop('token'),
        always(camelizeErrors({ errorKey: data.token })),
        always(camelizeErrors({ errorKey: data.account })),
      )(data);

      // show error message messages[camelizedError.errorKey
    } else {
      // show error message messages.activationTokenInvalid
    }
    yield put(replace('/'));
    /* istanbul ignore next */
    reportError(error);
  }
}

function* recoverPassword({ email }) {
  try {
    yield api.post('/auth/password/reset/', { email });
    yield put(UserAuthActions.recoverPasswordSuccess());
  } catch (error) {
    /* We don't care about errors in recover password request */
    /* istanbul ignore next */
    reportError(error);
  } finally {
    yield put(stopSubmit(RECOVER_PASSWORD_FORM));
  }
}

function* recoverPasswordSuccess() {
  try {
    yield put(reset(RECOVER_PASSWORD_FORM));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* resetPassword({ password, user, token }) {
  try {
    yield api.post('/auth/password/reset/confirm', { password, user, token });
    // show message messages.resetPasswordSuccess
    yield put(replace('/login'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.token) {
        const { data: { token: tokenValue } } = error.response;
        const { token: tokenError } = camelizeErrors({ token: tokenValue });
        // show message messages[tokenError]
      } else {
        yield put(stopSubmit(RESET_PASSWORD_FORM, camelizeErrors(error.response.data)));
      }
    } else {
      yield put(stopSubmit(RESET_PASSWORD_FORM));
    }
  }
}

function* resendActivation() {
  try {
    yield api.post('/auth/activation-link');
    yield put(UserAuthActions.resendActivationSuccess());
    // show message messages.activationMessageResent
  } catch (error) {
    if (error.response) {
      yield put(UserAuthActions.resendActivationFailure());
      // show message messages.activationMessageResentError
    } else {
      /* istanbul ignore next */
      reportError(error);
    }
  }
}

export function* watchUserAuth() {
  try {
    yield takeLatest(StartupTypes.STARTUP, startup);
    yield takeLatest(UserAuthTypes.REGISTER, register);
    yield takeLatest(UserAuthTypes.LOGIN, login);
    yield takeLatest(UserAuthTypes.LOGOUT, logout);
    yield takeLatest(UserAuthTypes.CONFIRM_EMAIL, confirmEmail);
    yield takeLatest(UserAuthTypes.RECOVER_PASSWORD, recoverPassword);
    yield takeLatest(UserAuthTypes.RECOVER_PASSWORD_SUCCESS, recoverPasswordSuccess);
    yield takeLatest(UserAuthTypes.RESET_PASSWORD, resetPassword);
    yield takeLatest(UserAuthTypes.RESEND_ACTIVATION, resendActivation);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
