import reducer, {
    SHOW_ALERT, CLOSE_ALERT, CLOSE_BY_TIMEOUT, allActions as actions,
    watchCloseByTimeoutSaga, closeByTimeoutSaga,
} from './Alert';
import { put, delay, take, race, call } from 'redux-saga/effects';
import deepFreeze from 'deep-freeze';

describe('reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            visible: false,
            color: 'info',
            closeTimeout: 0,
            message: '',
        }
    });

    it(`should reduce showAlert action`, () => {
        let state = deepFreeze(initialState);

        expect(reducer(state, actions.showAlert('warning', 'Hello World!'))).toEqual({
            visible: true,
            color: 'warning',
            message: 'Hello World!',
            closeTimeout: 0,
        });

        expect(reducer(state, actions.showAlert('danger', 'Hello World!', 5))).toEqual({
            visible: true,
            color: 'danger',
            message: 'Hello World!',
            closeTimeout: 5000,
        });
    });

    it(`should reduce closeAlert action`, () => {
        let state = deepFreeze({
            visible: true,
            color: 'danger',
            closeTimeout: 2000,
            message: 'Hello World!',
        });
        expect(reducer(state, actions.closeAlert())).toEqual(initialState);
    });

    it(`should reduce unknown action`, () => {
        const state = deepFreeze(initialState);
        const action = {
            type: 'UNKNOWN',
            color: 'error',
            message: 'UNKNOWN',
        };

        expect(reducer(state, action)).toBe(state);
    });
});

describe('actions', () => {
    it(`should create showAlert action`, () => {
        const [color, message] = ['error', 'Hello World!'];
        expect(actions.showAlert(color, message)).toEqual({
            type: SHOW_ALERT,
            payload: { color, message, closeTimeout: 0 },
        });

        expect(actions.showAlert(color, message, 5)).toEqual({
            type: SHOW_ALERT,
            payload: { color, message, closeTimeout: 5000 },
        });
    });

    it(`should create showSuccessAlert action`, () => {
        const message = 'Hello World!';
        expect(actions.showSuccessAlert(message)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'success', message, closeTimeout: 0 },
        });

        expect(actions.showSuccessAlert(message, 5)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'success', message, closeTimeout: 5000 },
        });
    });

    it(`should create showWarningAlert action`, () => {
        const message = 'Hello World!';
        expect(actions.showWarningAlert(message)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'warning', message, closeTimeout: 0 },
        });

        expect(actions.showWarningAlert(message, 5)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'warning', message, closeTimeout: 5000 },
        });
    });

    it(`should create showErrorAlert action`, () => {
        const message = 'Hello World!';
        expect(actions.showErrorAlert(message)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'danger', message, closeTimeout: 0 },
        });

        expect(actions.showErrorAlert(message, 5)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'danger', message, closeTimeout: 5000 },
        });
    });

    it(`should create showInfoAlert action`, () => {
        const message = 'Hello World!';
        expect(actions.showInfoAlert(message)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'info', message, closeTimeout: 0 },
        });

        expect(actions.showInfoAlert(message, 5)).toEqual({
            type: SHOW_ALERT,
            payload: { color: 'info', message, closeTimeout: 5000 },
        });
    });

    it(`should create closeAlert action`, () => {
        expect(actions.closeAlert()).toEqual({ type: CLOSE_ALERT });
    });

    it(`should create closeByTimeout action`, () => {
        expect(actions.closeByTimeout(4000)).toEqual({
            type: CLOSE_BY_TIMEOUT,
            payload: { timeout: 4000 },
        });
    });
});

describe('sagas', () => {
    const timeout = 3000;

    it(`should close alert after timeout`, () => {
        const gen = closeByTimeoutSaga(timeout);

        expect(gen.next()).toEqual({ done: false, value: delay(timeout) });
        expect(gen.next()).toEqual({ done: false, value: put(actions.closeAlert()) });
        expect(gen.next()).toEqual({ done: true });
    });

    it(`should watch closeByTimeout action`, () => {
        const gen = watchCloseByTimeoutSaga();

        expect(gen.next()).toEqual({ done: false, value: take(CLOSE_BY_TIMEOUT) });

        const action = actions.closeByTimeout(timeout);
        expect(gen.next(action)).toEqual({
            done: false,
            value: race([
                call(closeByTimeoutSaga, action.payload.timeout),
                take([SHOW_ALERT, CLOSE_ALERT])
            ])
        });

        expect(gen.next()).toEqual({ done: false, value: take(CLOSE_BY_TIMEOUT) });
    });
});