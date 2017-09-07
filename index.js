import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, Login }  from 'containers';
import { Bar, Home, Preference,  Authentication } from 'components';
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