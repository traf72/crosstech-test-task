// @flow

import type { AlertState } from '../ducks/Alert/flow';
import type { PageLoaderState } from '../ducks/PageLoader/flow';
import type { EmployeeState } from '../ducks/Employee/flow';
import type { EmployeesState } from '../ducks/Employees/flow';
import type { CatalogsState } from '../ducks/Catalog/flow';
import type { AuthState } from '../ducks/Auth/flow';
import type { ReportsState } from '../ducks/Reports/flow';

export type LoadState = {|
    loading: boolean,
    loadComplete: boolean,
|};

export type Location = {|
    pathname: string,
    search: string,
    hash: string,
    key: string,
|};

export type RouterState = {|
    location: Location,
    action: string,
|};

export type State = {|
    router: RouterState,
    alert: AlertState,
    pageLoader: PageLoaderState,
    employees: EmployeesState,
    employee: EmployeeState,
    catalogs: CatalogsState,
    auth: AuthState,
    reports: ReportsState,
|};

export type Action = {|
    type: string,
    payload?: any,
    error?: Error,
|};

export type Dispatch = Action => Action;
