import { appName } from '../constants';
import { getCatalog } from '../api';
import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { mapEnumToCatalog, shallowEqual, indexArray } from '../utils';
import { sex as sexEnum } from '../enums';
import { showErrorAlert } from './Alert';
import RequestError from '../RequestError';

export const POSITIONS = 'positions';
export const SEX = 'sexCatalog';

const moduleName = 'catalog';
export const FETCH_REQUEST = `${appName}/${moduleName}/FETCH_REQUEST`;
export const FETCH_START = `${appName}/${moduleName}/FETCH_START`;
export const FETCH_SUCCESS = `${appName}/${moduleName}/FETCH_SUCCESS`;
export const FETCH_FAILED = `${appName}/${moduleName}/FETCH_FAILED`;

const sexCatalog = mapEnumToCatalog(sexEnum);

const catalogInitialState = {
    loading: false,
    loadComplete: false,
    data: [],
    indexedData: {},
    error: '',
};

const enumCatalogInitialState = {
    ...catalogInitialState,
    loadComplete: true,
};

const initialState = {
    [POSITIONS]: catalogInitialState,
    [SEX]: { ...enumCatalogInitialState, data: sexCatalog, indexedData: indexArray(sexCatalog) },
};

export default function reducer(state = initialState, action) {
    const { type, payload, error } = action;
    switch (type) {
        case FETCH_START:
            return {
                ...state,
                [payload.catalogName]: {
                    ...catalogInitialState,
                    params: payload.params,
                    loading: true,
                },
            };

        case FETCH_SUCCESS:
            return {
                ...state,
                [payload.catalogName]: {
                    ...catalogInitialState,
                    loadComplete: true,
                    data: payload.data,
                    indexedData: indexArray(payload.data),
                    params: payload.params,
                },
            };

        case FETCH_FAILED:
            return {
                ...state,
                [payload.catalogName]: {
                    ...catalogInitialState,
                    loadComplete: true,
                    params: payload.params,
                    error: error.message,
                },
            };

        default:
            return state;
    }
};

export const fetchCatalog = (catalogName, params) => {
    return {
        type: FETCH_REQUEST,
        payload: { catalogName, params },
    }
}

export const fetchStart = (catalogName, params) => {
    return {
        type: FETCH_START,
        payload: { catalogName, params },
    }
}

export const fetchSuccess = (catalogName, data, params) => {
    return {
        type: FETCH_SUCCESS,
        payload: { catalogName, data, params }
    }
}

export const fetchFailed = (catalogName, error, params) => {
    return {
        type: FETCH_FAILED,
        payload: { catalogName, params },
        error,
    }
}

export const allActions = {
    fetchCatalog, fetchStart, fetchSuccess, fetchFailed
};

const fetchCatalogSaga = function* (action) {
    const { catalogName, params } = action.payload;
    const state = yield select();
    const catalog = state.catalogs[catalogName];
    if (catalog == null) {
        console.error(`Catalog ${catalogName} does not exist`);
        return;
    }

    if (shallowEqual(catalog.params, params) && (catalog.loading || (catalog.loadComplete && !catalog.error))) {
        return;
    }

    yield put(fetchStart(catalogName, params));

    const isRequestActual = state => state.catalogs[catalogName].params === params;
    try {
        const response = yield call(getCatalog, catalogName, params);
        if (isRequestActual(yield select())) {
            yield put(fetchSuccess(catalogName, response.data, params));
        }
    } catch (error) {
        if (isRequestActual(yield select())) {
            const reqError = new RequestError(error, `При загрузке справочника "${catalogName}" произошла ошибка`);
            yield all([
                put(fetchFailed(catalogName, reqError, params)),
                put(showErrorAlert(reqError.message))
            ]);
        }
    }
}

export const saga = function* () {
    yield takeEvery(FETCH_REQUEST, fetchCatalogSaga);
}