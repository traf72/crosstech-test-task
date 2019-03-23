// @flow

type ValidIfEmptyOption =  { validIfEmpty: boolean };
type TrimSpaceStringOption =  { trimSpaceString: boolean };

export type RequireValidatorOptions = TrimSpaceStringOption;
export type RegexValidatorOptions = ValidIfEmptyOption;
export type DateRangeValidatorOptions = ValidIfEmptyOption;
export type ValidateFunc = (value: any) => ?string;

export const requireValidator = (message?: string = 'Введите значение', options?: RequireValidatorOptions = {}): ValidateFunc => {
    const { trimSpaceString = true } = options;

    return (value: any): ?string => {
        let normalizedValue: string = (value || '').toString();
        if (trimSpaceString) {
            normalizedValue = normalizedValue.trim();
        }
        return !normalizedValue ? message : null;
    }
}

export const regexValidator = (regex: RegExp, message?: string = 'Некорректное значение', options?: RegexValidatorOptions = {}): ValidateFunc => {
    const { validIfEmpty = true } = options;

    return (value: any): ?string => {
        if (!regex || (validIfEmpty && isEmpty(value))) {
            return null;
        }

        return !regex.test(value) ? message : null;
    }
}

export const phoneValidator = (message: string = 'Телефон не соответствует маске', options: RegexValidatorOptions = {}): ValidateFunc => {
    return regexValidator(/\+7 ?\(?\d{3}\)? ?\d{3}-?\d{2}-?\d{2}/, message, options);
}

export const dateRangeValidator = (dateStart: Date, dateEnd: Date, message?: string, options: DateRangeValidatorOptions = {}): ValidateFunc => {
    message = message || `Дата выходит за границы диапазона ${dateStart.toLocaleDateString()}-${dateEnd.toLocaleDateString()}`;
    const { validIfEmpty = true } = options;

    return (value: any): ?string => {
        if ((validIfEmpty && isEmpty(value)) || (value >= dateStart && value <= dateEnd)) {
            return null;
        }

        return message;
    }
}

const isEmpty = value => {
    return !value || !value.toString().trim();
}
