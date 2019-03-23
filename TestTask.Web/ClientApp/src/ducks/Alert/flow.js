// @flow

export type AlertState = {|
    visible: boolean,
    closeTimeout: number,
    color: string,
    message: string,
|};

export type ShowAlertAction = {|
    type: string,
    payload: {|
        color: string,
        message: string,
        closeTimeout: number,
    |},
|};

export type CloseByTimeoutAction = {|
    type: string,
    payload: {|
        timeout: number,
    |},
|};
