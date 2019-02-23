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