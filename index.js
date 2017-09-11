import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Login from './containers/Login';
import Bar from './components/Bar';
import Home from './components/Home';
import Preference from './components/Preference';
import Authentication from './components/Authentication';

import { BrowserRouter, Link, Switch, Route, Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
 <Provider store={store}>
    <BrowserRouter >
     <Switch>
         <Route exact path='/' component={App}/>
         <Route path='preference' component={Preference} />
     </Switch>
    </BrowserRouter>
    </Provider>
 , document.getElementById('root'));