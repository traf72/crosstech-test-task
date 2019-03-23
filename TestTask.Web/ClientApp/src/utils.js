// @flow

import type { Primitive, Enum, Catalog } from './flow/common';
import shallowEqualExternal from 'shallowequal';

export const mapEnumToCatalog = (enumObj: Enum): Catalog => {
    return Object.keys(enumObj).map(k => ({ id: k, name: String(enumObj[k]) }));
}

export const shallowEqual = (first: any, second: any): boolean => {
    return shallowEqualExternal(first, second);
}

export const indexArray = <T: {}>(array: Array<T>, keyField: string = 'id'): { [key: Primitive]: T } => {
    return array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});
}

export const now = () => {
    return new Date();
}
