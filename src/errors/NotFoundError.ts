import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
    constructor() {
        super('Not Found', 404);
    }
}
