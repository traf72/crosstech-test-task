import shallowEqualExternal from 'shallowequal';

export const mapEnumToCatalog = enumObj => {
    return Object.keys(enumObj).map(k => ({ id: k, name: enumObj[k] }));
}

export const shallowEqual = (first, second) => {
    return shallowEqualExternal(first, second);
}

export const indexArray = (array, keyField = 'id') => {
    return array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});
}

export const now = () => {
    return new Date();
}
