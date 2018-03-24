import { expect } from 'chai';
import { spy } from 'sinon';

import { mapDispatchToProps } from '../confirmEmail.container';
import { UserAuthActions } from '../../../../modules/userAuth';

describe('ConfirmEmail: Container', () => {
  describe('mapDispatchToProps', () => {
    it('should dispatch USER_AUTH/CONFIRM_EMAIL action when confirmEmail is called', () => {
      const dispatch = spy();
      const uid = 'fake_uid';
      const token = 'activation_token';

      mapDispatchToProps(dispatch).confirmEmail(uid, token);

      expect(dispatch).to.have.been.calledWith(UserAuthActions.confirmEmail(uid, token));
    });
  });
});
