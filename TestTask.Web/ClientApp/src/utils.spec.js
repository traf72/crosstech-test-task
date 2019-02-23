import * as utils from './utils';

it('should trim trailing slashes', () => {
    const { trimTrailingSlashes } = utils;

    expect(trimTrailingSlashes('')).toBe('');
    expect(trimTrailingSlashes('/')).toBe('');
    expect(trimTrailingSlashes('//')).toBe('');
    expect(trimTrailingSlashes('path')).toBe('path');
    expect(trimTrailingSlashes('path/')).toBe('path');
    expect(trimTrailingSlashes('path//')).toBe('path');
    expect(trimTrailingSlashes('/path//')).toBe('/path');
    expect(trimTrailingSlashes(null)).toBeNull();
    expect(trimTrailingSlashes(undefined)).toBeUndefined();
});

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
    expect(shallowEqual({a: 1, b: '2'}, {a: '1', b: '2'})).toBe(false);
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

it('should return file extension', () => {
    const { getFileExtension } = utils;

    expect(getFileExtension('File.docx')).toBe('docx');
    expect(getFileExtension('File.Part.docx')).toBe('docx');
    expect(getFileExtension('File')).toBeUndefined();
});

it('should return file size', () => {
    const { getFileSize } = utils;

    expect(getFileSize(0)).toBe('0.00 Kb');
    expect(getFileSize(829)).toBe('0.81 Kb');
    expect(getFileSize(65424)).toBe('63.89 Kb');
    expect(getFileSize(12345640)).toBe('11.77 Mb');
    expect(getFileSize(78177935360)).toBe('72.81 Gb');
});

it('should trim string from start', () => {
    const { trimStart } = utils;

    expect(trimStart('  ')).toBe('');
    expect(trimStart('Hello')).toBe('Hello');
    expect(trimStart('  Hello ')).toBe('Hello ');
    expect(trimStart('  Hello ', ' ')).toBe('Hello ');
    expect(trimStart('Hello', 'h')).toBe('Hello');
    expect(trimStart('Hello', 'H')).toBe('ello');
    expect(trimStart('Hello', 'He')).toBe('llo');
    expect(trimStart('Hello', 'e')).toBe('Hello');
    expect(trimStart('https//site', 'https//')).toBe('site');
    expect(trimStart('site', 'https//')).toBe('site');
    expect(trimStart('Hello', 'llo')).toBe('Hello');
    expect(trimStart('!  Hello World!', '!')).toBe('  Hello World!');
    expect(trimStart(undefined, '!')).toBeUndefined();
    expect(trimStart(null, '!')).toBeNull();
    expect(trimStart('', '!')).toBe('');
});

it('should trim string from end', () => {
    const { trimEnd } = utils;

    expect(trimEnd('  ')).toBe('');
    expect(trimEnd('Hello')).toBe('Hello');
    expect(trimEnd('  Hello ')).toBe('  Hello');
    expect(trimEnd('  Hello ', ' ')).toBe('  Hello');
    expect(trimEnd('Hello', 'h')).toBe('Hello');
    expect(trimEnd('Hello', 'H')).toBe('Hello');
    expect(trimEnd('Hello', 'He')).toBe('Hello');
    expect(trimEnd('Hello', 'llo')).toBe('He');
    expect(trimEnd('!  Hello World!', '!')).toBe('!  Hello World');
    expect(trimEnd(undefined, '!')).toBeUndefined();
    expect(trimEnd(null, '!')).toBeNull();
    expect(trimEnd('', '!')).toBe('');
});

it('should trim string', () => {
    const { trim } = utils;

    expect(trim('  ')).toBe('');
    expect(trim('Hello')).toBe('Hello');
    expect(trim('  Hello ')).toBe('Hello');
    expect(trim('  Hello ', ' ')).toBe('Hello');
    expect(trim('Hello', 'h')).toBe('Hello');
    expect(trim('Hello', 'H')).toBe('ello');
    expect(trim('Hello', 'He')).toBe('llo');
    expect(trim('Hello', 'llo')).toBe('He');
    expect(trim('!  Hello World!', '!')).toBe('  Hello World');
    expect(trim(undefined, '!')).toBeUndefined();
    expect(trim(null, '!')).toBeNull();
    expect(trim('', '!')).toBe('');
});

it('should decline age', () => {
    const { declineAge } = utils;

    expect(declineAge(1)).toBe('1 год');
    expect(declineAge(2)).toBe('2 года');
    expect(declineAge(3)).toBe('3 года');
    expect(declineAge(4)).toBe('4 года');
    expect(declineAge(5)).toBe('5 лет');
    expect(declineAge(6)).toBe('6 лет');
    expect(declineAge(7)).toBe('7 лет');
    expect(declineAge(8)).toBe('8 лет');
    expect(declineAge(9)).toBe('9 лет');
    expect(declineAge(10)).toBe('10 лет');
    expect(declineAge(11)).toBe('11 лет');
    expect(declineAge(12)).toBe('12 лет');
    expect(declineAge(13)).toBe('13 лет');
    expect(declineAge(14)).toBe('14 лет');
    expect(declineAge(15)).toBe('15 лет');
    expect(declineAge(16)).toBe('16 лет');
    expect(declineAge(17)).toBe('17 лет');
    expect(declineAge(18)).toBe('18 лет');
    expect(declineAge(19)).toBe('19 лет');
    expect(declineAge(20)).toBe('20 лет');
    expect(declineAge(21)).toBe('21 год');
    expect(declineAge(22)).toBe('22 года');
    expect(declineAge(23)).toBe('23 года');
    expect(declineAge(24)).toBe('24 года');
    expect(declineAge(25)).toBe('25 лет');
    expect(declineAge(60)).toBe('60 лет');
    expect(declineAge(61)).toBe('61 год');
    expect(declineAge(62)).toBe('62 года');
    expect(declineAge(63)).toBe('63 года');
    expect(declineAge(64)).toBe('64 года');
    expect(declineAge(65)).toBe('65 лет');
    expect(declineAge(69)).toBe('69 лет');
    expect(declineAge(100)).toBe('100 лет');
});