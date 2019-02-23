import { all } from 'redux-saga/effects';
import { saga as alertSaga } from './ducks/Alert';
import { saga as authSaga } from './ducks/Auth';

export default function* () {
    yield all([
        alertSaga(),
        authSaga(),
    ]);
};
