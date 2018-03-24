import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { renderWhenTrue } from '../../../utils/rendering';
import { getFormFieldHelperText } from '../../../utils/formHelpers';
import { Container, InputContainer, Label, Input, Error } from './textField.styles';

export class TextField extends PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
  };

  renderError = renderWhenTrue(() => {
    const { meta, intl, messages } = this.props;
    return <Error>{getFormFieldHelperText(intl, messages, meta)}</Error>;
  });

  render() {
    const { label, input, type, meta } = this.props;
    return (
      <Container>
        <InputContainer>
          <Label>
            <FormattedMessage {...label} />
          </Label>
          <Input {...input} type={type} />
        </InputContainer>
        {this.renderError(meta.touched && !!meta.error)}
      </Container>
    );
  }
}
