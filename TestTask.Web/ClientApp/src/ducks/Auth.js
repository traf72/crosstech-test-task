import { appName } from '../constants';
import { takeEvery, takeLeading, takeLatest, put, call, all, select } from 'redux-saga/effects';
import { home as homeRoute, signIn as signInRoute } from '../routes';
import { push } from 'connected-react-router';
import { showErrorAlert } from './Alert';
import RequestError from '../RequestError';
import {
    signIn as signInApi,
    signOut as signOutApi,
    getCurrentUser
} from '../api';

const moduleName = 'auth';
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_START = `${appName}/${moduleName}/SIGN_IN_START`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_FAILED = `${appName}/${moduleName}/SIGN_IN_FAILED`;
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_START = `${appName}/${moduleName}/SIGN_OUT_START`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_FAILED = `${appName}/${moduleName}/SIGN_OUT_FAILED`;
export const FETCH_USER_REQUEST = `${appName}/${moduleName}/FETCH_USER_REQUEST`;

const initialState = {
    user: null,
    signInInProgress: false,
    signOutInProgress: false,
    error: null,
    loadTime: new Date(0),
};

export default function reducer(state = initialState, action) {
    const { type, payload, error } = action;
    switch (type) {
        case SIGN_IN_START:
            return {
                ...initialState,
                signInInProgress: true,
            }

        case SIGN_IN_SUCCESS:
            return {
                ...initialState,
                user: payload.user,
                signInInProgress: false,
                loadTime: payload.loadTime,
            }

        case SIGN_IN_FAILED:
            return {
                ...initialState,
                signInInProgress: false,
                loadTime: payload.loadTime,
                error: error.message,
            }

        case SIGN_OUT_START:
            return {
                ...state,
                signOutInProgress: true,
            }

        case SIGN_OUT_SUCCESS:
            return { ...initialState }

        case SIGN_OUT_FAILED:
            return {
                ...state,
                signOutInProgress: false,
                error: error.message,
            }

        default:
            return state;
    }
};

export const signIn = (login, password, rememberMe) => {
    return {
        type: SIGN_IN_REQUEST,
        payload: { login, password, rememberMe },
    }
}

export const signInStart = () => {
    return {
        type: SIGN_IN_START
    }
}

export const signInSuccess = (user, loadTime) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: { user, loadTime },
    }
}

export const signInFailed = (error, loadTime) => {
    return {
        type: SIGN_IN_FAILED,
        payload: { loadTime },
        error,
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT_REQUEST
    }
}

export const signOutStart = () => {
    return {
        type: SIGN_OUT_START
    }
}

export const signOutSuccess = () => {
    return {
        type: SIGN_OUT_SUCCESS
    }
}

export const signOutFailed = error => {
    return {
        type: SIGN_OUT_FAILED,
        error,
    }
}

export const fetchUser = () => {
    return {
        type: FETCH_USER_REQUEST,
    }
}

export const signInSaga = function* (action) {
    yield put(signInStart());

    try {
        const response = yield call(signInApi, action.payload);
        const result = response.data;

        if (result.error) {
            const error = new Error(result.error);
            yield all([
                put(signInFailed(error, new Date())),
                put(showErrorAlert(error.message))
            ]);
        } else {
            yield put(signInSuccess(result.user, new Date()));
            yield put(push(homeRoute.url));
        }
    } catch (error) {
        const reqError = new RequestError(error);
        yield all([
            put(signInFailed(reqError, new Date())),
            put(showErrorAlert(reqError.message))
        ]);
    }
}

export const signOutSaga = function* () {
    yield put(signOutStart());

    try {
        yield call(signOutApi);
        yield put(signOutSuccess());
        yield put(push(signInRoute.url));
    } catch (error) {
        const reqError = new RequestError(error);
        yield all([
            put(signOutFailed(reqError, new Date())),
            put(showErrorAlert(reqError.message))
        ]);
    }
}

export const fetchUserSaga = function* () {
    const state = yield select();
    if (state.auth.signInInProgress || state.auth.signOutInProgress) {
        return;
    }

    try {
        const response = yield call(getCurrentUser);
        yield put(signInSuccess(response.data ? response.data : null, new Date()));
    } catch (error) {
        const reqError = new RequestError(error);
        yield put(signInFailed(reqError, new Date()));
    }
}

export const saga = function* () {
    yield all([
        takeLatest(SIGN_IN_REQUEST, signInSaga),
        takeLeading(SIGN_OUT_REQUEST, signOutSaga),
        takeEvery(FETCH_USER_REQUEST, fetchUserSaga),
    ]);
}