// @flow

import type { Saga } from 'redux-saga';
import type { $AxiosXHR } from 'axios';
import type { Action, State } from '../../flow/redux';
import type { FetchedUser, SignInResult } from '../../api/flow';
import type { AuthState, SignInAction, SignInSuccessAction, SignInFailedAction } from './flow';

import { push } from 'connected-react-router';
import { takeEvery, takeLeading, takeLatest, put, call, all, select } from 'redux-saga/effects';
import { appName } from '../../constants';
import { home as homeRoute, signIn as signInRoute } from '../../routes';
import { showErrorAlert } from '../Alert';
import RequestError from '../../RequestError';
import {
    signIn as signInApi,
    signOut as signOutApi,
    getCurrentUser
} from '../../api';
import { now } from '../../utils';

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

const initialState: AuthState = {
    user: null,
    signInInProgress: false,
    signOutInProgress: false,
    error: '',
    loadTime: new Date(0),
};

export default function reducer(state: AuthState = initialState, action: Action) {
    const { type, payload = {}, error } = action;
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
                error: error && error.message,
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
                error: error && error.message,
            }

        default:
            return state;
    }
};

export const signIn = (login: string, password: string, rememberMe: boolean): SignInAction => {
    return {
        type: SIGN_IN_REQUEST,
        payload: { login, password, rememberMe },
    }
}

export const signInStart = (): Action => {
    return {
        type: SIGN_IN_START
    }
}

export const signInSuccess = (user: ?FetchedUser, loadTime: Date): SignInSuccessAction => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: { user, loadTime },
    }
}

export const signInFailed = (error: Error, loadTime: Date): SignInFailedAction => {
    return {
        type: SIGN_IN_FAILED,
        payload: { loadTime },
        error,
    }
}

export const signOut = (): Action => {
    return {
        type: SIGN_OUT_REQUEST
    }
}

export const signOutStart = (): Action => {
    return {
        type: SIGN_OUT_START
    }
}

export const signOutSuccess = (): Action => {
    return {
        type: SIGN_OUT_SUCCESS
    }
}

export const signOutFailed = (error: Error): Action => {
    return {
        type: SIGN_OUT_FAILED,
        error,
    }
}

export const fetchUser = (): Action => {
    return {
        type: FETCH_USER_REQUEST,
    }
}

export const signInSaga = function* (action: SignInAction): Saga<void> {
    yield put(signInStart());

    try {
        const response: $AxiosXHR<SignInResult> = yield call(signInApi, action.payload);
        const result = response.data;

        if (result.error) {
            const error = new Error(result.error);
            yield all([
                put(signInFailed(error, now())),
                put(showErrorAlert(error.message))
            ]);
        } else {
            yield put(signInSuccess(result.user, now()));
            yield put(push(homeRoute.url));
        }
    } catch (error) {
        const reqError = new RequestError(error);
        yield all([
            put(signInFailed(reqError, now())),
            put(showErrorAlert(reqError.message))
        ]);
    }
}

export const signOutSaga = function* (): Saga<void> {
    yield put(signOutStart());

    try {
        yield call(signOutApi);
        yield put(signOutSuccess());
        yield put(push(signInRoute.url));
    } catch (error) {
        const reqError = new RequestError(error);
        yield all([
            put(signOutFailed(reqError)),
            put(showErrorAlert(reqError.message))
        ]);
    }
}

export const fetchUserSaga = function* (): Saga<void> {
    const state: State = yield select();
    if (state.auth.signInInProgress || state.auth.signOutInProgress) {
        return;
    }

    try {
        const response: $AxiosXHR<?FetchedUser> = yield call(getCurrentUser);
        yield put(signInSuccess(response.data ? response.data : null, now()));
    } catch (error) {
        const reqError = new RequestError(error);
        yield put(signInFailed(reqError, now()));
    }
}

export const saga = function* (): Saga<void> {
    yield all([
        takeLatest(SIGN_IN_REQUEST, signInSaga),
        takeLeading(SIGN_OUT_REQUEST, signOutSaga),
        takeEvery(FETCH_USER_REQUEST, fetchUserSaga),
    ]);
}