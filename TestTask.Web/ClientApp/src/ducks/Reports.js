import { appName } from '../constants';
import { getReport } from '../api';
import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { showErrorAlert } from './Alert';
import RequestError from '../RequestError';

export const EMPLOYEES_COUNT_BY_SEX = 'EmplyeesCountBySex';
export const EMPLOYEES_COUNT_BY_DECADES = 'EmplyeesCountByDecades';

const moduleName = 'reports';
export const FETCH_REQUEST = `${appName}/${moduleName}/FETCH_REQUEST`;
export const FETCH_START = `${appName}/${moduleName}/FETCH_START`;
export const FETCH_SUCCESS = `${appName}/${moduleName}/FETCH_SUCCESS`;
export const FETCH_FAILED = `${appName}/${moduleName}/FETCH_FAILED`;

const reportInitialState = {
    loading: false,
    loadComplete: false,
    data: [],
    error: '',
};

const initialState = {
    [EMPLOYEES_COUNT_BY_SEX]: reportInitialState,
    [EMPLOYEES_COUNT_BY_DECADES]: reportInitialState,
};

export default function reducer(state = initialState, action) {
    const { type, payload, error } = action;
    switch (type) {
        case FETCH_START:
            return {
                ...state,
                [payload.reportName]: {
                    ...reportInitialState,
                    loading: true,
                },
            };

        case FETCH_SUCCESS:
            return {
                ...state,
                [payload.reportName]: {
                    ...reportInitialState,
                    loadComplete: true,
                    data: payload.data,
                },
            };

        case FETCH_FAILED:
            return {
                ...state,
                [payload.reportName]: {
                    ...reportInitialState,
                    loadComplete: true,
                    error: error.message,
                },
            };

        default:
            return state;
    }
};

export const fetchReport = reportName => {
    return {
        type: FETCH_REQUEST,
        payload: { reportName },
    }
}

export const fetchStart = reportName => {
    return {
        type: FETCH_START,
        payload: { reportName },
    }
}

export const fetchSuccess = (reportName, data) => {
    return {
        type: FETCH_SUCCESS,
        payload: { reportName, data }
    }
}

export const fetchFailed = (reportName, error) => {
    return {
        type: FETCH_FAILED,
        payload: { reportName },
        error,
    }
}

export const allActions = {
    fetchReport, fetchStart, fetchSuccess, fetchFailed
};

const fetchReportSaga = function* (action) {
    const { reportName } = action.payload;
    const state = yield select();
    const report = state.reports[reportName];
    if (report == null) {
        console.error(`Report ${reportName} does not exist`);
        return;
    }

    if (report.loading) {
        return;
    }

    yield put(fetchStart(report));

    try {
        const response = yield call(getReport, reportName);
        yield put(fetchSuccess(reportName, response.data));
    } catch (error) {
        const reqError = new RequestError(error, `При загрузке отчёта "${reportName}" произошла ошибка`);
        yield all([
            put(fetchFailed(reportName, reqError)),
            put(showErrorAlert(reqError.message))
        ]);
    }
}

export const saga = function* () {
    yield takeEvery(FETCH_REQUEST, fetchReportSaga);
}