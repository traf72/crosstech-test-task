import { all } from 'redux-saga/effects';
import { saga as alertSaga } from './ducks/Alert';
import { saga as authSaga } from './ducks/Auth';
import { saga as employeesSaga } from './ducks/Employees';

export default function* () {
    yield all([
        alertSaga(),
        authSaga(),
        employeesSaga(),
    ]);
};
