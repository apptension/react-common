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
import messages from './register.messages';

import { TextField } from '../../../components/forms/textField';
import { EMAIL_FIELD, PASSWORD_FIELD, PASSWORD_REPEAT_FIELD } from '../../../modules/userAuth';

export class Register extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    intl: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (values) => new Promise(() => {
    this.props.register(
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
            name={EMAIL_FIELD}
            type="email"
            label={messages.emailLabel}
            messages={messages}
            intl={intl}
          />

          <Field
            component={TextField}
            name={PASSWORD_FIELD}
            type="password"
            label={messages.passwordLabel}
            messages={messages}
            intl={intl}
          />

          <Field
            component={TextField}
            name={PASSWORD_REPEAT_FIELD}
            type="password"
            label={messages.passwordRepeatLabel}
            messages={messages}
            intl={intl}
          />

          <ButtonGroup>
            <button type="submit">
              <FormattedMessage {...messages.submit} />
            </button>
            <Link to={`/${language}/login`}>
              <FormattedMessage {...messages.signIn} />
            </Link>
          </ButtonGroup>
        </Form>
      </Container>
    );
  }
}
