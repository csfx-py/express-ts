import { HttpErrorPayload } from '../types';

export class HttpError extends Error {
    code: number;
    constructor(args: HttpErrorPayload) {
        super(args.message);
        this.message = args.message ?? '';
        this.code = args.code;
    }
}
