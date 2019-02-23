function getErrorMessage(cause, message) {
    if (cause.response.status === 401) {
        return 'Ваша сессия авторизации истекла, пожалуйста, обновите страницу';
    } else if (cause.response.status === 404) {
        return 'Запрошенный вами ресурс не найден';
    } else if (message) {
        return message;
    } else {
        return 'При обработке вашего запроса произошла ошибка';
    }
}

export default class RequestError extends Error {
    constructor(cause, message) {
        super(getErrorMessage(cause, message));

        this.cause = cause;
        this.name = this.constructor.name;
    }
}