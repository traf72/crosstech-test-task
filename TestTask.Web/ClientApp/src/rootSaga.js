import { all } from 'redux-saga/effects';
import { saga as catalogSaga } from './ducks/Catalog';
import { saga as alertSaga } from './ducks/Alert';
import { saga as authSaga } from './ducks/Auth';
import { saga as employeesSaga } from './ducks/Employees';
import { saga as employeeSaga } from './ducks/Employee';
import { saga as reportsSaga } from './ducks/Reports';

export default function* () {
    yield all([
        catalogSaga(),
        alertSaga(),
        authSaga(),
        employeesSaga(),
        employeeSaga(),
        reportsSaga(),
    ]);
};
