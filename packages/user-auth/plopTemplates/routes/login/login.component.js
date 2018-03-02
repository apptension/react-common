import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { getFormFieldHelperText } from '../../utils/formHelpers';
import {
  Container,
  TextField,
  Form,
  ButtonGroup,
  RegisterBar,
  FieldLine,
} from './login.styles';
import messages from './login.messages';

export class Login extends PureComponent {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (values) => new Promise(() => {
    this.props.login(
      values.get('email'),
      values.get('password')
    );
  });

  renderTextField = ({ meta, input, type, label }) => {
    return (
      <FieldLine>
        <TextField
          error={meta.invalid && meta.touched}
          value={input.value}
          type={type}
          label={label}
          helperText={getFormFieldHelperText(this.props.intl, messages, meta)}
          InputProps={input}
        />
      </FieldLine>
    );
  };

  render() {
    const { intl, handleSubmit } = this.props;

    return (
      <Container>
        <FormattedMessage {...messages.title} />

        <Form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Field
            component={this.renderTextField}
            name="email"
            type="email"
            label={intl.formatMessage(messages.emailLabel)}
          />

          <Field
            component={this.renderTextField}
            name="password"
            type="password"
            label={intl.formatMessage(messages.passwordLabel)}
          />

          <ButtonGroup>
            <Link to="/recover-password">
              <FormattedMessage {...messages.recoverPassword} />
            </Link>
            <button type="submit">
              <FormattedMessage {...messages.submit} />
            </button>
          </ButtonGroup>
          <RegisterBar>
            <FormattedMessage {...messages.registerPrompt} />
            <Link to="/register">
              <FormattedMessage {...messages.signUp} />
            </Link>
          </RegisterBar>
        </Form>
      </Container>
    );
  }
}
