import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import { Map } from 'immutable';
import { identity } from 'ramda';

import { ResetPassword } from '../resetPassword.component';
import { Form } from '../resetPassword.styles';
import { intlMock } from '../../../utils/testUtils';

describe('<ResetPassword />', () => {
  const defaultProps = {
    intl: intlMock(),
    handleSubmit: identity,
    resetPassword: identity,
    location: {
      state: {
        user: 'fakeUid',
        token: 'fakeToken',
      },
    },
  };

  const component = (props) => (
    <ResetPassword {...defaultProps} {...props} />
  );

  it('should render itself', () => {
    const wrapper = shallow(component());
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSubmit when form is submit', () => {
    const handleSubmit = spy();
    const wrapper = shallow(component({ handleSubmit }));
    wrapper.find(Form).simulate('submit');

    expect(handleSubmit).to.have.been.called;
  });

  it('should call resetPassword prop when handling submit', () => {
    const password = 'test123';
    const { location: { state: { user, token } } } = defaultProps;
    const handleSubmit = spy();
    const resetPassword = spy();

    const wrapper = shallow(component({ handleSubmit, resetPassword }));
    wrapper.find(Form).simulate('submit');

    const [fn] = handleSubmit.getCall(0).args;

    fn(Map({ password }));

    expect(resetPassword).to.have.been.calledWith(password, user, token);
  });
});
