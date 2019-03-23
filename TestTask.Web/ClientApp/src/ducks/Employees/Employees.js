// @flow

import type { Saga } from 'redux-saga';
import type { $AxiosXHR } from 'axios';
import type { Action, State } from '../../flow/redux';
import type { FetchedEmployee } from '../../api/flow';
import type {
    EmployeesState, Employee, FetchSuccessAction, FetchFailedAction, DeleteEmployeeAction
} from './flow';

import { createSelector } from 'reselect';
import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import { appName } from '../../constants';
import { getEmployees, deleteEmployee as deleteEmp } from '../../api';
import { showErrorAlert } from '../Alert';
import { sex as sexEnum } from '../../enums';
import RequestError from '../../RequestError';

const moduleName = 'employees';
export const FETCH_REQUEST = `${appName}/${moduleName}/FETCH_REQUEST`;
export const FETCH_START = `${appName}/${moduleName}/FETCH_START`;
export const FETCH_SUCCESS = `${appName}/${moduleName}/FETCH_SUCCESS`;
export const FETCH_FAILED = `${appName}/${moduleName}/FETCH_FAILED`;
export const DELETE_REQUEST = `${appName}/${moduleName}/DELETE_REQUEST`;

const initialState: EmployeesState = {
    loading: false,
    loadComplete: false,
    data: [],
    error: '',
};

export default function reducer(state: EmployeesState = initialState, action: Action): EmployeesState {
    const { type, payload = {}, error } = action;
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
                error: error && error.message,
            };

        default:
            return state;
    }
};

export const fetch = (): Action => {
    return {
        type: FETCH_REQUEST,
    }
}

export const fetchStart = (): Action => {
    return {
        type: FETCH_START,
    }
}

export const fetchSuccess = (data: FetchedEmployee[]): FetchSuccessAction => {
    return {
        type: FETCH_SUCCESS,
        payload: { data },
    }
}

export const fetchFailed = (error: Error): FetchFailedAction => {
    return {
        type: FETCH_FAILED,
        error,
    }
}

export const deleteEmployee = (id: number): DeleteEmployeeAction => {
    return {
        type: DELETE_REQUEST,
        payload: { id },
    }
}

export const allActions = {
    fetch, fetchStart, fetchSuccess, fetchFailed, deleteEmployee
};

export const fetchSaga = function* (): Saga<void> {
    yield put(fetchStart());

    try {
        const response: $AxiosXHR<FetchedEmployee[]> = yield call(getEmployees);
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

export const deleteSaga = function* (action: DeleteEmployeeAction): Saga<void> {
    try {
        yield call(deleteEmp, action.payload.id);
        yield put(fetch());
    } catch (error) {
        const reqError = new RequestError(error, 'При удалении сотрудника произошла ошибка');
        put(showErrorAlert(reqError.message));
    }
}

export const saga = function* (): Saga<void> {
    yield all([
        takeLatest(FETCH_REQUEST, fetchSaga),
        takeEvery(DELETE_REQUEST, deleteSaga),
    ]);
}

const employeesSelector = (state: State): EmployeesState => state.employees;

export const selector = createSelector<State, void, Employee[], EmployeesState>(
    employeesSelector,
    employees => employees.data.map(emp => {
        const { sex, birthDate, position, ...rest } = emp;
        return {
            ...rest,
            sex: sexEnum[sex],
            birthDate: new Date(birthDate),
            position: position.name,
        }
    })
);
