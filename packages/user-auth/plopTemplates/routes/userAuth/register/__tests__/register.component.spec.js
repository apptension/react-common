import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import { Map } from 'immutable';
import { identity } from 'ramda';

import { intlMock } from '../../../../utils/testUtils';
import { Register } from '../register.component';
import { Form } from '../../../../components/forms/form.styles';

describe('<Register />', () => {
  const defaultProps = {
    intl: intlMock(),
    handleSubmit: identity,
    register: identity,
    language: 'en',
  };

  const component = (props) => shallow(
    <Register {...defaultProps} {...props} />
  );

  it('should render itself', () => {
    const wrapper = component();
    global.expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should call register prop when handling submit', () => {
    const email = 'email@test.com';
    const password = 'passw0rd';

    const register = spy();
    const handleSubmit = spy();
    const wrapper = component({ register, handleSubmit });
    wrapper.find(Form).simulate('submit');

    const [fn] = handleSubmit.getCall(0).args;

    fn(Map({ email, password }));

    expect(register).to.have.been.calledWith(email, password);
  });
});
