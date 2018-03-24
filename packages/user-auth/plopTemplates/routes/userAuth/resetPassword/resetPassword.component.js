import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import {
  Container,
  Header,
  Form,
  ButtonGroup,
} from '../../../components/forms/form.styles';
import messages from './resetPassword.messages';

import { TextField } from '../../../components/forms/textField';

export class ResetPassword extends PureComponent {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  handleSubmit = (values) => new Promise(() => {
    const { location } = this.props;

    this.props.resetPassword(
      values.get('password'),
      location.state.user,
      location.state.token,
    );
  });

  render() {
    const { intl, handleSubmit } = this.props;

    return (
      <Container>
        <Header>
          <FormattedMessage {...messages.title} />
        </Header>
        <Form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Field
            component={TextField}
            name="password"
            type="password"
            label={messages.passwordLabel}
            intl={intl}
            messages={messages}
          />

          <ButtonGroup>
            <button type="submit">
              <FormattedMessage {...messages.submit} />
            </button>
          </ButtonGroup>
        </Form>
      </Container>
    );
  }
}
