export class HttpException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
