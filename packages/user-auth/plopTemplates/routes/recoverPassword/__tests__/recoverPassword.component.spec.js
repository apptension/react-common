import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import { Map } from 'immutable';
import { identity } from 'ramda';
import { IconButton } from 'material-ui';

import { RecoverPassword } from '../recoverPassword.component';
import { Form } from '../recoverPassword.styles';
import { intlMock } from '../../../utils/testUtils';

describe('<RecoverPassword />', () => {
  const defaultProps = {
    intl: intlMock(),
    handleSubmit: identity,
    recoverPassword: identity,
    goBack: identity,
    recoverPasswordSuccess: false,
  };

  const component = (props) => (
    <RecoverPassword {...defaultProps} {...props} />
  );

  it('should render form', () => {
    const wrapper = shallow(component());
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render success message', () => {
    const wrapper = shallow(component({ recoverPasswordSuccess: true }));
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSubmit when form is submit', () => {
    const handleSubmit = spy();
    const wrapper = shallow(component({ handleSubmit }));
    wrapper.find(Form).simulate('submit');

    expect(handleSubmit).to.have.been.called;
  });

  it('should call goBack on Back button click', () => {
    const goBack = spy();
    const wrapper = shallow(component({ goBack }));
    wrapper.find(IconButton).at(0).simulate('click');

    expect(goBack).to.have.been.called;
  });

  it('should call recoverPassword prop when handling submit', () => {
    const email = 'email@test.com';
    const handleSubmit = spy();
    const recoverPassword = spy();

    const wrapper = shallow(component({ handleSubmit, recoverPassword }));
    wrapper.find(Form).simulate('submit');

    const [fn] = handleSubmit.getCall(0).args;

    fn(Map({ email }));

    expect(recoverPassword).to.have.been.calledWith(email);
  });
});
