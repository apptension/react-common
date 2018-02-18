import { pipe, difference, isEmpty, or, contains } from 'ramda';

export const REGISTER_FORM = 'register';
export const LOGIN_FORM = 'login';
export const RECOVER_PASSWORD_FORM = 'recover_password';
export const RESET_PASSWORD_FORM = 'reset_password';

export const ROLE_SYSTEM_ADMINISTRATOR = 'SYSTEM_ADMINISTRATOR';
export const ROLE_USER = 'USER';

export const isAllowed = (requiredRoles, userRoles) => pipe(
  difference(requiredRoles),
  isEmpty,
  or(contains(ROLE_SYSTEM_ADMINISTRATOR, userRoles))
)(userRoles);
