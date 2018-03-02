import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { getFormFieldHelperText, renderWhenTrueOtherwise } from '../../utils/formHelpers';
import {
  Container,
  TextField,
  Form,
  ButtonGroup,
  SuccessMessage,
  SuccessMessageText,
} from './recoverPassword.styles';
import messages from './recoverPassword.messages';

export class RecoverPassword extends PureComponent {
  static propTypes = {
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

  renderTextField = ({ meta, input, type, label }) => {
    return (
      <TextField
        error={meta.invalid && meta.touched}
        value={input.value}
        type={type}
        label={label}
        helperText={getFormFieldHelperText(this.props.intl, messages, meta)}
        InputProps={input}
      />
    );
  };

  renderForm = () => {
    const { intl, handleSubmit } = this.props;
    return (
      <Container>
        <Form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Field
            component={this.renderTextField}
            name="email"
            type="email"
            label={intl.formatMessage(messages.emailLabel)}
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
    return (
      <SuccessMessage>
        <SuccessMessageText responsive>
          <FormattedMessage {...messages.sentMessage} />
        </SuccessMessageText>
        <Link to="/recover-password">
          <FormattedMessage {...messages.resendEmail} />
        </Link>
      </SuccessMessage>
    );
  };

  render() {
    const { recoverPasswordSuccess } = this.props;
    return (
      <Container>
        <FormattedMessage {...messages.title} />
        {renderWhenTrueOtherwise(this.renderSuccessMessage, this.renderForm)(recoverPasswordSuccess)}
      </Container>
    );
  }
}
