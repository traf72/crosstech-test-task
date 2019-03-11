import { appName } from '../constants';
import { createSelector } from 'reselect';
import { takeEvery, takeLatest, takeLeading, put, call, select, all } from 'redux-saga/effects';
import { getEmployee, createEmployee, editEmployee } from '../api';
import { push } from 'connected-react-router';
import { home } from '../routes';
import { POSITIONS, SEX, fetchCatalog } from './Catalog';
import RequestError from '../RequestError';
import { showErrorAlert } from './Alert';
import { now } from '../utils';

const moduleName = 'employee';
export const NEW_EMPLOYEE = `${appName}/${moduleName}/NEW_EMPLOYEE`;
export const SAVE_REQUEST = `${appName}/${moduleName}/SAVE_REQUEST`;
export const SAVE_START = `${appName}/${moduleName}/SAVE_START`;
export const SAVE_SUCCESS = `${appName}/${moduleName}/SAVE_SUCCESS`;
export const SAVE_FAILED = `${appName}/${moduleName}/SAVE_FAILED`;
export const FETCH_REQUEST = `${appName}/${moduleName}/FETCH_REQUEST`;
export const FETCH_START = `${appName}/${moduleName}/FETCH_START`;
export const FETCH_SUCCESS = `${appName}/${moduleName}/FETCH_SUCCESS`;
export const FETCH_FAILED = `${appName}/${moduleName}/FETCH_FAILED`;

export const employeeCatalogs = [POSITIONS, SEX];

const initialState = {
    loading: false,
    loadComplete: false,
    loadTime: new Date(0),
    saving: false,
    id: null,
    data: null,
    error: '',
};

export default function reducer(state = initialState, action) {
    const { type, payload, error } = action;
    switch (type) {
        case FETCH_START:
            return {
                ...initialState,
                loading: true,
                id: payload.id,
            };
        case FETCH_FAILED:
            return {
                ...initialState,
                loadComplete: true,
                loadTime: payload.loadTime,
                id: payload.id,
                error: error.message,
            };
        case SAVE_START:
            return {
                ...state,
                saving: true,
                id: payload.id,
            };
        case FETCH_SUCCESS:
        case SAVE_SUCCESS:
            return {
                ...initialState,
                loadComplete: true,
                loadTime: payload.loadTime,
                id: payload.data.id,
                data: payload.data,
            };
        case SAVE_FAILED:
            return {
                ...state,
                saving: false,
                loadTime: payload.loadTime,
                id: payload.id,
                error: error.message,
            };

        default:
            return state;
    }
};

export const newEmployee = () => {
    return {
        type: NEW_EMPLOYEE,
    }
};

export const saveStart = id => {
    return {
        type: SAVE_START,
        payload: { id },
    }
};

export const saveSuccess = (data, loadTime) => {
    return {
        type: SAVE_SUCCESS,
        payload: { data, loadTime },
    }
};

export const saveFailed = (id, error, loadTime) => {
    return {
        type: SAVE_FAILED,
        payload: { id, loadTime },
        error,
    }
};

export const saveEmployee = employee => {
    return {
        type: SAVE_REQUEST,
        payload: { employee },
    }
};

export const fetchEmployee = id => {
    return {
        type: FETCH_REQUEST,
        payload: { id },
    }
};

export const fetchStart = (id = 0) => {
    return {
        type: FETCH_START,
        payload: { id },
    }
};

export const fetchSuccess = (data, loadTime) => {
    return {
        type: FETCH_SUCCESS,
        payload: { data, loadTime },
    }
};

export const fetchFailed = (id, error, loadTime) => {
    return {
        type: FETCH_FAILED,
        payload: { id, loadTime },
        error,
    }
};

export const fetchEmployeeCatalogsSaga = function* () {
    yield all(employeeCatalogs.map(c => put(fetchCatalog(c))));
}

export const saveEmployeeSaga = function* (action) {
    const { employee } = action.payload;
    const id = employee.id;
    const state = yield select();
    const currentLocation = state.router.location;

    yield put(saveStart(id));

    const isLocationChanged = state => currentLocation !== state.router.location;
    const isEmployeeChanged = state => state.employee.id !== id;
    try {
        const api = id ? editEmployee : createEmployee;
        const response = yield call(api, employee);
        const savedEmployee = response.data;
        const state = yield select();

        if (!isEmployeeChanged(state)) {
            yield put(saveSuccess(savedEmployee, now()));
        }

        if (!isLocationChanged(state)) {
            yield put(push(home.buildUrl()));
        }
    } catch (error) {
        const reqError = new RequestError(error, 'При сохранении сотрудника произошла ошибка');
        if (!isEmployeeChanged(yield select())) {
            yield put(saveFailed(id, reqError, now()));
        }
        yield put(showErrorAlert(reqError.message));
    }
};

export const fetchEmployeeSaga = function* (action) {
    yield call(fetchEmployeeCatalogsSaga);

    const { id } = action.payload;
    yield put(fetchStart(id));
    try {
        const response = yield call(getEmployee, id);
        const employeeData = response.data;
        yield put(fetchSuccess(employeeData, now()));
    } catch (error) {
        const reqError = new RequestError(error, 'При загрузке сотрудника произошла ошибка');
        yield all([
            put(fetchFailed(id, reqError, now())),
            put(showErrorAlert(reqError.message))
        ]);
    }
};

export const saga = function* () {
    yield all([
        takeLatest(FETCH_REQUEST, fetchEmployeeSaga),
        takeLeading(NEW_EMPLOYEE, fetchEmployeeCatalogsSaga),
        takeEvery(SAVE_REQUEST, saveEmployeeSaga),
    ]);
};

const isCatalogsLoaded = allCatalogs =>
    employeeCatalogs.every(c => allCatalogs[c].loadComplete);

const catalogsSelector = state => state.catalogs;
const employeeSelector = state => state.employee;

export const employeeCatalogsSelector = createSelector(
    catalogsSelector,
    catalogs =>
        employeeCatalogs.reduce((acc, name) => {
            acc[name] = catalogs[name];
            return acc;
        }, {})
);

export const isNewEmployeeReadySelector = createSelector(
    catalogsSelector,
    catalogs => isCatalogsLoaded(catalogs)
);

export const isEmployeeReadySelector = createSelector(
    catalogsSelector,
    employeeSelector,
    (catalogs, employee) => employee.loadComplete && isCatalogsLoaded(catalogs)
);

export const employeeNewSelector = createSelector(
    () => ({
        id: 0,
        firstName: '',
        patronymic: '',
        lastName: '',
        sex: null,
        birtDate: null,
        position: null,
        phone: '',
    })
);

export const employeeFullSelector = createSelector(
    catalogsSelector,
    employeeSelector,
    (catalogs, employee) => {
        const getCatalogItem = (catalogName, itemId) => {
            return itemId && catalogs[catalogName].indexedData[itemId];
        }

        const payload = employee.data != null ? employee.data : {};
        return {
            id: payload.id || 0,
            firstName: payload.firstName || '',
            patronymic: payload.patronymic || '',
            lastName: payload.lastName || '',
            sex: payload.sex ? getCatalogItem(SEX, payload.sex) : null,
            birthDate: payload.birthDate ? new Date(payload.birthDate) : null,
            position: payload.position ? getCatalogItem(POSITIONS, payload.position.id) : null,
            phone: payload.phone || '',
        }
    }
);
