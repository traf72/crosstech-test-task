// @flow

import type { LoadState } from '../../flow/redux';
import type { FetchedEmployee } from '../../api/flow';

export type EmployeesState = {|
    ...LoadState,
    data: FetchedEmployee[],
    error: string,
|};

export type Employee = {|
    id: number,
    firstName: string,
    patronymic: string,
    lastName: string,
    sex: string,
    birthDate: Date,
    position: string,
    phone: string,
|};

export type FetchSuccessAction = {|
    type: string,
    payload: {|
        data: FetchedEmployee[],
    |},
|};

export type FetchFailedAction = {|
    type: string,
    error: Error,
|};

export type DeleteEmployeeAction = {|
    type: string,
    payload: {|
        id: number,
    |},
|};
