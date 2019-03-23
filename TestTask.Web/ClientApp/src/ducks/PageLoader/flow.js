// @flow

export type PageLoaderState = {|
    visible: boolean,
    showOverlay: boolean,
|};

export type ShowPageLoaderAction = {|
    type: string,
    payload: {|
        showOverlay: boolean,
    |},
|};
