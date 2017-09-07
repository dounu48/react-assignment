import authentication from './authentication';
import preference from './preference';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    preference
});
