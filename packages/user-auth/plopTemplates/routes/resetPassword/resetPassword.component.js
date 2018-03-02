import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { getFormFieldHelperText } from '../../utils/formHelpers';
import { Container, TextField, Form, ButtonGroup } from './resetPassword.styles';
import messages from './resetPassword.messages';

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

  render() {
    const { intl, handleSubmit } = this.props;

    return (
      <Container>
        <FormattedMessage {...messages.title} />
        <Form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Field
            component={this.renderTextField}
            name="password"
            type="password"
            label={intl.formatMessage(messages.passwordLabel)}
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
