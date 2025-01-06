import BaseError from './BaseError';

export default class DuplicateEmailError extends BaseError {
    constructor() {
        super('E-mail is used', 400);
    }
}
