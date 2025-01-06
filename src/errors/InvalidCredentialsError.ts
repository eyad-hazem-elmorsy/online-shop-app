import BaseError from "./BaseError";

export default class InvalidCredentialsError extends BaseError {
    constructor() {
        super('Invalid email or password', 401);
    }
}