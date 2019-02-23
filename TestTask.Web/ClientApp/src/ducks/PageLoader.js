import { appName } from '../constants';
import { LOCATION_CHANGE } from 'connected-react-router';

const moduleName = 'page-loader';
export const SHOW_PAGE_LOADER = `${appName}/${moduleName}/SHOW_PAGE_LOADER`;
export const HIDE_PAGE_LOADER = `${appName}/${moduleName}/HIDE_PAGE_LOADER`;

const initialState = {
    visible: false,
    showOverlay: false,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_PAGE_LOADER:
            return {
                visible: true,
                showOverlay: payload.showOverlay,
            };

        case HIDE_PAGE_LOADER:
        case LOCATION_CHANGE:
            return initialState;

        default:
            return state;
    }
};

export const showPageLoader = showOverlay => {
    return {
        type: SHOW_PAGE_LOADER,
        payload: { showOverlay: !!showOverlay },
    }
}

export const hidePageLoader = () => {
    return {
        type: HIDE_PAGE_LOADER,
    }
}

export const allActions = {
    showPageLoader, hidePageLoader
}