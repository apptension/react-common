import { createSelector } from 'reselect';

const selectUserAuthDomain = state => state.get('userAuth');

export const selectIsAuthenticated = createSelector(
  selectUserAuthDomain,
  (state) => state.get('isAuthenticated'),
);

export const selectToken = createSelector(
  selectUserAuthDomain,
  (state) => state.get('token'),
);

export const selectRemainingAttempts = createSelector(
  selectUserAuthDomain,
  (state) => state.get('remainingLoginAttempts'),
);

export const selectAccountBlocked = createSelector(
  selectUserAuthDomain,
  (state) => state.get('accountBlocked'),
);

export const selectIsResendingActivation = createSelector(
  selectUserAuthDomain,
  (state) => state.get('isResendingActivation'),
);

export const selectRecoverPasswordSuccess = createSelector(
  selectUserAuthDomain,
  (state) => state.get('recoverPasswordSuccess'),
);
