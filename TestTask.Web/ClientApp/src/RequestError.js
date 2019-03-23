// @flow

export type Cause = {
    response: { status: number }
}

function getErrorMessage(cause: Cause, message?: string) {
    if (cause.response.status === 401) {
        return 'Ваша сессия авторизации истекла, пожалуйста, обновите страницу';
    } else if (cause.response.status === 403) {
        return 'У вас недостаточно прав для выполнения данной операции';
    } else if (cause.response.status === 404) {
        return 'Запрошенный вами ресурс не найден';
    } else if (message) {
        return message;
    } else {
        return 'При обработке вашего запроса произошла ошибка';
    }
}

export default class RequestError extends Error {
    cause: Cause;
    
    constructor(cause: Cause, message?: string) {
        super(getErrorMessage(cause, message));

        this.cause = cause;
        this.name = this.constructor.name;
    }
}