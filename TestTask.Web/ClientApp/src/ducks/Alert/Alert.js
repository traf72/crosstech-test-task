// @flow

import type { Saga } from 'redux-saga';
import type { Action } from '../../flow/redux';
import type { AlertState, ShowAlertAction, CloseByTimeoutAction } from './flow';

import { take, race, put, call, delay } from 'redux-saga/effects';
import { appName } from '../../constants';

const moduleName = 'alert';
export const SHOW_ALERT = `${appName}/${moduleName}/SHOW_ALERT`;
export const CLOSE_ALERT = `${appName}/${moduleName}/CLOSE_ALERT`;
export const CLOSE_BY_TIMEOUT = `${appName}/${moduleName}/CLOSE_BY_TIMEOUT`;

const initialState: AlertState = {
    visible: false,
    closeTimeout: 0,
    color: 'info',
    message: '',
};

export default function reducer(state: AlertState = initialState, action: Action): AlertState {
    const { type, payload: { color, message, closeTimeout } = {} } = action;

    switch (type) {
        case SHOW_ALERT:
            return {
                ...state,
                visible: true,
                color,
                message,
                closeTimeout,
            }

        case CLOSE_ALERT:
            return initialState;

        default:
            return state;
    }
};

export const showAlert = (color: string, message: string, closeTimeoutInSeconds: number = 0): ShowAlertAction => {
    return {
        type: SHOW_ALERT,
        payload: {
            color,
            message,
            closeTimeout: closeTimeoutInSeconds * 1000,
        },
    }
}

export const showSuccessAlert = (message: string, closeTimeoutInSeconds: number = 0): ShowAlertAction => {
    return showAlert('success', message, closeTimeoutInSeconds);
}

export const showWarningAlert = (message: string, closeTimeoutInSeconds: number = 0): ShowAlertAction => {
    return showAlert('warning', message, closeTimeoutInSeconds);
}

export const showInfoAlert = (message: string, closeTimeoutInSeconds: number = 0): ShowAlertAction => {
    return showAlert('info', message, closeTimeoutInSeconds);
}

export const showErrorAlert = (message: string, closeTimeoutInSeconds: number = 0): ShowAlertAction => {
    return showAlert('danger', message, closeTimeoutInSeconds);
}

export const closeAlert = (): Action => {
    return {
        type: CLOSE_ALERT,
    }
}

export const closeByTimeout = (timeout: number): CloseByTimeoutAction => {
    return {
        type: CLOSE_BY_TIMEOUT,
        payload: { timeout }
    }
}

export const closeByTimeoutSaga = function* (timeout: number) : Saga<void> {
    yield delay(timeout);
    yield put(closeAlert());
}

export const watchCloseByTimeoutSaga = function* () : Saga<void> {
    while (true) {
        const closeByTimeoutAction: CloseByTimeoutAction = yield take(CLOSE_BY_TIMEOUT);
        yield race([
            call(closeByTimeoutSaga, closeByTimeoutAction.payload.timeout),
            take([SHOW_ALERT, CLOSE_ALERT])
        ]);
    }
}

export const allActions = {
    showAlert, showSuccessAlert, showWarningAlert, showInfoAlert, showErrorAlert, closeAlert, closeByTimeout
}

export const saga = function* (): Generator<Saga<void>, void, any> {
    yield watchCloseByTimeoutSaga();
}
