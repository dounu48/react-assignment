import authentication from './authentication';
import preference from './preference';

import { combineReducers } from 'redux';

const designApp = combineReducers({
    authentication,
    preference
});


export default designApp;
