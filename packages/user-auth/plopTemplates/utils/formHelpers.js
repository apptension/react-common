import reportError from 'report-error';
import { List } from "immutable";
import { when, is, pipe } from 'ramda';

export const getFormFieldHelperText = (intl, messages, { error, invalid, touched }) => {
  if (invalid && touched) {
    try {
      return intl.formatMessage(messages[pipe(
        when(
          is(List),
          (errors) => errors.first()
        ),
        when(
          is(Array),
          ([firstError]) => firstError
        ),
      )(error)]);
    } catch (e) {
      reportError(e);
    }
  }
  return '';
};
