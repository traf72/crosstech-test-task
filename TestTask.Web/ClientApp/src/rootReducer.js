// @flow

import type { Action } from './flow/redux';
import { combineReducers } from 'redux';
import history from './history';
import { connectRouter } from 'connected-react-router';
import catalogReducer from './ducks/Catalog';
import alertReducer from './ducks/Alert';
import pageLoaderReducer from './ducks/PageLoader';
import authReducer from './ducks/Auth';
import employeesReducer from './ducks/Employees';
import employeeReducer from './ducks/Employee';
import reportsReducer from './ducks/Reports';

export default combineReducers<_, Action>({
    router: connectRouter(history),
    catalogs: catalogReducer,
    alert: alertReducer,
    pageLoader: pageLoaderReducer,
    auth: authReducer,
    employees: employeesReducer,
    employee: employeeReducer,
    reports: reportsReducer,
});
