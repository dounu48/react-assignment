import Authentication from './Authentication';
import Login from '../containers/Login';

describe('Authentication test', () => {
  const promise = Promise.resolve({});
  const onLoginMockFn  = sinon.stub(Login, 'handleLogin').callsFake(()=> promise);
  const onModalCloseMockFn = sinon.stub();
  const auth = mount(<Authentication onLogin={onLoginMockFn}
                                        onModalClose={onModalCloseMockFn} /> );

   it('when log in button click, modal is closed and login function is called', () => {
      auth.find('.login-text').simulate('change', { target: { value: 'test', name: 'username' }});
      auth.find('.login-password').simulate('change', { target: { value: 'test', name: 'password' }});

      expect(auth.state().username).to.equal('test');
      expect(auth.state().password).to.equal("test");

      auth.find('.login-btn').simulate('click');
      sinon.assert.called(onLoginMockFn);

  });

  it('when cancle button click, modal is closed', () => {
      auth.find('.cancel-btn').simulate('click');
      sinon.assert.called(onModalCloseMockFn);

  });

  it('when login failed, set password state is null', () => {
      let failPromise = Promise.resolve(false);
      let onFailLoginMockFn  = sinon.stub(Login, 'handleLogin').callsFake(()=> failPromise);
      let failAuth = mount(<Authentication onLogin={onFailLoginMockFn}
                                              onModalClose={onModalCloseMockFn} /> );

      failAuth.find('.login-btn').simulate('click');
      expect(failAuth.state().password).to.equal('');

  });

})