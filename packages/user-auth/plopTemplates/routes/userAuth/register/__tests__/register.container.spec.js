import { expect } from 'chai';
import { spy } from 'sinon';

import { mapDispatchToProps } from '../register.container';
import { UserAuthActions } from '../../../../modules/userAuth';


describe('Login: Container', () => {
  describe('mapDispatchToProps', () => {
    it('should dispatch USER_AUTH/LOGIN action when login is called', () => {
      const dispatch = spy();
      const email = 'email@test.com';
      const password = 'passw0rd';

      mapDispatchToProps(dispatch).register(email, password);

      expect(dispatch).to.have.been.calledWith(UserAuthActions.register(email, password));
    });
  });
});
