import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Container,
} from '../../../components/forms/form.styles';
import messages from './confirmEmail.messages';

export class ConfirmEmail extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    confirmEmail: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { match: { params: { uid, token } }, confirmEmail } = this.props;
    confirmEmail(uid, token);
  }

  render() {
    return (
      <Container>
        <FormattedMessage {...messages.confirming} />
      </Container>
    );
  }
}
