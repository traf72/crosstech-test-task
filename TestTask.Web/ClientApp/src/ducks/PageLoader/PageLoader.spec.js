import reducer, { SHOW_PAGE_LOADER, HIDE_PAGE_LOADER, allActions as actions } from './PageLoader';
import deepFreeze from 'deep-freeze';

describe('reducer', () => {
    const initialState = {
        visible: false,
        showOverlay: false,
    }

    it(`should reduce showPageLoader action`, () => {
        const state = deepFreeze(initialState);

        expect(reducer(state, actions.showPageLoader())).toEqual({
            visible: true,
            showOverlay: false,
        });

        expect(reducer(state, actions.showPageLoader(true))).toEqual({
            visible: true,
            showOverlay: true,
        });
    });

    it(`should reduce hidePageLoader action`, () => {
        const state = deepFreeze({ visible: true, showOverlay: true });

        expect(reducer(state, actions.hidePageLoader())).toEqual(initialState);
    });

    it(`should reduce unknown action`, () => {
        const state = deepFreeze(initialState);

        expect(reducer(state, { type: 'unknown' })).toBe(state);
    });
});

describe('actions', () => {
    it(`should create showPageLoader action`, () => {
        expect(actions.showPageLoader()).toEqual({
            type: SHOW_PAGE_LOADER,
            payload: { showOverlay: false },
        });

        expect(actions.showPageLoader(true)).toEqual({
            type: SHOW_PAGE_LOADER,
            payload: { showOverlay: true },
        });
    });

    it(`should create hidePageLoader action`, () => {
        expect(actions.hidePageLoader()).toEqual({
            type: HIDE_PAGE_LOADER,
        });
    });
});