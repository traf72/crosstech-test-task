// @flow

import type { LoadState } from '../../flow/redux';
import type { Primitive, Catalog, CatalogItem } from '../../flow/common';

export type CatalogParams = {};

export type CatalogState = {|
    ...LoadState,
    data: Catalog,
    indexedData: {
        [key: Primitive]: CatalogItem
    },
    params?: CatalogParams,
    error: string,
|};

export type CatalogsState = {
    [key: string]: CatalogState
};

type FetchPayload = {|
    catalogName: string,
    params?: CatalogParams,
|};

type FetchAction = {|
    type: string,
    payload: FetchPayload,
|};

export type FetchCatalogAction = FetchAction;
export type FetchStartAction = FetchAction;

export type FetchSuccessAction = {|
    type: string,
    payload: {|
        ...FetchPayload,
        data: Catalog,
    |},
|};

export type FetchFailedAction = {|
    type: string,
    payload: FetchPayload,
    error: Error,
|};
