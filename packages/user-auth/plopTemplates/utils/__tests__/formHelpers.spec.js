import { spy } from 'sinon';
import { expect } from 'chai';
import { List } from 'immutable';
import { always } from 'ramda';

import { intlMock } from '../testUtils';
import {
  getFormFieldHelperText,
} from '../formHelpers';

describe('getFormFieldHelperText', () => {
  const messages = {
    message1: { id: 'test.message1', defaultMessage: 'Test error 1' },
    message2: { id: 'test.message2', defaultMessage: 'Test error 2' },
  };

  it('should return proper error message when error is a string', () => {
    const meta = {
      error: 'message1',
      invalid: true,
      touched: true,
    };

    expect(getFormFieldHelperText(intlMock(), messages, meta)).to.equal('test.message1 / Test error 1 / {}');
  });

  it('should return first error message when error is a List', () => {
    const meta = {
      error: List(['message2', 'message1']),
      invalid: true,
      touched: true,
    };

    expect(getFormFieldHelperText(intlMock(), messages, meta)).to.equal('test.message2 / Test error 2 / {}');
  });

  it('should return empty string when field hasn\'t been touched', () => {
    const meta = {
      error: 'message1',
      invalid: true,
      touched: false,
    };

    expect(getFormFieldHelperText(intlMock(), messages, meta)).to.equal('');
  });

  it('should return empty string when field isn\'t invalid', () => {
    const meta = {
      invalid: false,
      touched: true,
    };

    expect(getFormFieldHelperText(intlMock(), messages, meta)).to.equal('');
  });
});
