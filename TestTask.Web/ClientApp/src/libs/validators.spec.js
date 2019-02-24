import * as validators from './validators';

it('requireValidator', () => {
    const { requireValidator } = validators;

    expect(requireValidator()('test')).toBeNull();
    expect(requireValidator()(new Date)).toBeNull();
    expect(requireValidator()(undefined)).toBe('Введите значение');
    expect(requireValidator()(null)).toBe('Введите значение');
    expect(requireValidator()('')).toBe('Введите значение');
    expect(requireValidator()(' ')).toBe('Введите значение');
    expect(requireValidator('Введите имя', { trimSpaceString: false })(' ')).toBeNull();
    expect(requireValidator('Введите имя')('')).toBe('Введите имя');
});

it('regexValidator', () => {
    const { regexValidator } = validators;

    expect(regexValidator(/\d{4}/)('')).toBeNull();
    expect(regexValidator(/\d{4}/)(undefined)).toBeNull();
    expect(regexValidator(/\d{4}/)(null)).toBeNull();
    expect(regexValidator(/\d{4}/, undefined, { validIfEmpty: false })('')).toBe('Некорректное значение');
    expect(regexValidator(/\d{4}/)('2010')).toBeNull();
    expect(regexValidator(/\d{5}/)('2010')).toBe('Некорректное значение');
    expect(regexValidator(/\d{5}/, 'Значение некорректно')('2010')).toBe('Значение некорректно');
    expect(regexValidator()('2010')).toBeNull();
    expect(regexValidator(/\d{2}\\\d{2}\\\d{2,4}/)('12\\10\\2010')).toBeNull();
});

it('phoneValidator', () => {
    const { phoneValidator } = validators;

    expect(phoneValidator()('')).toBeNull();
    expect(phoneValidator()(undefined)).toBeNull();
    expect(phoneValidator()(null)).toBeNull();
    expect(phoneValidator(undefined, { validIfEmpty: false })('')).toBe('Телефон не соответствует маске');
    expect(phoneValidator()('+7 (926) 563-45-32')).toBeNull();
    expect(phoneValidator()('7 (926) 563-45-32')).toBe('Телефон не соответствует маске');
    expect(phoneValidator('Неверный телефон')('7 (926) 563-45-32')).toBe('Неверный телефон');
});

it('dateRangeValidator', () => {
    const { dateRangeValidator } = validators;

    const limitStart = new Date(2000, 0, 1);
    const limitEnd = new Date(2010, 11, 31);
    const defaultMessage = `Дата выходит за границы диапазона ${limitStart.toLocaleDateString()}-${limitEnd.toLocaleDateString()}`;

    expect(dateRangeValidator(limitStart, limitEnd)('')).toBeNull();
    expect(dateRangeValidator(limitStart, limitEnd)(undefined)).toBeNull();
    expect(dateRangeValidator(limitStart, limitEnd)(null)).toBeNull();
    expect(dateRangeValidator(limitStart, limitEnd, undefined, { validIfEmpty: false })('')).toBe(defaultMessage);
    expect(dateRangeValidator(limitStart, limitEnd)(new Date(2000, 0, 1))).toBeNull();
    expect(dateRangeValidator(limitStart, limitEnd)(new Date(2010, 11, 31))).toBeNull();
    expect(dateRangeValidator(limitStart, limitEnd)(new Date(2000, 5, 23))).toBeNull();
    expect(dateRangeValidator(limitStart, limitEnd)(new Date(1999, 11, 31))).toBe(defaultMessage);
    expect(dateRangeValidator(limitStart, limitEnd, 'Неверная дата')(new Date(2011, 0, 1))).toBe('Неверная дата');
});