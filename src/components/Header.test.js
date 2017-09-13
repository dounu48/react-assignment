import Header from './Header';

 describe('Header test', () => {
   const logoutStub = sinon.stub();
   const header = shallow(<Header isLoggedIn={false} onLogout={logoutStub} />);

   it('when login button click, then modal is opened', () => {

       expect(header.state().isOpen).to.be.false;
       header.find('.header-login').simulate('click');
       expect(header.state().isOpen).to.be.true;

       header.instance().closeModal();
       header.update();
       expect(header.state().isOpen).to.be.false;

   });

   it ('when logged in, logout button is showed', () => {
      header.setProps ({
         isLoggedIn: true,
      });

      expect(header.find('.header-logout')).to.exist;

      header.find('.header-logout').simulate('click');
      sinon.assert.called(logoutStub);

   });

 })