import BaseError from './BaseError';
import {
    FieldValidationError,
    ValidationError as ExpressValidatorError
} from 'express-validator';

export default class ValidationError extends BaseError {
    public path: string;
    constructor(err: FieldValidationError) {
        super(err.msg, 400);
        this.path = err.path;
    }

    static mapErrors(errs: ExpressValidatorError[]): ValidationError[] {
        return errs
            .filter(err => err.type === 'field')
            .map(err => new ValidationError(err));
    }
}
