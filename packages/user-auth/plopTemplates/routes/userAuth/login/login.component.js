import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  Form,
  ButtonGroup,
} from '../../../components/forms/form.styles';
import messages from './login.messages';

import { TextField } from '../../../components/forms/textField';

export class Login extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
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

  render() {
    const { intl, handleSubmit, language } = this.props;

    return (
      <Container>
        <Header>
          <FormattedMessage {...messages.title} />
        </Header>

        <Form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Field
            component={TextField}
            name="email"
            type="email"
            label={messages.emailLabel}
            messages={messages}
            intl={intl}
          />

          <Field
            component={TextField}
            name="password"
            type="password"
            label={messages.passwordLabel}
            messages={messages}
            intl={intl}
          />

          <ButtonGroup>
            <button type="submit">
              <FormattedMessage {...messages.submit} />
            </button>
            <Link to={`/${language}/recover-password`}>
              <FormattedMessage {...messages.recoverPassword} />
            </Link>
            <Link to={`/${language}/register`}>
              <FormattedMessage {...messages.signUp} />
            </Link>
          </ButtonGroup>
        </Form>
      </Container>
    );
  }
}
