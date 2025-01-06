import BaseError from "../errors/BaseError";

declare global {
    namespace Express {
        export interface Request {
            flash(): { [key: string]: BaseError[] };
            flash(message: string): BaseError[];
            flash(type: string, message: BaseError[] | BaseError): number;
            flash(type: string, format: string, ...args: any[]): number;
        }
    }
}