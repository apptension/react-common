import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { renderWhenTrueOtherwise } from '../../../utils/rendering';
import {
  SuccessMessage,
  SuccessMessageText,
} from './recoverPassword.styles';
import {
  Container,
  Header,
  Form,
  ButtonGroup,
} from '../../../components/forms/form.styles';
import messages from './recoverPassword.messages';

import { TextField } from '../../../components/forms/textField';

export class RecoverPassword extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    intl: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    recoverPassword: PropTypes.func.isRequired,
    recoverPasswordSuccess: PropTypes.bool.isRequired,
  };

  handleSubmit = (values) => new Promise(() => {
    this.props.recoverPassword(
      values.get('email'),
    );
  });

  renderForm = () => {
    const { intl, handleSubmit } = this.props;
    return (
      <Container>
        <Form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Field
            component={TextField}
            name="email"
            type="email"
            label={messages.emailLabel}
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
  };

  renderSuccessMessage = () => {
    const { language } = this.props;
    return (
      <SuccessMessage>
        <SuccessMessageText>
          <FormattedMessage {...messages.sentMessage} />
        </SuccessMessageText>
        <Link to={`/${language}/recover-password`}>
          <FormattedMessage {...messages.resendEmail} />
        </Link>
      </SuccessMessage>
    );
  };

  render() {
    const { recoverPasswordSuccess } = this.props;
    return (
      <Container>
        <Header>
          <FormattedMessage {...messages.title} />
        </Header>
        {renderWhenTrueOtherwise(this.renderSuccessMessage, this.renderForm)(recoverPasswordSuccess)}
      </Container>
    );
  }
}
