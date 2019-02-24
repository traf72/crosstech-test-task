import * as utils from './utils';

it('should map enum to catalog', () => {
    const { mapEnumToCatalog } = utils;

    expect(mapEnumToCatalog({})).toEqual([]);

    const enumObj = {
        1: 'one',
        2: 'two',
    };

    const result = [{
        id: '1',
        name: 'one',
    }, {
        id: '2',
        name: 'two',
    }];

    expect(mapEnumToCatalog(enumObj)).toEqual(result);
});

it('should check shallow equality', () => {
    const { shallowEqual } = utils;

    expect(shallowEqual({}, {})).toBe(true);
    expect(shallowEqual({ a: 1, b: '2' }, { a: '1', b: '2' })).toBe(false);
    expect(shallowEqual([], [])).toBe(true);
    expect(shallowEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(shallowEqual(null, null)).toBe(true);
    expect(shallowEqual(undefined, undefined)).toBe(true);
    expect(shallowEqual(null, undefined)).toBe(false);
    expect(shallowEqual(1, 1)).toBe(true);
    expect(shallowEqual('test', 'test')).toBe(true);
});

it('should indexing array', () => {
    const { indexArray } = utils;

    const input = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }];
    let result = {
        1: { id: 1, name: 'one' },
        2: { id: 2, name: 'two' },
    };

    expect(indexArray(input)).toEqual(result);

    result = {
        'one': { id: 1, name: 'one' },
        'two': { id: 2, name: 'two' },
    };
    expect(indexArray(input, 'name')).toEqual(result);
    expect(indexArray([])).toEqual({});
});