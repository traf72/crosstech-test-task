// @flow

import type { Saga } from 'redux-saga';
import type { $AxiosXHR } from 'axios';
import type { Catalog } from '../../flow/common';
import type { Action, State } from '../../flow/redux';
import type { CatalogState, CatalogsState, CatalogParams, FetchCatalogAction, FetchStartAction, FetchSuccessAction, FetchFailedAction } from './flow';

import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { appName } from '../../constants';
import { getCatalog } from '../../api';
import { mapEnumToCatalog, shallowEqual, indexArray } from '../../utils';
import { sex as sexEnum } from '../../enums';
import { showErrorAlert } from '../Alert';
import RequestError from '../../RequestError';

export const POSITIONS = 'positions';
export const SEX = 'sexCatalog';

const moduleName = 'catalog';
export const FETCH_REQUEST = `${appName}/${moduleName}/FETCH_REQUEST`;
export const FETCH_START = `${appName}/${moduleName}/FETCH_START`;
export const FETCH_SUCCESS = `${appName}/${moduleName}/FETCH_SUCCESS`;
export const FETCH_FAILED = `${appName}/${moduleName}/FETCH_FAILED`;

const sexCatalog = mapEnumToCatalog(sexEnum);

const catalogInitialState: CatalogState = {
    loading: false,
    loadComplete: false,
    data: [],
    indexedData: {},
    error: '',
};

const enumCatalogInitialState: CatalogState = {
    ...catalogInitialState,
    loadComplete: true,
};

const initialState: CatalogsState = {
    [POSITIONS]: catalogInitialState,
    [SEX]: {
        ...enumCatalogInitialState,
        data: sexCatalog,
        indexedData: indexArray(sexCatalog),
    },
};

export default function reducer(state: CatalogsState = initialState, action: Action): CatalogsState {
    const { type, payload = {}, error } = action;
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
                    error: error && error.message,
                },
            };

        default:
            return state;
    }
};

export const fetchCatalog = (catalogName: string, params?: CatalogParams): FetchCatalogAction => {
    return {
        type: FETCH_REQUEST,
        payload: { catalogName, params },
    }
}

export const fetchStart = (catalogName: string, params?: CatalogParams): FetchStartAction => {
    return {
        type: FETCH_START,
        payload: { catalogName, params },
    }
}

export const fetchSuccess = (catalogName: string, data: Catalog, params?: CatalogParams): FetchSuccessAction => {
    return {
        type: FETCH_SUCCESS,
        payload: { catalogName, data, params }
    }
}

export const fetchFailed = (catalogName: string, error: Error, params?: CatalogParams): FetchFailedAction => {
    return {
        type: FETCH_FAILED,
        payload: { catalogName, params },
        error,
    }
}

export const allActions = {
    fetchCatalog, fetchStart, fetchSuccess, fetchFailed
};

const fetchCatalogSaga = function* (action: FetchCatalogAction) : Saga<void>  {
    const { catalogName, params } = action.payload;
    const state: State = yield select();
    const catalog = state.catalogs[catalogName];
    if (catalog == null) {
        console.error(`Catalog ${catalogName} does not exist`);
        return;
    }

    if (shallowEqual(catalog.params, params) && (catalog.loading || (catalog.loadComplete && !catalog.error))) {
        return;
    }

    yield put(fetchStart(catalogName, params));

    const isRequestActual = (state: State): boolean => state.catalogs[catalogName].params === params;
    try {
        const response: $AxiosXHR<Catalog> = yield call(getCatalog, catalogName, params);
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

export const saga = function* (): Saga<void> {
    yield takeEvery(FETCH_REQUEST, fetchCatalogSaga);
}
