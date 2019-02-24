import { appName } from '../constants';
import { getEmployees, deleteEmployee as deleteEmp } from '../api';
import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import { showErrorAlert } from './Alert';
import { sex as sexEnum } from '../enums';
import RequestError from '../RequestError';

const moduleName = 'employees';
export const FETCH_REQUEST = `${appName}/${moduleName}/FETCH_REQUEST`;
export const FETCH_START = `${appName}/${moduleName}/FETCH_START`;
export const FETCH_SUCCESS = `${appName}/${moduleName}/FETCH_SUCCESS`;
export const FETCH_FAILED = `${appName}/${moduleName}/FETCH_FAILED`;
export const DELETE_REQUEST = `${appName}/${moduleName}/DELETE_REQUEST`;

const initialState = {
    loading: false,
    loadComplete: false,
    data: [],
    error: '',
};

export default function reducer(state = initialState, action) {
    const { type, payload, error } = action;
    switch (type) {
        case FETCH_START:
            return {
                ...state,
                loading: true,
                loadComplete: false,
                error: '',
            };

        case FETCH_SUCCESS:
            return {
                ...initialState,
                loadComplete: true,
                data: payload.data,
            };

        case FETCH_FAILED:
            return {
                ...initialState,
                loadComplete: true,
                error: error.message,
            };

        default:
            return state;
    }
};

export const fetch = () => {
    return {
        type: FETCH_REQUEST,
    }
}

export const fetchStart = () => {
    return {
        type: FETCH_START,
    }
}

export const fetchSuccess = data => {
    return {
        type: FETCH_SUCCESS,
        payload: { data },
    }
}

export const fetchFailed = error => {
    return {
        type: FETCH_FAILED,
        error,
    }
}

export const deleteEmployee = id => {
    return {
        type: DELETE_REQUEST,
        payload: { id },
    }
}

export const allActions = {
    fetch, fetchStart, fetchSuccess, fetchFailed, deleteEmployee
};

export const fetchSaga = function* () {
    yield put(fetchStart());

    try {
        const response = yield call(getEmployees);
        const result = response.data;
        yield put(fetchSuccess(result));
    } catch (error) {
        const reqError = new RequestError(error, 'При получении сотрудников произошла ошибка');
        yield all([
            put(fetchFailed(reqError)),
            put(showErrorAlert(reqError.message))
        ]);
    }
}

export const deleteSaga = function* (action) {
    try {
        yield call(deleteEmp, action.payload.id);
        yield put(fetch());
    } catch (error) {
        const reqError = new RequestError(error, 'При удалении сотрудника произошла ошибка');
        put(showErrorAlert(reqError.message));
    }
}

export const saga = function* () {
    yield all([
        takeLatest(FETCH_REQUEST, fetchSaga),
        takeEvery(DELETE_REQUEST, deleteSaga),
    ]);
}

export const selector = employees => {
    return {
        loadComplete: employees.loadComplete,
        data: employees.data.map(emp => ({
            ...emp,
            sex: sexEnum[emp.sex],
            birthDate: new Date(emp.birthDate),
        }))
    }
}