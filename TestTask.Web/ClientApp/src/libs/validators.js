export const requireValidator = (message = 'Введите значение', options = {}) => {
    const { trimSpaceString = true } = options;

    return value => {
        let normalizedValue = value || '';
        normalizedValue = normalizedValue.toString();
        if (trimSpaceString) {
            normalizedValue = normalizedValue.trim();
        }
        return !normalizedValue ? message : null;
    }
}

export const regexValidator = (regex, message = 'Некорректное значение', options = {}) => {
    const { validIfEmpty = true } = options;

    return value => {
        if (!regex || (validIfEmpty && isEmpty(value))) {
            return null;
        }

        return !regex.test(value) ? message : null;
    }
}

export const phoneValidator = (message = 'Телефон не соответствует маске', options = {}) => {
    return regexValidator(/\+7 ?\(?\d{3}\)? ?\d{3}-?\d{2}-?\d{2}/, message, options);
}

export const dateRangeValidator = (dateStart, dateEnd, message, options = {}) => {
    message = message || `Дата выходит за границы диапазона ${dateStart.toLocaleDateString()}-${dateEnd.toLocaleDateString()}`;
    const { validIfEmpty = true } = options;

    return value => {
        if ((validIfEmpty && isEmpty(value)) || (value >= dateStart && value <= dateEnd)) {
            return null;
        }

        return message;
    }
}

const isEmpty = value => {
    return !value || !value.toString().trim();
}