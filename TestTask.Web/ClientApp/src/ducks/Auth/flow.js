// @flow

import type { FetchedUser } from '../../api/flow';

export type AuthState = {|
    user: ?FetchedUser,
    signInInProgress: boolean,
    signOutInProgress: boolean,
    error: string,
    loadTime: Date,
|};

export type SignInAction = {|
    type: string,
    payload: {|
        login: string,
        password: string,
        rememberMe: boolean,
    |},
|};

export type SignInSuccessAction = {|
    type: string,
    payload: {|
        user: ?FetchedUser,
        loadTime: Date,
    |},
|};

export type SignInFailedAction = {|
    type: string,
    payload: {|
        loadTime: Date,
    |},
    error: Error,
|};
