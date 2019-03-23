// @flow

import typeof { sex as Sex } from '../enums';

export type FetchedUser = {|
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    roles: string[],
|};

export type FetchedEmployee = {|
    id: number,
    lastName: string,
    firstName: string,
    patronymic: string,
    sex: $Keys<Sex>,
    birthDate: string,
    phone: string,
    position: {|
        id: number,
        name: string,
    |},
|};

export type EmployeeToSave = {|
    id: number,
    lastName: string,
    firstName: string,
    patronymic: string,
    sex: $Keys<Sex>,
    birthDate: Date,
    phone: string,
    position: {|
        id: number,
    |},
|};

export type Credentials = {|
    login: string,
    password: string,
    rememberMe: boolean,
|};

export type SignInResult = {|
    user?: FetchedUser,
    error?: string
|};
