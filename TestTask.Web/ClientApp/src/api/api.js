// @flow

import type { AxiosPromise } from 'axios';
import type { Catalog } from '../flow/common';
import type { FetchedEmployee, EmployeeToSave, Credentials, FetchedUser, SignInResult } from './flow';
import axios from 'axios';

axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['Cache-control'] = 'no-cache no-store';

export const getCatalog = (catalogName: string, params?: {}): AxiosPromise<Catalog> => {
    return axios.get(`api/catalog/${catalogName}`, { params });
}

export const getEmployees = (): AxiosPromise<FetchedEmployee[]> => {
    return axios.get(`api/employees`);
}

export const getEmployee = (id: number): AxiosPromise<FetchedEmployee> => {
    return axios.get(`api/employees/${id}`);
}

export const createEmployee = (employee: EmployeeToSave): AxiosPromise<FetchedEmployee> => {
    return axios.post(`api/employees`, employee);
}

export const editEmployee = (employee: EmployeeToSave): AxiosPromise<FetchedEmployee> => {
    return axios.put(`api/employees`, employee);
}

export const deleteEmployee = (id: number): AxiosPromise<void> => {
    return axios.delete(`api/employees`, { params: { id }});
}

export const signIn = (credentials: Credentials): AxiosPromise<SignInResult> => {
    return axios.post(`api/auth`, credentials);
}

export const signOut = (): AxiosPromise<void> => {
    return axios.delete(`api/auth`);
}

export const getCurrentUser = (): AxiosPromise<?FetchedUser> => {
    return axios.get(`api/auth`);
}

export const getReport = (reportName: string): AxiosPromise<{}> => {
    return axios.get(`api/reports/${reportName}`);
}
