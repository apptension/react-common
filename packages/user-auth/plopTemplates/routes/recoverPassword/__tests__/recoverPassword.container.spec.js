import { expect } from 'chai';
import { spy } from 'sinon';
import { goBack } from 'react-router-redux';

import { mapDispatchToProps } from '../recoverPassword.container';
import { UserAuthActions } from '../../../modules/userAuth';


describe('RecoverPassword: Container', () => {
  describe('mapDispatchToProps', () => {
    it('should dispatch USER_AUTH/RECOVER_PASSWORD action when register is called', () => {
      const dispatch = spy();
      const email = 'email@test.com';

      mapDispatchToProps(dispatch).recoverPassword(email);

      expect(dispatch).to.have.been.calledWith(UserAuthActions.recoverPassword(email));
    });

    it('should dispatch goBack action when goBack is called', () => {
      const dispatch = spy();

      mapDispatchToProps(dispatch).goBack();

      expect(dispatch).to.have.been.calledWith(goBack());
    });
  });
});
