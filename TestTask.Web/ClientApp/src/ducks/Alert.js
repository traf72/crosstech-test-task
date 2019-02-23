import { appName } from '../constants';
import { take, race, put, call, delay } from 'redux-saga/effects';

const moduleName = 'alert';
export const SHOW_ALERT = `${appName}/${moduleName}/SHOW_ALERT`;
export const CLOSE_ALERT = `${appName}/${moduleName}/CLOSE_ALERT`;
export const CLOSE_BY_TIMEOUT = `${appName}/${moduleName}/CLOSE_BY_TIMEOUT`;

const initialState = {
    visible: false,
    closeTimeout: 0,
    color: 'info',
    message: '',
};

export default function reducer(state = initialState, action) {
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

export const showAlert = (color, message, closeTimeoutInSeconds = 0) => {
    return {
        type: SHOW_ALERT,
        payload: {
            color,
            message,
            closeTimeout: closeTimeoutInSeconds * 1000,
        },
    }
}

export const showSuccessAlert = (message, closeTimeoutInSeconds = 0) => {
    return showAlert('success', message, closeTimeoutInSeconds);
}

export const showWarningAlert = (message, closeTimeoutInSeconds = 0) => {
    return showAlert('warning', message, closeTimeoutInSeconds);
}

export const showInfoAlert = (message, closeTimeoutInSeconds = 0) => {
    return showAlert('info', message, closeTimeoutInSeconds);
}

export const showErrorAlert = (message, closeTimeoutInSeconds = 0) => {
    return showAlert('danger', message, closeTimeoutInSeconds);
}

export const closeAlert = () => {
    return {
        type: CLOSE_ALERT,
    }
}

export const closeByTimeout = timeout => {
    return {
        type: CLOSE_BY_TIMEOUT,
        payload: { timeout }
    }
}

export const closeByTimeoutSaga = function* (timeout) {
    yield delay(timeout);
    yield put(closeAlert());
}

export const watchCloseByTimeoutSaga = function* () {
    while (true) {
        const closeByTimeoutAction = yield take(CLOSE_BY_TIMEOUT);
        yield race([
            call(closeByTimeoutSaga, closeByTimeoutAction.payload.timeout),
            take([SHOW_ALERT, CLOSE_ALERT])
        ]);
    }
}

export const allActions = {
    showAlert, showSuccessAlert, showWarningAlert, showInfoAlert, showErrorAlert, closeAlert, closeByTimeout
}

export const saga = function* () {
    yield watchCloseByTimeoutSaga();
}