import { combineReducers } from 'redux';
import history from './history';
import { connectRouter } from 'connected-react-router';
import alertReducer from './ducks/Alert';
import pageLoaderReducer from './ducks/PageLoader';
import authReducer from './ducks/Auth';

export default combineReducers({
    router: connectRouter(history),
    alert: alertReducer,
    pageLoader: pageLoaderReducer,
    auth: authReducer,
});
