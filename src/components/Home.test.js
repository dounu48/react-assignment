import Home from './Home';
import { createStore, applyMiddleware   } from 'redux';
import thunk from 'redux-thunk';
import designApp from '../reducers';
import * as actions from '../actions/authentication';
import configureMockStore from 'redux-mock-store';
import MockAdapter  from 'axios-mock-adapter';
import axios from 'axios';

describe('Home test', () => {
    let store;
    let mockStore;
    let home;
    const username = "test";

    it('when it renders without login, sub component should not be rendered', () => {

      store = createStore(designApp, applyMiddleware(thunk));
      home = mount(<Home store={store} />);
      expect(home.find('Bar').exists()).to.be.false;
      expect(home.find('Preference').exists()).to.be.false;

    });

      it('when it renders with login, sub component should be rendered', () => {
       mockStore = configureMockStore([thunk]);
        store = mockStore({
           authentication:{ login: {status:'INIT'}  ,
                           status :{ valid :true, isLoggedIn :true, currentUser :'test'}},
           preference :{ post :{ status :'INIT', error :-1},
                                      get :{ status :'INIT', data :[]},
                                      remove :{ status :'INIT', error :-1},
                                      edit :{status :'INIT', error :-1}}}   );

        home = mount(<Home store={store} />);
        expect(home.find('Bar').exists()).to.be.true;
        expect(home.find('Preference').exists()).to.be.true;

    });
})