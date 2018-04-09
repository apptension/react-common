import { pipe, difference, isEmpty, or, contains } from 'ramda';

export const REGISTER_FORM = 'register';
export const LOGIN_FORM = 'login';
export const RECOVER_PASSWORD_FORM = 'recover_password';
export const RESET_PASSWORD_FORM = 'reset_password';

export const ROLE_SYSTEM_ADMINISTRATOR = 'SYSTEM_ADMINISTRATOR';
export const ROLE_USER = 'USER';

export const EMAIL_FIELD = 'email';
export const PASSWORD_FIELD = 'password';
export const PASSWORD_REPEAT_FIELD = 'passwordRepeat';

export const isAllowed = (requiredRoles, userRoles) => pipe(
  difference(requiredRoles),
  isEmpty,
  or(contains(ROLE_SYSTEM_ADMINISTRATOR, userRoles))
)(userRoles);
