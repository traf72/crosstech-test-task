// @flow

import type { LoadState } from '../../flow/redux';
import type { CatalogItem } from '../../flow/common';
import type { FetchedEmployee, EmployeeToSave } from '../../api/flow';

export type EmployeeState = {|
    ...LoadState,
    loadTime: Date,
    saving: boolean,
    id: ?number,
    data: ?FetchedEmployee,
    error: string,
|};

export type Position = {|
    id: number,
    name: string,
|};

export type Employee = {|
    id: number,
    firstName: string,
    patronymic: string,
    lastName: string,
    sex: ?CatalogItem,
    birthDate: ?Date,
    position: ?CatalogItem,
    phone: string,
|};

export type ReuqestStartAction = {|
    type: string,
    payload: {|
        id: number,
    |},
|};

export type RequestSuccessAction = {|
    type: string,
    payload: {|
        data: FetchedEmployee,
        loadTime: Date,
    |},
|};

export type RequestFailedAction = {|
    type: string,
    payload: {|
        id: number,
        loadTime: Date,
    |},
    error: Error,
|};

export type SaveEmployeeAction = {|
    type: string,
    payload: {|
        employee: EmployeeToSave,
    |},
|};

export type FetchEmployeeAction = {|
    type: string,
    payload: {|
        id: number,
    |},
|};
