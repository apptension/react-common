import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { identity } from 'ramda';
import { spy } from 'sinon';

import { ConfirmEmail } from '../confirmEmail.component';

describe('<ConfirmEmail />', () => {
  const defaultProps = {
    match: {
      params: {
        uid: 'fakeuid',
        token: 'faketoken',
      },
    },
    confirmEmail: identity,
  };

  const component = (props) => (
    <ConfirmEmail {...defaultProps} {...props} />
  );

  it('should render itself', () => {
    const wrapper = shallow(component());
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should call confirmEmail on componentWillMount', () => {
    const confirmEmail = spy();
    shallow(component({ confirmEmail }));
    expect(confirmEmail).to.have.been.calledOnce;
  });
});
