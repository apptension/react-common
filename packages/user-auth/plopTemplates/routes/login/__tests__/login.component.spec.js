import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import { Map } from 'immutable';
import { identity } from 'ramda';

import { intlMock } from '../../../utils/testUtils';
import { Login } from '../login.component';
import { Form } from '../login.styles';

describe('<Login />', () => {
  const defaultProps = {
    intl: intlMock(),
    handleSubmit: identity,
    login: identity,
  };

  const component = (props) => (
    <Login {...defaultProps} {...props} />
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

  it('should call register prop when handling submit', () => {
    const email = 'email@test.com';
    const password = 'passw0rd';

    const login = spy();
    const handleSubmit = spy();
    const wrapper = shallow(component({ login, handleSubmit }));
    wrapper.find(Form).simulate('submit');

    const [fn] = handleSubmit.getCall(0).args;

    fn(Map({ email, password }));

    expect(login).to.have.been.calledWith(email, password);
  });
});
