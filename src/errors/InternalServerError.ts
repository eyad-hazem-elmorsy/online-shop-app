import BaseError from './BaseError';

export default class InternalServerError extends BaseError {
    constructor() {
        super('Internal server error', 500);
    }
}
