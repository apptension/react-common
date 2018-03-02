import { expect } from 'chai';
import { spy } from 'sinon';

import { mapDispatchToProps } from '../resetPassword.container';
import { UserAuthActions } from '../../../modules/userAuth';


describe('ResetPassword: Container', () => {
  describe('mapDispatchToProps', () => {
    it('should dispatch USER_AUTH/RESET_PASSWORD action when register is called', () => {
      const dispatch = spy();
      const password = 'email@test.com';
      const uid = 'fakeUid';
      const token = 'fakeToken';

      mapDispatchToProps(dispatch).resetPassword(password, uid, token);

      expect(dispatch).to.have.been.calledWith(UserAuthActions.resetPassword(password, uid, token));
    });
  });
});
