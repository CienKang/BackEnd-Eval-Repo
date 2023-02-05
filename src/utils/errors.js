class HTTPError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class NotFoundError extends HTTPError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = {
    HTTPError,
    NotFoundError
};