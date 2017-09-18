import Login from './Login';
import { createStore, applyMiddleware   } from 'redux';
import thunk from 'redux-thunk';
import designApp from '../reducers';
import * as actions from '../actions/authentication';
import configureMockStore from 'redux-mock-store';
import MockAdapter  from 'axios-mock-adapter';
import axios from 'axios';

describe('Login test', () => {
  let login;
  let store;
  const modalCloseHandlerStub = sinon.stub();
  let mockStore;


  it('when it renders, Authentication component is rendered', () => {
    store = createStore(designApp, applyMiddleware(thunk));
    login = mount(<Login store={store} modalCloseHandler={modalCloseHandlerStub} />);
    expect(login.find('Authentication').exists()).to.be.true;
  });

  it('login success then state is changed, and modalclose handler called', () => {
    mockStore = configureMockStore([thunk]);
    store = mockStore({
          authentication:{ login: {status:'INIT'}  ,
                          status :{ valid :false, isLoggedIn :false, currentUser :''}},
          preference :{ post :{ status :'INIT', error :-1},
                                     get :{ status :'INIT', data :[]},
                                     remove :{ status :'INIT', error :-1},
                                     edit :{status :'INIT', error :-1}}}   );

    login = mount(<Login store={store} modalCloseHandler={modalCloseHandlerStub} />);


    let mockAdapter = new MockAdapter(axios);

     mockAdapter
          .onPost('/api/account/signin')
          .reply(function() {
            return new Promise(function(resolve, reject) {
              resolve([200, { type: 'AUTH_LOGIN_SUCCESS', username: 'test' }]);
            });
          });

     let expectedActions = [
        { type: 'AUTH_LOGIN'}
      ];

     login.find('Authentication').find('.login-btn').simulate('click');
     expect(JSON.stringify(store.getActions())).to.include(JSON.stringify(expectedActions));

     store.dispatch(actions.loginRequest('test','test')).then(() => {
        console.log("get Actions : " + JSON.stringify(store.getActions()));
        expectedActions = [
                { type: 'AUTH_LOGIN'}
              , { type: 'AUTH_LOGIN_SUCCESS', username: 'test' }
              ];

        expect(store.getActions()).to.include(expectedActions);
        sinon.assert.called(modalCloseHandlerStub);

     });
  });
})