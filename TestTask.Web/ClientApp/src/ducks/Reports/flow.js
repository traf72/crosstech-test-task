// @flow

import type { LoadState } from '../../flow/redux';

export type ReportState = {|
    ...LoadState,
    data: {},
    error: string,
|};

export type ReportsState = {
    [reportName: string]: ReportState
};

export type FetchAction = {|
    type: string,
    payload: {|
        reportName: string,
    |},
|};

export type FetchSuccessAction = {|
    type: string,
    payload: {|
        reportName: string,
        data: {},
    |},
|};

export type FetchFailedAction = {|
    type: string,
    payload: {|
        reportName: string,
    |},
    error: Error,
|};
