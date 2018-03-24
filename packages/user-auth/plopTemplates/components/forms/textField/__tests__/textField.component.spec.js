import React from 'react';
import { shallow } from 'enzyme';

import { TextField } from '../textField.component';
import { intlMock } from '../../../../utils/testUtils';

describe('<TextField />', () => {
  const defaultProps = {
    intl: intlMock(),
    input: {},
    meta: {
      touched: false,
      error: null,
      invalid: null,
    },
    label: {
      id: 'text',
    },
    type: 'text',
    messages: {
      error: {
        id: 'test',
        defaultMessage: 'Text error',
      },
    },
  };

  const component = (props) => shallow(
    <TextField {...defaultProps} {...props} />
  );

  it('should render itself', () => {
    const wrapper = component();
    global.expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should render error state', () => {
    const wrapper = component({
      meta: {
        touched: true,
        error: 'error',
        invalid: true,
      },
    });
    global.expect(wrapper.dive()).toMatchSnapshot();
  });
});
